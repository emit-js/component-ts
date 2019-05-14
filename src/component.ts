import { EventType, Emit } from "@emit-js/emit"

declare global {
  // eslint-disable-next-line
  namespace JSX {
    interface IntrinsicElements {
      [prop: string]: any
    }
  }
}

export abstract class Component {
  /**
   * Rendered dom element.
   */
  protected element: Element

  /**
   * Synthetic event flag.
   */
  private static events: Record<string, boolean> = {}

  /**
   * Dom element props.
   */
  private static htmlProps = {
    className: true,
    id: true,
    innerHTML: true,
    nodeValue: true,
    tabIndex: true,
    textContent: true,
    value: true,
  }

  protected async afterRender(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    e: EventType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...args: any[]
  ): Promise<any> { }

  protected async beforeRender(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    e: EventType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...args: any[]
  ): Promise<any> { }

  /**
   * [Emit-js](https://github.com/emit-js/emit) listener
   * function.
   * 
   * @remarks
   * Use this function with `emit.on` or `emit.any`.
   *
   * @param e - Event information
   * @returns Dom element
   */
  public async listener(
    e: EventType,
    ...args: any[]
  ): Promise<Element> {
    if (this.element) {
      return this.element
    } else {
      this.element = Component.elFind(e.id)
    }

    await this.init(e, ...args)

    if (!this.element) {
      await this.beforeRender(e, ...args)
      this.element = await this.render(e, ...args)
      await this.afterRender(e, ...args)
    }

    return this.element
  }

  /**
   * Render a dom element.
   * 
   * @remarks
   * This function is typically overwritten by the subclass.
   */
  protected async render(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    e: EventType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...args: any[]
  ): Promise<Element> {
    return document.createElement("div")
  }

  /**
   * Rerender and replace dom element.
   */
  protected async rerender(
    e: EventType,
    ...args: any[]
  ): Promise<Element> {
    const el = await this.render(e, ...args)
    if (this.element) {
      this.element.replaceWith(el)
    }
    return this.element = el
  }

  /**
   * Asynchronous initializer function.
   */
  protected async init(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    e: EventType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...args: any[]
  ): Promise<any> {}
  
  /**
   * Substitute function for `React.createElement` in JSX.
   */
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
            this.htmlProps[key]
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

  /**
   * Find an element based on an id array.
   */
  public static elFind(id: string[]): Element {
    return document.getElementById(id.join("."))
  }

  /**
   * Reconcile the dom with an array of object.
   */
  public static elList(
    emit: Emit, eventName: string, id: string[]
  ): string[][] {
    const el = this.elFind(id)
    const v = emit.emit("get", id)

    if (!el || !v) {
      return
    }

    const recordIds = v.map(
      (d: { id: string }): string => d.id.toString()
    )

    const eventIds = recordIds.map(
      (i: string): string[] => id.concat([ i ])
    )

    const childEls = this.collectElements(el, eventIds)

    let after = false,
      childEl = childEls[0]

    for (let i = 0; i < eventIds.length; i++) {
      const id = eventIds[i]

      if (!childEl || id !== childEl.id) {
        const newNode = emit.emit(
          [eventName, id, recordIds[i]]
        )

        if (childEl) {
          childEl[after ? "after" : "before"](newNode)

          if (after) {
            childEl = newNode
          }
        } else {
          el.appendChild(newNode)
        }
      } else {
        emit.emit([eventName, id, recordIds[i]])

        if (childEl && childEl.nextElementSibling) {
          childEl = childEl.nextElementSibling
        } else {
          after = true
        }
      }
    }

    return eventIds
  }

  /**
   * Gather child elements that have an id match.
   */
  public static collectElements(
    el: Element, ids: string[][]
  ): Element[] {
    const joinedIds = ids.map((id: string[]): string => id.join("."))

    return Array.from(el.children).map((child): Element => {
      if (joinedIds.indexOf(child.id) > -1) {
        return child
      } else {
        child.remove()
      }
    })
  }
}
