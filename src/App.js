import {BrowserRouter, Routes, Route} from 'react-router-dom';
import "./App.css"
import React from 'react';
import MainPage from './components/MainPage';

const App = () =>{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
