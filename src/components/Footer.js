import React from "react";

function Footer() {
    return (
        <div className="fixed w-full inset-x-0 bg-gray-800 text-green-400 text-center p-3 font-bold print:hidden bottom-0">
            <h1 className="">
                <span className="text-white mr-2">Developed By</span>
                <a
                    href="http://praneshp.netlify.app/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Pranesh Palanisamy
                </a>
            </h1>
        </div>
    );
}

export default Footer;
