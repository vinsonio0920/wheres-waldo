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
          data: [
            {
              id: 1,
              image:
                "https://wl-brightside.cf.tsp.li/resize/728x/webp/bc7/1e0/ee75f05dbeb672d491c06f8c2f.jpg.webp",
              mission: "Find the panda among the raccoons",
              targets: [
                {
                  targetName: "Panda",
                  location: null,
                  sniped: false,
                },
              ],
              type: "single",
            },
            {
              id: 2,
              image: "https://i.redd.it/ihi87vu0yk8f1.jpeg",
              mission: "Find the 3 gymnasts",
              targets: [
                {
                  targetName: "Gymnast",
                  location: null,
                  sniped: false,
                },
                {
                  targetName: "Gymnast",
                  location: null,
                  sniped: false,
                },
                {
                  targetName: "Gymnast",
                  location: null,
                  sniped: false,
                },
              ],
              type: "multiple similar",
            },
            {
              id: 3,
              image: "https://i.redd.it/wdsa4yue626g1.jpeg",
              mission: "Find both crocs (shoe and animal)",
              targets: [
                {
                  targetName: "Croc (shoe)",
                  location: null,
                  sniped: false,
                },
                {
                  targetName: "Croc (animal)",
                  location: null,
                  sniped: false,
                },
              ],
              type: "multiple unique",
            },
          ],
        }),
      },
    ],
    // errorElement: <ErrorElement />,
  },
];

export { routes };
