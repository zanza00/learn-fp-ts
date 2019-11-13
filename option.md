---
description: Maybe there is a value
---

# Option

`Option` represent a value that _maybe_ is present. Is roughly equivalent to `const a: T | undefined`

for example accessing the first element of an array can be `undefined`

```typescript
const arr: number[] = []

const firstElement = arr[0] // undefined
```

before manipulating `firstElement` checking for `undefined` is needed

```typescript
let firstElementPlusHundred;
if (firstElement !== undefined) {
    firstElementPlusHundred = firstElement + 100
}
```

luckily we can use one of the function form `Array` to do the same thing

```typescript
import * as O from 'fp-ts/lib/Array'

const safeFirstElement: O.Option<number> = O.head(arr)
```

