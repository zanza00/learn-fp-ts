import * as React from "react";
import { render } from "react-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Heading } from "react-bulma-components";

import * as examples from "./example";

function App() {
  return (
    <div>
      <Heading>Parse Json</Heading>
      <div>
        {Object.entries(examples).map(([key, Component]) => (
          <Component key={key} />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
