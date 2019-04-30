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
  protected async setup(e: EventType): Promise<void> {
    await e.emit.set("test", "hi")
  }
  protected render(e: EventType): Element {
    return <div>{e.emit.get("test")}</div>
  }
}

beforeEach((): void => {
  emit = new Emit()
  component = new Test()
  
  log(emit)
  store(emit)

  emit.any("testComponent", component.component.bind(component))
})

test("component render", async (): Promise<void> => {
  const el = await emit.testComponent()
  expect(el).toEqual(expect.any(HTMLDivElement))
  expect(el.tagName).toBe("DIV")
  expect(el.textContent).toBe("hi")
})
