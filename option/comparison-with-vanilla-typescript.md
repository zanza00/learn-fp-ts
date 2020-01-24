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

```typescript
const a = undefined;
const b = "Present";

const result1 = a || b; // "Present"
const result2 = pipe(
  O.fromNullable(a),
  O.alt(() => O.fromNullable(b))
);
// O.some("Present")
const result3 = pipe(
  O.fromNullable(a),
  O.alt(() => O.some("Another String"))
);
// O.some("Another String")
```

## Manipulate values
