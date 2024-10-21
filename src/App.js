import './App.css';
import Routes from "./routes/Routes";
import React from "react";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Routes />
      <Toaster toastOptions={{
        duration: 5000,
      }} />
    </>
  );
}

export default App;
