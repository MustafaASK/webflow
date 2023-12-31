import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Canvas from "./components/canvas";
import AddForm from './components/canvas/addForm';
import EditForm from './components/canvas/editForm';

import './App.css';
import HomePage from './home/HomePage';

function App() {
  return (
    <>
      <BrowserRouter basename='automation-flow'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddForm />} />
          <Route path="/edit/:webid" element={<EditForm />} />

          {/* <Canvas /> */}
        </Routes>
      </BrowserRouter>
      {/* <HomePage /> */}
    </>
  );
}

export default App;
