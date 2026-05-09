import App from "./App";
import { Missions } from "./missions/Missions";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Missions />,
        loader: () => ({
          error: {
            code: 500,
            message:
              "There was an error fetching the missions. Please try again later.",
          },
        }),
      },
    ],
    // errorElement: <ErrorElement />,
  },
];

export { routes };
