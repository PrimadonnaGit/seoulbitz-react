import React from "react";
import "./App.scss";
import { Route, BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Search} exact />
      <Route path="/search" component={Main} />
    </BrowserRouter>
  );
}

export default App;
