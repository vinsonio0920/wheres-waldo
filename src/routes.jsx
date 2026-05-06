import App from "./App";
import { Missions } from "./missions/Missions";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Missions /> }],
    // errorElement: <ErrorElement />,
  },
];

export { routes };
