[@emit-js/component](../README.md) > ["component"](../modules/_component_.md) > [Component](../classes/_component_.component.md)

# Class: Component

## Hierarchy

**Component**

## Index

### Properties

* [element](_component_.component.md#element)
* [events](_component_.component.md#events)

### Methods

* [component](_component_.component.md#component)
* [render](_component_.component.md#render)
* [setup](_component_.component.md#setup)
* [collectElements](_component_.component.md#collectelements)
* [el](_component_.component.md#el)
* [elFind](_component_.component.md#elfind)
* [elList](_component_.component.md#ellist)

### Object literals

* [htmlProps](_component_.component.md#htmlprops)

---

## Properties

<a id="element"></a>

### `<Private>` element

**● element**: *`Element`*

*Defined in component.ts:4*

___
<a id="events"></a>

### `<Static>``<Private>` events

**● events**: *`object`*

*Defined in component.ts:16*

#### Type declaration

___

## Methods

<a id="component"></a>

###  component

▸ **component**(e: *`EventType`*): `Promise`<`Element`>

*Defined in component.ts:18*

**Parameters:**

| Name | Type |
| ------ | ------ |
| e | `EventType` |

**Returns:** `Promise`<`Element`>

___
<a id="render"></a>

### `<Protected>` render

▸ **render**(e: *`EventType`*): `any`

*Defined in component.ts:28*

**Parameters:**

| Name | Type |
| ------ | ------ |
| e | `EventType` |

**Returns:** `any`

___
<a id="setup"></a>

### `<Protected>` setup

▸ **setup**(e: *`EventType`*): `Promise`<`any`>

*Defined in component.ts:31*

**Parameters:**

| Name | Type |
| ------ | ------ |
| e | `EventType` |

**Returns:** `Promise`<`any`>

___
<a id="collectelements"></a>

### `<Static>` collectElements

▸ **collectElements**(el: *`Element`*, propIds: *`string`[]*): `Element`[]

*Defined in component.ts:164*

**Parameters:**

| Name | Type |
| ------ | ------ |
| el | `Element` |
| propIds | `string`[] |

**Returns:** `Element`[]

___
<a id="el"></a>

### `<Static>` el

▸ **el**(tagName: *`any`*): `Element`

*Defined in component.ts:33*

**Parameters:**

| Name | Type |
| ------ | ------ |
| tagName | `any` |

**Returns:** `Element`

___
<a id="elfind"></a>

### `<Static>` elFind

▸ **elFind**(prop: *`any`*): `Element`

*Defined in component.ts:108*

**Parameters:**

| Name | Type |
| ------ | ------ |
| prop | `any` |

**Returns:** `Element`

___
<a id="ellist"></a>

### `<Static>` elList

▸ **elList**(arg: *`any`*, prop: *`any`*, emit: *`any`*): `string`[]

*Defined in component.ts:112*

**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | `any` |
| prop | `any` |
| emit | `any` |

**Returns:** `string`[]

___

## Object literals

<a id="htmlprops"></a>

### `<Static>``<Private>` htmlProps

**htmlProps**: *`object`*

*Defined in component.ts:6*

<a id="htmlprops.classname"></a>

####  className

**● className**: *`boolean`* = true

*Defined in component.ts:7*

___
<a id="htmlprops.id"></a>

####  id

**● id**: *`boolean`* = true

*Defined in component.ts:8*

___
<a id="htmlprops.innerhtml"></a>

####  innerHTML

**● innerHTML**: *`boolean`* = true

*Defined in component.ts:9*

___
<a id="htmlprops.nodevalue"></a>

####  nodeValue

**● nodeValue**: *`boolean`* = true

*Defined in component.ts:10*

___
<a id="htmlprops.tabindex"></a>

####  tabIndex

**● tabIndex**: *`boolean`* = true

*Defined in component.ts:11*

___
<a id="htmlprops.textcontent"></a>

####  textContent

**● textContent**: *`boolean`* = true

*Defined in component.ts:12*

___
<a id="htmlprops.value"></a>

####  value

**● value**: *`boolean`* = true

*Defined in component.ts:13*

___

___

