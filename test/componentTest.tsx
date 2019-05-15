/* @jsx Component.el */
import { Emit, EventType } from "@emit-js/emit"
import { log } from "@emit-js/log"
import { store } from "@emit-js/store"
import { Component } from "../"

let component: Test, emit: Emit

declare module "@emit-js/emit" {
  interface Emit {
    testComponent(
      id: EventIdType,
      str?: string
    ): Promise<Element>
  }
}

class Test extends Component {
  protected async init(
    e: EventType,
    str: string
  ): Promise<void> {
    const { emit, id } = e
    emit.on([id, "rerender"], this.rerender.bind(this))
    await emit.set("test", str || "hi")
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

  emit.any("testComponent", component.listener.bind(component))
  emit.any("cachedTestComponent", Test.listener.bind(Test))
})

test("component render", async (): Promise<void> => {
  const el = await emit.testComponent(null)
  expect(el).toEqual(expect.any(HTMLDivElement))
  expect(el.tagName).toBe("DIV")
  expect(el.textContent).toBe("hi")
})

test("cached component render", async (): Promise<void> => {
  const el = await emit.cachedTestComponent(null)
  const el2 = await emit.cachedTestComponent(null)
  const el3 = await emit.cachedTestComponent("test")
  const el4 = await emit.cachedTestComponent("test")
  expect(el).toBe(el2)
  expect(el).not.toBe(el3)
  expect(el3).toBe(el4)
})

test("component render twice", async (): Promise<void> => {
  const el = await emit.testComponent(null)
  const el2 = await emit.testComponent(null)
  expect(el).toBe(el2)
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

test("component render with variable", async (): Promise<void> => {
  const el = await emit.testComponent(null, "hello")
  expect(el).toEqual(expect.any(HTMLDivElement))
  expect(el.tagName).toBe("DIV")
  expect(el.textContent).toBe("hello")
})
