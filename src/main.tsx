import React from "react";
import ReactDOM from "react-dom";
import { SWRConfig } from "swr";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App, pokemonsLoader } from "./app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: pokemonsLoader,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{ provider: () => new Map() }}>
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);
