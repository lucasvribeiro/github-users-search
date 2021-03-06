import { BrowserRouter, Routes, Route } from "react-router-dom";

import SearchPage from "./pages/SearchPage/SearchPage";
import UserPage from "./pages/UserPage/UserPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="user/:username" element={<UserPage />} />

        <Route path="/*" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
