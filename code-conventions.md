# Code conventions

{% hint style="danger" %}
This guide is written with fp-ts v2 in mind. To understand if a snippet found in the wild is v1 or v2 refer to[ this migration guide.](https://gcanti.github.io/fp-ts/introduction/upgrade-to-v2.html) 
{% endhint %}

fp-ts uses an approach ef exporting every single function from the module, because of name collision is better to import all the module and use an alias

For example this is an error

```typescript
import { fold } from "fp-ts/lib/Either";
import { fold } from "fp-ts/lib/TaskEither";
```

it's possible to rename it but this practice will become old pretty quick, so we import everything with an alias

```typescript
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";
import * as O from "fp-ts/lib/Option"
```

Why using only a couple of letter? because it becomes easier to read after a while.

for example let's use the full name for the alias

```typescript
import * as Either from "fp-ts/lib/Either";
import * as TaskEither from "fp-ts/lib/TaskEither";
import * as Task from "fp-ts/lib/Task";
import * as Option from "fp-ts/lib/Option"
```

and use it in a simple function declaration

```typescript
declare function f(e: Either.Either<string,string>): Option.Option<string>
```

it's noisy, and the problem is even greater when pipe is introduces

```typescript
import * as Option from "fp-ts/lib/Option"

pipe(
  Option.some(1),
  Option.map(n => n * 2),
  Option.chain(n === 0 ? O.none : O.some(1 / n)),
  Option.filter(n => n > 1),
  Option.fold(() => 'ko', () => 'ok')
)
```

let's try the short version for both this examples

```typescript
import { pipe } from 'fp-ts/lib/pipeable'
import * as O from 'fp-ts/lib/Option'
import * as E from "fp-ts/lib/Either";

declare function f(e: E.Either<string,string>): O.Option<string>

pipe(
  O.some(1),
  O.map(n => n * 2),
  O.chain(n === 0 ? O.none : O.some(1 / n)),
  O.filter(n => n > 1),
  O.fold(() => 'ko', () => 'ok')
)
```

pipe is the only exception because we only need that function from the module.

Here are a list of short names for the import that are used in this book

```typescript
import * as O from "fp-ts/lib/Option"
import * as E from "fp-ts/lib/Either";
import * as T from "fp-ts/lib/Task";
import * as TE from "fp-ts/lib/TaskEither";
import * as A from "fp-ts/lib/Array";
import * as NEA from "fp-ts/lib/NonEmptyArray";
import * as R from "fp-ts/lib/Reader";
import * as W from "fp-ts/lib/Writer";
import * as S from "fp-ts/lib/State";
import * as IO from "fp-ts/lib/IO";
```

of course you can use what you find best, feel free to experiment.

