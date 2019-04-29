export class Component {
  private static htmlProps = {
    className: true,
    id: true,
    innerHTML: true,
    nodeValue: true,
    tabIndex: true,
    textContent: true,
    value: true,
  }

  private static events = {}
  
  public static el(tagName): Element {
    const node =
      tagName.nodeType === 1
        ? tagName
        : document.createElement(tagName)

    for (let i = 1; i < arguments.length; ++i) {
      const arg = arguments[i]
      if (!arg) {
        continue
      }
      if (!arg.constructor || arg.constructor === Object) {
        for (
          let j = 0, ks = Object.keys(arg);
          j < ks.length;
          ++j
        ) {
          const key = ks[j],
            val = arg[key]
          if (key === "style") {
            node.style.cssText = val
          } else if (
            typeof val !== "string" ||
            Component.htmlProps[key]
          ) {
            node[key] = val
            if (key === "id" && Array.isArray(val)) {
              node[key] = val.join(".")
            }
            //set synthetic events for onUpperCaseName
            if (
              key[0] === "o" &&
              key[1] === "n" &&
              key.charCodeAt(2) < 91 &&
              key.charCodeAt(2) > 64 &&
              !this.events[key]
            ) {
              document.addEventListener(
                key.slice(2).toLowerCase(),
                function (e): any {
                  let tgt: any = e.target
                  do {
                    if (tgt[key]) {
                      return tgt[key](e)
                    }
                  } while ((tgt = tgt.parentNode))
                }
              )
              this.events[key] = true
            }
          } else {
            node.setAttribute(key, val)
          }
        }
      } else {
        if (Array.isArray(arg)) {
          for (let k = 0; k < arg.length; ++k) {
            node.appendChild(
              arg[k].nodeType
                ? arg[k]
                : document.createTextNode(arg[k])
            )
          }
        } else {
          node.appendChild(
            arg.nodeType
              ? arg
              : document.createTextNode(arg)
          )
        }
      }
    }
    return node
  }

  protected elFind(arg, prop): Element {
    return document.getElementById(prop.join("."))
  }

  protected elList(arg, prop, emit): string[] {
    const propStr = prop.join("."),
      v = emit.get(prop)

    const el = document.getElementById(propStr)

    if (!el || !v) {
      return
    }

    const ids = v.map(function (d):string {
      return d.id.toString()
    })

    const propIds = ids.map(function (id): string {
      return propStr + "." + id
    })

    const childEls = this.collectElements(el, propIds)

    let after = false,
      childEl = childEls[0]

    for (let i = 0; i < propIds.length; i++) {
      const id = propIds[i]

      if (!childEl || id !== childEl.id) {
        const newNode = emit[arg.event](prop, ids[i], null)

        if (childEl) {
          childEl[after ? "after" : "before"](newNode)

          if (after) {
            childEl = newNode
          }
        } else {
          el.appendChild(newNode)
        }
      } else {
        emit[arg.event](prop, ids[i], { element: childEl })

        if (childEl && childEl.nextElementSibling) {
          childEl = childEl.nextElementSibling
        } else {
          after = true
        }
      }
    }

    return propIds
  }

  protected collectElements(
    el: Element,
    propIds: string[]
  ): Element[] {
    return Array.from(el.children).map((child): Element => {
      if (propIds.indexOf(child.id) > -1) {
        return child
      } else {
        child.remove()
      }
    })
  }
}
