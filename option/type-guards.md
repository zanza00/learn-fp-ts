# Type guards

`fp-ts` has a neat way to deal with type guards, using [Option\#getRefinements](https://gcanti.github.io/fp-ts/modules/Option.ts.html#getrefinement-function)

The problem stem from typescript type safety

For example the function `isRedBox` does the exact opposite of what we want

```typescript
type BlueBox = {
  t: "Blue";
  value: string;
};
type RedBox = {
  t: "Red";
  v: number;
};
type Box = BlueBox | RedBox;

//typo but typescript doesn't complain
const isRedBox = (box: Box): box is RedBox => box.t === "Blue";
```

{% hint style="info" %}
In this case we can only use one of two strings "Red" or "Blue", a code like `box.t === "Green"`is an error
{% endhint %}

To fix this we can use `getRefinement`

```typescript
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";

type Box = BlueBox | RedBox;

type BlueBox = {
  t: "Blue";
  value: string;
};
type RedBox = {
  t: "Red";
  v: number;
};

// this are typesafe
const parseBlueBox = (box: Box): O.Option<BlueBox> =>
  box.t === "Blue" ? O.some(box) : O.none;
const parseRedBox = (box: Box): O.Option<RedBox> =>
  box.t === "Red" ? O.some(box) : O.none;

const isBlueBox = O.getRefinement(parseBlueBox);
const isRedBox = O.getRefinement(parseRedBox);

declare const boxes: Array<Box>;

const onlyBlueBoxes = A.array.filterMap(boxes, parseBlueBox);
```

