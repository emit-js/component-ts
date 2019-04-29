/* @jsx Component.el */
import { Component } from "../"

class Test extends Component {
  public render(): Element {
    return <div/>
  }
}

test("component render", (): void => {
  const test = new Test()
  const el = test.render()
  expect(el).toEqual(expect.any(HTMLDivElement))
  expect(el.tagName).toBe("DIV")
})
