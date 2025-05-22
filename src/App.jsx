// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// get rid of diss
// import AcuteOne from "./AcuteOne";
//vimport HeartScore from "./HeartScore";

import { RouterProvider, createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { FormProvider } from "./FormContext";

const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

function App() {
  return (
    <FormProvider>
      <RouterProvider router={router} />
    </FormProvider>
  )
}

export default App;
