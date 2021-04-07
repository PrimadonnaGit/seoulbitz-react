import React from 'react';
import './App.scss';
import { Route, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main/Main';
import Search from './pages/Search/Search';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Main} />
      <Route path="/search" component={Search} />
    </BrowserRouter>
  );
}

export default App;
