# ParseJson

{% hint style="info" %}
You can find the code for this example [here](https://codesandbox.io/s/either-parsejson-gpdyg?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fexample.ts) in the example.ts file
{% endhint %}

I need to parse some JSON, since it's an operation that can fail we use Either&lt;E,A&gt;

```typescript
import { pipe } from "fp-ts/lib/pipeable";
import * as E from "fp-ts/lib/Either";
import * as A from "fp-ts/lib/Apply";

const dataToBeParsed = JSON.stringify({ firstJson: true });

pipe(
  E.parseJSON(dataToBeParsed, E.toError),
  E.fold(e => console.log(e), data => console.log(data))
); 
// {"firstJson":true}
```

What if I have two JSONto parse?

Here we can use Chain and Map in a naive way

```typescript

import { pipe } from "fp-ts/lib/pipeable";
import * as E from "fp-ts/lib/Either";
import * as A from "fp-ts/lib/Apply";

const dataToBeParsed = JSON.stringify({ firstJson: true });
const secondDataToBeParsed = JSON.stringify({
  thisIsTheSecondJson: "Yes it is"
});

pipe(
  E.parseJSON(dataToBeParsed, E.toError),
  E.chain(one =>
    pipe(
      E.parseJSON(secondDataToBeParsed, E.toError),
      E.map(two => [one, two])
    )
  ),
  E.fold(e => console.log(e), data => console.log(data))
);
// [{"firstJson":true},{"thisIsTheSecondJson":"Yes it is"}]
```

As you can see this does not scale very well so we can use SequenceT to have an array of Either and parse all the two JSON

```typescript
import { pipe } from "fp-ts/lib/pipeable";
import * as E from "fp-ts/lib/Either";
import * as A from "fp-ts/lib/Apply";

const dataToBeParsed = JSON.stringify({ firstJson: true });
const secondDataToBeParsed = JSON.stringify({
  thisIsTheSecondJson: "Yes it is"
});

const sequenceE = A.sequenceT(E.either);

pipe(
  sequenceE(
    E.parseJSON(dataToBeParsed, E.toError),
    E.parseJSON(secondDataToBeParsed, E.toError)
  ),
  E.fold(e => console.log(e), data => console.log(data))
);

//[{"firstJson":true},{"thisIsTheSecondJson":"Yes it is"}]
```

