import { renderSome, renderNone } from "./render";

import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";

const error = new Error("cannot do operation :(");
type Props = { array: number[] };

export function ComputeWithFpts({ array }: Props): JSX.Element {
  const name = "compute With fp-ts";
  return pipe(
    A.head(array),
    O.map(n => n * 2),
    O.chain(n => (n === 0 ? O.none : O.some(1 / n))),
    O.filter(n => n > 1),
    O.fold(
      () => renderNone(name, error),
      n => renderSome(name, `the result is: ${n}`)
    )
  );
}

export function ComputeTheOldWay({ array }: Props): JSX.Element {
  const name = "Compute the old way";

  const firstElement = array[0];
  if (firstElement === undefined) return renderNone(name, error);
  const firstElementTimesTwo = firstElement * 2;
  if (firstElementTimesTwo === 0) return renderNone(name, error);
  const division = 1 / firstElementTimesTwo;
  if (division <= 1) return renderNone(name, error);
  const result = division;
  return renderSome(name, `the result is: ${result}`);
}
