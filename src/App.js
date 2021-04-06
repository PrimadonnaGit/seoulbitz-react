import React from 'react';
import './App.scss';
import { Route, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main/Main';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Main} />
    </BrowserRouter>
  );
}

export default App;
