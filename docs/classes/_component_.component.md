[@emit-js/component](../README.md) > ["component"](../modules/_component_.md) > [Component](../classes/_component_.component.md)

# Class: Component

## Hierarchy

**Component**

## Index

### Properties

* [element](_component_.component.md#element)
* [events](_component_.component.md#events)

### Methods

* [afterRender](_component_.component.md#afterrender)
* [beforeRender](_component_.component.md#beforerender)
* [init](_component_.component.md#init)
* [listener](_component_.component.md#listener)
* [render](_component_.component.md#render)
* [rerender](_component_.component.md#rerender)
* [collectElements](_component_.component.md#collectelements)
* [el](_component_.component.md#el)
* [elFind](_component_.component.md#elfind)
* [elList](_component_.component.md#ellist)

### Object literals

* [htmlProps](_component_.component.md#htmlprops)

---

## Properties

<a id="element"></a>

### `<Protected>` element

**● element**: *`Element`*

*Defined in component.ts:16*

Rendered dom element.

___
<a id="events"></a>

### `<Static>``<Private>` events

**● events**: *`Record`<`string`, `boolean`>*

*Defined in component.ts:21*

Synthetic event flag.

___

## Methods

<a id="afterrender"></a>

### `<Protected>` afterRender

▸ **afterRender**(e: *`EventType`*, ...args: *`any`[]*): `Promise`<`any`>

*Defined in component.ts:36*

**Parameters:**

| Name | Type |
| ------ | ------ |
| e | `EventType` |
| `Rest` args | `any`[] |

**Returns:** `Promise`<`any`>

___
<a id="beforerender"></a>

### `<Protected>` beforeRender

▸ **beforeRender**(e: *`EventType`*, ...args: *`any`[]*): `Promise`<`any`>

*Defined in component.ts:43*

**Parameters:**

| Name | Type |
| ------ | ------ |
| e | `EventType` |
| `Rest` args | `any`[] |

**Returns:** `Promise`<`any`>

___
<a id="init"></a>

### `<Protected>` init

▸ **init**(e: *`EventType`*, ...args: *`any`[]*): `Promise`<`any`>

*Defined in component.ts:113*

Asynchronous initializer function.

**Parameters:**

| Name | Type |
| ------ | ------ |
| e | `EventType` |
| `Rest` args | `any`[] |

**Returns:** `Promise`<`any`>

___
<a id="listener"></a>

###  listener

▸ **listener**(e: *`EventType`*, ...args: *`any`[]*): `Promise`<`Element`>

*Defined in component.ts:60*

[Emit-js](https://github.com/emit-js/emit) listener function.

*__remarks__*: Use this function with `emit.on` or `emit.any`.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| e | `EventType` |  Event information |
| `Rest` args | `any`[] |

**Returns:** `Promise`<`Element`>
Dom element

___
<a id="render"></a>

### `<Protected>` render

▸ **render**(e: *`EventType`*, ...args: *`any`[]*): `Promise`<`Element`>

*Defined in component.ts:87*

Render a dom element.

*__remarks__*: This function is typically overwritten by the subclass.

**Parameters:**

| Name | Type |
| ------ | ------ |
| e | `EventType` |
| `Rest` args | `any`[] |

**Returns:** `Promise`<`Element`>

___
<a id="rerender"></a>

### `<Protected>` rerender

▸ **rerender**(e: *`EventType`*, ...args: *`any`[]*): `Promise`<`Element`>

*Defined in component.ts:99*

Rerender and replace dom element.

**Parameters:**

| Name | Type |
| ------ | ------ |
| e | `EventType` |
| `Rest` args | `any`[] |

**Returns:** `Promise`<`Element`>

___
<a id="collectelements"></a>

### `<Static>` collectElements

▸ **collectElements**(el: *`Element`*, ids: *`string`[][]*): `Element`[]

*Defined in component.ts:267*

Gather child elements that have an id match.

**Parameters:**

| Name | Type |
| ------ | ------ |
| el | `Element` |
| ids | `string`[][] |

**Returns:** `Element`[]

___
<a id="el"></a>

### `<Static>` el

▸ **el**(tagName: *`any`*): `Element`

*Defined in component.ts:123*

Substitute function for `React.createElement` in JSX.

**Parameters:**

| Name | Type |
| ------ | ------ |
| tagName | `any` |

**Returns:** `Element`

___
<a id="elfind"></a>

### `<Static>` elFind

▸ **elFind**(id: *`EventIdType`*): `Element`

*Defined in component.ts:201*

Find an element based on an id array.

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `EventIdType` |

**Returns:** `Element`

___
<a id="ellist"></a>

### `<Static>` elList

▸ **elList**(emit: *`Emit`*, eventName: *`string`*, id: *`string`[]*): `string`[][]

*Defined in component.ts:210*

Reconcile the dom with an array of object.

**Parameters:**

| Name | Type |
| ------ | ------ |
| emit | `Emit` |
| eventName | `string` |
| id | `string`[] |

**Returns:** `string`[][]

___

## Object literals

<a id="htmlprops"></a>

### `<Static>``<Private>` htmlProps

**htmlProps**: *`object`*

*Defined in component.ts:26*

Dom element props.

<a id="htmlprops.classname"></a>

####  className

**● className**: *`boolean`* = true

*Defined in component.ts:27*

___
<a id="htmlprops.id"></a>

####  id

**● id**: *`boolean`* = true

*Defined in component.ts:28*

___
<a id="htmlprops.innerhtml"></a>

####  innerHTML

**● innerHTML**: *`boolean`* = true

*Defined in component.ts:29*

___
<a id="htmlprops.nodevalue"></a>

####  nodeValue

**● nodeValue**: *`boolean`* = true

*Defined in component.ts:30*

___
<a id="htmlprops.tabindex"></a>

####  tabIndex

**● tabIndex**: *`boolean`* = true

*Defined in component.ts:31*

___
<a id="htmlprops.textcontent"></a>

####  textContent

**● textContent**: *`boolean`* = true

*Defined in component.ts:32*

___
<a id="htmlprops.value"></a>

####  value

**● value**: *`boolean`* = true

*Defined in component.ts:33*

___

___

