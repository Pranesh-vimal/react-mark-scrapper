import React from "react";
import Header from "./components/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Students from "./Pages/Students";
import Marks from "./Pages/Marks";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/students" element={<Students />} />
                <Route path="/marks" element={<Marks />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
