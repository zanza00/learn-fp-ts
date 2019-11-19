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
let firstElementTimesTwo;
if (firstElement !== undefined) {
    firstElementTimesTwo = firstElement * 2
}
```

luckily we can use one of the function form `Array` to do the same thing

```typescript
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";

const safeFirstElement: O.Option<number> = A.head(arr)
```

## Map

now we have an `Option<number>` which means that _maybe_ there is a value _maybe_ not. How can we manipulate the value? By using the TypeClass named `map` 

```typescript
import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";

const arr: number[] = []
const safeFirstElement: O.Option<number> = A.head(arr)

const firstElementTimesTwo = pipe(
  safeFirstElement,
  O.map(value => value * 2)
)
```

For now the difference is not that great, the biggest one is the use of `const` instead of `let`.

## Chain

Moving on let's say that we need to divide this resulting number by 0. Because is an operation with a special case we use another Type Class called `chain` that enables us to change the "branch" of the `Option` 

```typescript
const firstElementTimesTwo = pipe(
  safeFirstElement,
  O.map(value => value * 2),
  O.chain(n === 0 ? O.none : O.some(1 / n))
)
```

## Final Example

```typescript
import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";

function ComputeWithFpts(array: number[]): string  {
  return pipe(
    A.head(array),
    O.map(n => n * 2),
    O.chain(n === 0 ? O.none : O.some(1 / n)),
    O.filter(n => n > 1),
    O.fold(() => 'ko', () => `the result is: ${result}`)
  )
}

console.log(ComputeWithFpts([1]))
```

for comparison here is the same example without using fp-ts

```typescript
function ComputeTheOldWay(array: number[]): string {
  const firstElement = array[0];
  if (firstElement === undefined) return "ko";
  const firstElementTimesTwo = firstElement * 2;
  if (firstElementTimesTwo === 0) return "ko";
  const division = 1 / firstElementTimesTwo;
  if (division <= 1) return "ko";
  const result = division;
  return renderSuccess(name, `the result is: ${result}`);
}

console.log(ComputeTheOldWay([1])
```





