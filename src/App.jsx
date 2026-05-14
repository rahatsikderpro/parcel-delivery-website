import { useState } from "react";
import "./App.css";
import TravelerForm from "./Compunents/Form/Form.jsx";
import Feed from "./Compunents/Feed/Feed.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./Compunents/Header/Header.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-(--background) min-h-dvh">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/form" element={<TravelerForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
