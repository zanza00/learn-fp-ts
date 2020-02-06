# Introduction

[fp-ts](https://github.com/gcanti/fp-ts) is a library that enables to use functional programming in typescript.

There is an [ecosystem of libraries](https://gcanti.github.io/fp-ts/introduction/ecosystem) that revolves around it. Once you can use _fp-ts_ you can use those as well.

_fp-ts_ implements notions and concepts from functional programming. The two pillars that are essential to understand how to use it are the following:

* **Referential transparency**
* **Composition** \(as a design pattern\)

Let's talk more in depth on what those two pillars are

## Referential Transparency

This is a very simple but powerful concept. It states as follows: _Everything is an Expression._ When something is an Expression you can safely replace it with its corresponding value without changing the _Program_'s behavior.

{% hint style="info" %}
This concept is very powerful when refactoring.
{% endhint %}

To achieve this effect some rules have to be enforced.

### Functions need to be pure

What does "to be _pure" mean_? A function is pure when it **doesn't** **have side effects,** **takes in** **input all parameters** that are needed and **returns a value**. Let's analyze what this means.

#### Doesn't have side effects

A _side effect_ is a change outside the function, the most common way is to update an _external_ variable. Another one is a function that may _throw_ an error.

Think whether replaceing that function with its value will update the external variable or throw the exception

Let's analyze the case of the external variable

```typescript
let externalVariable = 0;

function sum(a: number): void {
  externalVariable = externalVariable + a;
}

sum(42);

console.log(externalVariable); // 42
```

now we perform the substitution and see what happens

```typescript
let externalVariable = 0;

function sum(a: number): void {
  externalVariable = externalVariable + a;
}

42; // here we replace it's result

console.log(externalVariable); // 0
```

as you can see the result is changed, what can we do to rectify this?

```typescript
function sum(a: number, b: number): number {
  return a + b;
}

const result = sum(21, 21);

console.log(result); // 42
```

now if we replace the function sum with its result the program doesn't change.

```typescript
function sum(a: number, b: number): number {
  return a + b;
}

const result = 42;

console.log(result); // 42, same as before
```

if the function throws an error the concept is similar

```typescript
function divide(a: number, b: number): number {
  if (b == 0) throw "cannot divide by zero";
  return a / b;
}

try {
  const result = divide(150, 0);
  console.log(result);
} catch (e) {
  console.log(e); // 'cannot divide by zero'
}
```

Now the program behavior changes when we replace the function with its result

```typescript
function divide(a: number, b: number): number {
  if (b == 0) throw "cannot divide by zero";
  return a / b;
}

try {
  const result = Infinity;
  console.log(result); // Infinity
} catch (e) {
  console.log(e);
}
```

#### All parameters are in input

This is in a similar vein as before, a function needs to be able to work without external values. For example let's assume that we have a global variable and a function that depends on said global variable

```typescript
const universe = {
  name: "functional programming"
};

function getFirstLetter(): string {
  return universe.name.substring(0, 1);
}

console.log(getFirstLetter()); // 'f'
```

Now if we move the function in a new file it doesn't work anymore

{% tabs %}
{% tab title="function" %}
```typescript
function getFirstLetter(): string {
  return universe.name.substring(0, 1);
}

console.log(getFirstLetter()); // cannot compile
```
{% endtab %}

{% tab title="universe" %}
```typescript
const universe = {
    name: 'functional programming'
}
```
{% endtab %}
{% endtabs %}

to make this function pure we need to make the dependency explicit

```typescript
function getFirstLetter(str: string): string {
  return universe.name.substring(0, 1);
}

console.log(getFirstLetter("functional programming")); // 'f'
```

This aids readability and testability of the function

#### Returns a value

This particular point is not so obvious, usually if something has a `void` return it usually means that some side effect is performed. It's in the same vein as before, portability and testability.

To perform side effect take a look at IO

## Composition

Composition is a pattern that enables the construction of bigger and complex entities by combining smaller and easier to understand units that do something very specific.

### Combinators

This is taken [straight from Haskell](https://wiki.haskell.org/Combinator)

> A style of organizing libraries centered around the idea of combining things. Usually there is some type `T`, some "primitive" values of type `T`, and some "combinators" which can combine values of type `T` in various ways to build up more complex values of type `T`

The general form of a combinator is:

```text
combinator: Thing => Thing
```

The purpose of a combinator is to create new "things" from "things" that are already defined.

The result can be passed as an input and we get an explosion of combinatorial possibilities, this is the power of this pattern.

If we mix different combinators together the resulting combinatorial explosion is even greater.

So the general design that you will find in a functional module is achieved by using the following points:

* a group of simple "primitives"
* a group of combinators to combine said primitives in more complex structures

