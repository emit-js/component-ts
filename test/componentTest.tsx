/* @jsx Component.el */
import { Emit, EventType } from "@emit-js/emit"
import { log } from "@emit-js/log"
import { store } from "@emit-js/store"
import { Component } from "../"

let component: Test, emit: Emit

declare module "@emit-js/emit" {
  interface Emit {
    testComponent(id?: EventIdType): Promise<Element>
  }
}

class Test extends Component {
  protected async init(e: EventType): Promise<void> {
    const { emit } = e
    emit.on([e.id, "rerender"], this.rerender.bind(this))
    await emit.set("test", "hi")
  }
  protected async render(e: EventType): Promise<Element> {
    const { emit, id } = e
    return <div id={id}>{emit.get("test")}</div>
  }
}

beforeEach((): void => {
  emit = new Emit()
  component = new Test()
  
  log(emit)
  store(emit)

  emit.any("testComponent", component.listen.bind(component))
})

test("component render", async (): Promise<void> => {
  const el = await emit.testComponent()
  expect(el).toEqual(expect.any(HTMLDivElement))
  expect(el.tagName).toBe("DIV")
  expect(el.textContent).toBe("hi")
})

test("component rerender", async (): Promise<void> => {
  const el = await emit.testComponent("test")
  await emit.emit(["test", "rerender"])
  const el2 = await emit.testComponent("test")
  expect(el).not.toBe(el2)
})

test(
  "component render with existing element",
  async(): Promise<void> => {
    const el = <div id="test" />
    document.body.appendChild(el)
    const el2 = await emit.testComponent("test")
    expect(el).toBe(el2)
  }
)
