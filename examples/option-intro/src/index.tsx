import * as React from "react";
import { render } from "react-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Heading } from "react-bulma-components";

import * as intros from "./intro";
import * as examples from "./example";

const introArray = [1]; // Modify this value to see how the program is affected

function App() {
  return (
    <div>
      <Heading>Intros</Heading>
      <div>
        {Object.entries(intros).map(([key, Component]) => (
          <Component key={key} array={introArray} />
        ))}
      </div>

      <Heading>Full Example: Good Value</Heading>
      <div>
        {Object.entries(examples).map(([key, Component]) => (
          <Component key={key} array={[0.1, 0.2]} />
        ))}
      </div>
      <Heading>Full Example: Bad Value</Heading>
      <div>
        {Object.entries(examples).map(([key, Component]) => (
          <Component key={key} array={[1, 2]} />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
