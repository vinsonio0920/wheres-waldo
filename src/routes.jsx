import App from "./App";
import { ErrorPage } from "./errorPage/ErrorPage";
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
      {
        path: "/missions/:missionId",
        element: <Mission />,
        loader: () => ({
          data: {
            id: 1,
            image:
              "https://wl-brightside.cf.tsp.li/resize/728x/webp/bc7/1e0/ee75f05dbeb672d491c06f8c2f.jpg.webp",
            mission: "Find the panda among the raccoons",
            targets: [
              {
                key: "82a91656-fb51-4c56-bc6b-9393ac968fef",
                targetName: "Panda",
                // array of boxes, these are the possible click areas!
                locations: [
                  // ears (left, right)
                  [
                    [166, 203],
                    [118, 152],
                  ],
                  [
                    [251, 286],
                    [116, 152],
                  ],
                  // face
                  [
                    [185, 271],
                    [127, 156],
                  ],
                  [
                    [176, 244],
                    [155, 233],
                  ],
                ],
                sniped: false,
              },
            ],
            type: "single",
            leaderboard: [
              { name: "AnononyMouseLol123344", time: "1", date: "Test" },
              { name: "Anon", time: "2", date: "Test" },
              { name: "Anon", time: "3", date: "Test" },
              { name: "Anon", time: "4", date: "Test" },
              { name: "Anon", time: "5", date: "Test" },
              { name: "Anon", time: "6", date: "Test" },
              { name: "Anon", time: "7", date: "Test" },
              { name: "Anon", time: "8", date: "Test" },
              { name: "Anon", time: "9", date: "Test" },
              { name: "Anon", time: "10", date: "Test" },
            ],
          },
        }),
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export { routes };
