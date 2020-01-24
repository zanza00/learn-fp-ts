import * as React from "react";

import { Tile, Content, Heading } from "react-bulma-components";

export function renderSome(name: string, result: unknown): JSX.Element {
  return (
    <Tile kind="parent">
      <Tile renderAs="article" kind="child" notification color="primary">
        <Heading>
          {name} <em>is Some</em>
        </Heading>
        <Content>
          <code>{JSON.stringify(result)}</code>
        </Content>
      </Tile>
    </Tile>
  );
}

export function renderNone(name: string, e: Error) {
  return (
    <Tile kind="parent">
      <Tile renderAs="article" kind="child" notification color="warning">
        <Heading>
          {name} <em>is None</em>
        </Heading>
        <Content>{e.message}</Content>
      </Tile>
    </Tile>
  );
}
