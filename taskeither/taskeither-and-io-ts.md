# TaskEither and io-ts

In this page we will learn how to fetch data from an endpoint and validate \(check\) that the data returned is what we expect. To do this we will use the io-ts library that uses an `Either` for representing the or the correct value or the errors in the validation.

In this case the program is made up by two operations, `fetch` the data and `validate` returned data. Let's start by focusing on the fetch

```typescript
import { pipe } from "fp-ts/lib/pipeable";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";

function getStuff(u: string): TE.TaskEither<Error, unknown> {
  return TE.tryCatch(
    () =>
      fetch(u).then(res => {
        if (!res.ok) {
          throw new Error(`fetch failed with status: ${res.status}`);
        }
        return res.json();
      }),
    E.toError
  );
}
```

First of all since a `Promise` is not referentially transparent we use `tryCatch` to make it, if you already have a fetch wrapped in an utility you can use that instead.

Now lets implement a [io-ts](https://github.com/gcanti/io-ts) codec for a [Studio Ghibli Film](https://ghibliapi.herokuapp.com/#tag/Films)

```typescript
import * as t from "io-ts";

export const Film = t.type({
  id: t.string,
  title: t.string,
  description: t.string,
  director: t.string,
  producer: t.string,
  release_date: t.string,
  rt_score: t.string,
  people: t.array(t.string),
  species: t.array(t.string),
  locations: t.array(t.string),
  vehicles: t.array(t.string),
  url: t.string,
  length: t.any
});
export type Film = t.TypeOf<typeof Film>;

function decodeError(e: t.Errors): Error {
  const missingKeys = e.map(e => e.context.map(({ key }) => key).join("."));
  return new Error(`${missingKeys}`);
}

function decode(res: unknown): TE.TaskEither<Error, Film> {
  return pipe(TE.fromEither(Film.decode(res)), TE.mapLeft(decodeError));
}
```

Now we can pipe those two together.

{% hint style="info" %}
Note that in order to work we need to lift an `Either` to a `TaskEither` using a function.
{% endhint %}

```typescript
const TaskEitherAndValidate = pipe(
  getStuff(
    "https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49"
  ),
  TE.chain(res => decode(res))
);
```

Now lets extract the values using fold and transforming it in a string that will be printed

{% hint style="info" %}
Note that `fold` "exits" the `Either` but not from the `Task`
{% endhint %}

```typescript
import * as T from "fp-ts/lib/Task";

const TaskEitherAndValidate = pipe(
  getStuff(
    "https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49"
  ),
  TE.chain(res => decode(res)),
  TE.fold(
    e => T.of(`oh no, an error occurred: ${e.message}`),
    film => T.of(`Film recovered succesfully, title is: ${film.title}`)
  )
);

TaskEitherAndValidate().then(msg => {
  console.log(msg);
  // "Film recovered succesfully, title is: My Neighbor Totoro"
});
```

{% hint style="info" %}
You can find a more complete implementation [here](https://codesandbox.io/s/github/zanza00/learn-fp-ts/tree/master/examples/taskeither/with-io-ts?module=%2Fsrc%2Fexample.ts)in the file example.ts
{% endhint %}

