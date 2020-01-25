---
description: Common operations ported to fp-ts
---

# Comparison with vanilla typescript

every snippet in this page assume that the following modules are imported

```typescript
import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
```

## OR `||` variable assignment

If you have two values and both can be `undefined` you can use `alt`

```typescript
const a: string | undefined = undefined;
const b: string | undefined = "Present";

const result1 = a || b; // "Present"
const result2 = pipe(
  O.fromNullable(a),
  O.alt(() => O.fromNullable(b))
);
// O.some("Present")
```

If one value is the fallback that is always present you can do it in two ways.

```typescript
const a: string | undefined = undefined;
const d: string = "Default"; // always present

// keep the option
const result3 = pipe(
  O.fromNullable(a),
  O.alt(() => O.some(d))
);
// O.some("Default")

// exiting the option
const result4 = pipe(
  O.fromNullable(a),
  O.getOrElse(() => d)
);
// "Default"
```

## AND `&&` Check for values

```typescript
type Req = { cookies?: string[] };

const req1: Req = {};

const cookie1: string[] | undefined = req1.cookies && req1.cookies;
const cookie2: O.Option<string[]> = pipe(
  O.fromNullable(req1),
  O.mapNullable(a => a.cookies)
);
```

## Optional chaining `foo?.bar`

With the introduction of this operator in typescript 3.7 we can use to our advantage with deeply nested objects

```typescript
interface Employee {
  company?: {
    address?: {
      street?: {
        name?: string;
      };
    };
  };
}

const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }

interface Employee {
  company?: {
    address?: {
      street?: {
        name?: string;
      };
    };
  };
}

const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }

const street = pipe(
    fromNullable(employee1.company?.address?.street?.name),
  )
)
```
