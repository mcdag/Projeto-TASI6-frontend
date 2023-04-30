import React from "react";
import Initial from "./views/Initial";
import Login from "./views/Login";
import Register from "./views/Register";
import Welcome from "./views/Welcome";
import Localization from "./views/Localization";
import Reports from "./views/Reports";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Initial />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/register",
      element: <Register />,
    },
    {
      path: "/welcome",
      element: <Welcome />,
    },
    {
      path: "/localization",
      element: <Localization />,
    },
    {
      path: "/report",
      element: <Reports/>,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
