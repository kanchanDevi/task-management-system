import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import EditProfile from "./Pages/EditProfile";
import Auth from "./Pages/Auth";
import PrivateRoutes from "./components/privateRoutes";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1.8rem",
          },
        }}
      ></Toaster>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>

        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
