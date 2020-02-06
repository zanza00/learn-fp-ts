---
description: it's Either pizza or ice-cream
---

# Either

Either represent one value or the other. What this means is that the values are mutually exclusive, or you have a `Left<A>` or a `Right<B>`. Thus the representation of this data type is with two generics `Either<A, B>`. 

It's useful to this that Option is a value that maybe is present, Either is a value that perhaps is present or some kind of error is present. This is usually used to represent the result of something that can fail, and because _Right is Right_ when we use `map` the function is applied to the Right, if you want to map the error we can use `mapLeft`. In other words we can sai that Either is Right biased.

Think the last time that you needed to use a \`Try catch\` block. If you need to convey the meaning of the failure, that's a good indicator of potential use for Either.

One of the most prominent utilization of Either is `JSON.parse`. If the data is malformed, it will throw an exception breaking the referential transparency. It's such a common utilization that is already present in fp-ts [Either\#parseJson](https://gcanti.github.io/fp-ts/modules/Either.ts.html#parsejson)

We are now implementing that function from scratch. Since the original function can throw we need to use a try catch block. Since we need to think about the error for now we use a plain `Error` for that. Also we don't know anything about the data if parsed correctly hence we use `unknown`.

```typescript
import * as E from 'fp-ts/lib/Either';

function parseJson(str: string): E.Either<Error,unknown> {
    try {
        return E.right(JSON.parse(str))
    } catch (e) {
        return E.left(e instanceof Error ? e : new Error('unknown error'))
    }
}
```

Writing every time the try catch block gets boring pretty fast. Fortunately there is a function for the occasion inside Either that is called [tryCatch ](https://gcanti.github.io/fp-ts/modules/Either.ts.html#trycatch)so let's refactor a bit.

```typescript
import * as E from 'fp-ts/lib/Either';

function parseJson(str: string): E.Either<Error,unknown> {
    return E.tryCatch(() => JSON.parse(str), e => e instanceof Error ? e : new Error('unknown error'))
}
```

Now we can improve it by dealing with the error using another utility called [toError](https://gcanti.github.io/fp-ts/modules/Either.ts.html#toerror)

```typescript
import * as E from 'fp-ts/lib/Either';

function parseJson(str: string): E.Either<Error,unknown> {
    return E.tryCatch(() => JSON.parse(str), e => toError(e))
}
```

Now if we look at the source [code of parseJson](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts#L361) we can see that it's basically what we wrote

