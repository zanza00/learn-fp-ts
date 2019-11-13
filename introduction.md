# Introduction

[fp-ts](https://github.com/gcanti/fp-ts) is a library that enables to use functional programming in typescript.

There is an [ecosystem of libraries](https://gcanti.github.io/fp-ts/introduction/ecosystem) that revolve around it. Once you can use _fp-ts_ you can use those as well.

{% hint style="info" %}
Once you are familiar with Either I reccomend to look io-ts that bridges the gap between compile and runtime
{% endhint %}

fp-ts implement notions and concepts from funcional programming. The two pillars that essential to understand how to use are as follows:

* **Referential transparency**
* **Composition**\(as a design pattern\)

Let's talk more in depth on what those two pillars are

## Referential Transparency

This is a very simple but very powerful concept. It states as follows: _Everything is an Expression._ When something is an Expression you can safely replace it with it's corresponding value without changing the _Program_'s behaviour.

{% hint style="info" %}
This concept is very powerful when refactoring.
{% endhint %}

To achieve this effect some rules has to be enforced.

### Functions need to be pure

What is mean to be _pure_? A function is pure when it **doesn't** **have side effects**, **takes in** **input all parameters** that are needed and **return a value**. Let's analize what this means.

#### Doesn't have side effects

A _side effect_ is a change outside the function, the most common way is to update an _external_ variable. Another one is a function that may _throw_ an error.

Think whether replace that function with it's value will update the external variable or throw the exception

Let's analize the case of the external variable

```typescript
let externalVariable = 0

function sum(a: number): void {
    externalVariable = externalVariable + a;
}

sum(42)

console.log(externalVariable) // 42
```

now we perform the substitution and see what happens

```typescript
let externalVariable = 0

function sum(a: number): void {
    externalVariable = externalVariable + a;
}

42 // here we replace it's result 

console.log(externalVariable) // 0
```

as you can see the result is changed, what can we do to rectify this?

```typescript
function sum(a: number, b: number): number {
    return a + b;
}

const result = sum(21, 21)

console.log(result) // 42
```

now if we replace the function sum with its result the program doesn't change.

```typescript
function sum(a: number, b: number): number {
    return a + b;
}

const result = 42

console.log(result) // 42, same as before
```

if the function throws an error the concept is similar

```typescript
function divide(a: number, b: number): number {
    if (b == 0) throw 'cannot divide by zero'
    return a/b
}

try {
    const result = divide(150, 0)
    console.log(result)
} catch (e) {
    console.log(e) // 'cannot divide by zero'
}
```

Now the program behaviour changes when we replace the function with its result

```typescript
function divide(a: number, b: number): number {
    if (b == 0) throw 'cannot divide by zero'
    return a/b
}

try {
    const result = Infinity
    console.log(result) // Infinity
} catch (e) {
    console.log(e)
}
```

#### All parameters are in input

#### returns a value

## Composition



