export const routes = [
  {
    path: "/service",
    name: "Node",
    children: [
      {
        path: "/service/active",
        name: "Add Nodes",
      },
      {
        path: "/service/detail",
        name: "Node Details",
      },
    ],
  },
  {
    path: "/fund",
    name: "Fund",
  },
];
