import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { Toaster } from "react-hot-toast";
import "./App.css";

const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
const Contact = React.lazy(() => import("./components/Contact/Contact"));
const EditContact = React.lazy(
  () => import("./components/Contact/EditContact")
);
const CreateContact = React.lazy(
  () => import("./components/Contact/CreateContact")
);
const Loader = React.lazy(() => import("./Loader"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Navigate to="/contact" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/create-contact" element={<CreateContact />} />
            <Route path="/edit-contact/:id" element={<EditContact />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </Suspense>
  );
}

export default App;
