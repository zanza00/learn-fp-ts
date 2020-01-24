import { renderSuccess, renderError } from "./render";

import { pipe } from "fp-ts/lib/pipeable";
import * as E from "fp-ts/lib/Either";
import * as Apply from "fp-ts/lib/Apply";

const dataToBeParsed = JSON.stringify({ firstJson: true });
const secondDataToBeParsed = JSON.stringify({
  thisIsTheSecondJson: "Yes it is"
});

const malformedJson = "garbage";

export function SingleJson(): JSX.Element {
  const name = "Single JSON";
  return pipe(
    E.parseJSON(dataToBeParsed, E.toError),
    E.fold(e => renderError(name, e), data => renderSuccess(name, data))
  );
}

export function ChainAndMap(): JSX.Element {
  const name = "Chain and Map";
  return pipe(
    E.parseJSON(dataToBeParsed, E.toError),
    E.chain(a =>
      pipe(
        E.parseJSON(secondDataToBeParsed, E.toError),
        E.map(r => [a, r])
      )
    ),
    E.fold(e => renderError(name, e), data => renderSuccess(name, data))
  );
}

export function SequenceT(): JSX.Element {
  const sequenceE = Apply.sequenceT(E.either);
  const name = "SequenceT";
  return pipe(
    sequenceE(
      E.parseJSON(dataToBeParsed, E.toError),
      E.parseJSON(malformedJson, E.toError)
    ),
    E.fold(e => renderError(name, e), data => renderSuccess(name, data))
  );
}
