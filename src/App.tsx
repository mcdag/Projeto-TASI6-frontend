import React from "react";
import Initial from "./views/Initial";
import Login from "./views/Login";
import Register from "./views/Register";
import Welcome from "./views/Welcome";
import Localization from "./views/Localization";
import Map from "./components/Map";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Initial />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/welcome",
      element: <Welcome />,
    },
    {
      path: "/localization",
      element: <Localization />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
