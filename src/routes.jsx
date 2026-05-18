import App from "./App";
import { Attributions } from "./attributions/Attributions";
import { ErrorPage } from "./errorPage/ErrorPage";
import { missionLoader, missionsLoader } from "./loaders";
import { Mission } from "./mission/Mission";
import { Missions } from "./missions/Missions";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Missions />,
        loader: missionsLoader,
      },
      {
        path: "/missions/:missionId",
        element: <Mission />,
        loader: missionLoader,
      },
      {
        path: "/attributions",
        element: <Attributions />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export { routes };
