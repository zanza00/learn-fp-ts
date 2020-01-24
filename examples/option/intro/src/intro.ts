import { renderSome, renderNone } from "./render";

import { pipe } from "fp-ts/lib/pipeable";
import * as A from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";

const error = new Error("cannot do operation :|");
type Props = { array: number[] };

export function SafeHeadExample({ array }: Props): JSX.Element {
  const name = "Safe Heads Implementation and use";

  function safeHead<T>(arr: T[]): O.Option<T> {
    return arr.length > 0 ? O.some(arr[0]) : O.none;
  }
  return renderSome(name, safeHead(array));
}

export function WhyUseChain1({ array }: Props): JSX.Element {
  const name = "Why use Chain: map";
  return pipe(
    A.head(array),
    O.map(n => n * 2),
    O.map(n => (n === 0 ? O.none : O.some(1 / n))),
    O.fold(() => renderNone(name, error), n => renderSome(name, n))
  );
}

export function WhyUseChain2({ array }: Props): JSX.Element {
  const name = "Why use Chain: chain";
  return pipe(
    A.head(array),
    O.map(n => n * 2),
    O.chain(n => (n === 0 ? O.none : O.some(1 / n))),
    O.fold(() => renderNone(name, error), n => renderSome(name, n))
  );
}

export function ChainAsFilter({ array }: Props): JSX.Element {
  const name = "Chain as Filter";
  return pipe(
    A.head(array),
    O.map(n => n * 2),
    O.chain(n => (n === 0 ? O.none : O.some(1 / n))),
    O.chain(n => (n > 1 ? O.some(n) : O.none)),
    O.fold(() => renderNone(name, error), n => renderSome(name, n))
  );
}

export function FilterAsFilter({ array }: Props): JSX.Element {
  const name = "Filter as Filter";
  return pipe(
    A.head(array),
    O.map(n => n * 2),
    O.chain(n => (n === 0 ? O.none : O.some(1 / n))),
    O.filter(n => n > 1),
    O.fold(() => renderNone(name, error), n => renderSome(name, n))
  );
}
export function Composition({ array }: Props): JSX.Element {
  const name = "Composition";
  const safeFirstElement = A.head(array);

  const firstElementTimesTwo = pipe(
    safeFirstElement,
    O.map(value => value * 2)
  );

  const firstElementTimesTwoDividedByZero = pipe(
    firstElementTimesTwo,
    O.chain(n => (n === 0 ? O.none : O.some(1 / n)))
  );

  const firstElementTimesTwoDividedByZeroGreaterThanOne = pipe(
    firstElementTimesTwoDividedByZero,
    O.filter(n => n > 1)
  );

  return pipe(
    firstElementTimesTwoDividedByZeroGreaterThanOne,
    O.fold(() => renderNone(name, error), n => renderSome(name, n))
  );
}
