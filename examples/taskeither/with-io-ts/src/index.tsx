import * as React from "react";
import { render } from "react-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Heading } from "react-bulma-components";

import * as examples from "./example";

function App() {
  const [data, setData] = React.useState<JSX.Element[]>([]);

  React.useEffect(() => {
    const tasks = Object.entries(examples).map(([, result]) => result());

    Promise.all(tasks).then(res => {
      setData(res);
    });
  }, []);

  return (
    <div>
      <Heading>TaskEither and Response Validation</Heading>
      <div>{data}</div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
