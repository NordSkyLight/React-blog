import "./App.css";
import { Header } from './components/Header/Header';
import { Blog } from './containers/Blog/Blog';
import { Login } from "./containers/Login/Login";
import { Footer } from './components/Footer/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {

  const [isLoggedIn, setIsLoggetIn] = useState((localStorage.getItem('isLoggedIn') === 'true'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  return (
    <BrowserRouter>
      <div className="App">

        <Header userName={userName} isLoggedIn={isLoggedIn} setIsLoggetIn={setIsLoggetIn} />

        <main>
          <Routes>
            <Route path="/" index element={<Blog />} />
            <Route path="/login" element={<Login setIsLoggetIn={setIsLoggetIn} setUserName={setUserName} />} />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
        
      </div>
    </BrowserRouter>
  );
}

export default App;
