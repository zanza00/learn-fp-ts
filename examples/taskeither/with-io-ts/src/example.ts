import { renderSuccess, renderError } from "./render";

import { pipe } from "fp-ts/lib/pipeable";
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";

import * as t from "io-ts";
import { Film } from "./types";

export type MyError =
  | { type: "NetError"; message: string }
  | { type: "DecodeError"; message: string };

function netError(e: Error): MyError {
  return {
    type: "NetError",
    message: e.message
  };
}

function decodeError(e: t.Errors): MyError {
  const missingKeys = e.map(e => e.context.map(({ key }) => key).join("."));
  return {
    type: "DecodeError",
    message: `${missingKeys}`
  };
}

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

function validate(res: unknown): TE.TaskEither<MyError, Film> {
  return pipe(
    TE.fromEither(Film.decode(res)),
    TE.mapLeft(decodeError)
  );
}

const name1 = "Totoro (The Film)";
export const TaskEitherAndValidateCorrect: T.Task<JSX.Element> = pipe(
  getStuff(
    "https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49"
  ),
  TE.mapLeft(e => netError(e)),
  TE.chain(validate),
  TE.map(film => film.title), // for better display of data, also note the auto completion
  TE.fold(
    e => T.of(renderError(name1, e)),
    pokemon => T.of(renderSuccess(name1, pokemon))
  )
);

const name2 = "Totoro (the character)";
export const TaskEitherAndValidateFailValidation: T.Task<JSX.Element> = pipe(
  getStuff(
    "https://ghibliapi.herokuapp.com/people/ba924631-068e-4436-b6de-f3283fa848f0"
  ),
  TE.mapLeft(e => netError(e)),
  TE.chain(validate),
  TE.fold(
    e => T.of(renderError(name2, e)),
    pokemon => T.of(renderSuccess(name2, pokemon))
  )
);

const name3 = "Totoro (the pokemon)";
export const TaskEitherAndValidateFail: T.Task<JSX.Element> = pipe(
  getStuff("https://pokeapi.co/api/v2/pokemon/totoro"),
  TE.mapLeft(e => netError(e)),
  TE.chain(validate),
  TE.map(film => film.title),
  TE.fold(
    e => T.of(renderError(name3, e)),
    pokemon => T.of(renderSuccess(name3, pokemon))
  )
);
