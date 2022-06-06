import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="bg-gray-800 text-green-400 text-center p-3 font-bold print:hidden">
            <h1 className="">
                <Link to="/">Mark Scrapper</Link>
            </h1>
        </div>
    );
}

export default Header;
