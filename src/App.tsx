import React, { useState } from "react";
import Header from "./Header";
import AppContainer from "./AppContainer";
import { Home } from "./components/Home";
import { Form } from "./components/Form";
import { FormsList } from "./components/FormsList";

function App() {
  const [state, setState] = useState("HOME");
  const [formID, setFormID] = useState(0);

  const openHome = () => {
    setState("HOME");
  };

  const openFormsList = () => {
    setState("LIST");
  };

  const openForm = (id: number) => {
    setFormID(id);
    setState("FORM");
  };

  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-zinc-950 border border-white shadow-lg rounded-xl">
        <Header title="Welcome to Lesson 5 of $react-typescript with #tailwindcss" />
        {state === "HOME" && <Home openFormsListCB={openFormsList} />}
        {state === "FORM" && <Form id={formID} openHomeCB={openHome} />}
        {state === "LIST" && (
          <FormsList openFormCB={openForm} openHomeCB={openHome} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
