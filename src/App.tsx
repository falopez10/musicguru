import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Detail, Favorites, Home, Login, Main } from './pages';
import { ContextWrapper } from './wrappers/ContextWrapper';

function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} >
            <Route path="home" element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="detail/:id" element={<Detail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  );
}

export default App;
