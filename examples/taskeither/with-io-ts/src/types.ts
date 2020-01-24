import * as t from "io-ts";

export const Film = t.type({
  id: t.string,
  title: t.string,
  description: t.string,
  director: t.string,
  producer: t.string,
  release_date: t.string,
  rt_score: t.string,
  people: t.array(t.string),
  species: t.array(t.string),
  locations: t.array(t.string),
  vehicles: t.array(t.string),
  url: t.string,
  length: t.any
});
export type Film = t.TypeOf<typeof Film>;
