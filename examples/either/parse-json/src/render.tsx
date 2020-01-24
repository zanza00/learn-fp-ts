import * as React from "react";

import { Tile, Content, Heading } from "react-bulma-components";

export function renderSuccess(name: string, result: unknown): JSX.Element {
  return (
    <Tile kind="parent">
      <Tile renderAs="article" kind="child" notification color="primary">
        <Heading>{name}</Heading>
        <Content>
          <code>{JSON.stringify(result)}</code>
        </Content>
      </Tile>
    </Tile>
  );
}

export function renderError(name: string, e: Error) {
  return (
    <Tile kind="parent">
      <Tile renderAs="article" kind="child" notification color="warning">
        <Heading>{name} Error</Heading>
        <Content>{e.message}</Content>
      </Tile>
    </Tile>
  );
}
