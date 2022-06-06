import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

function Home() {
    const { onFileUpload, message, data, loading } = useData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div></div>
            <div className="mt-5 mx-2 py-5 flex flex-col items-center">
                <label
                    className="block mb-2 text-sm font-medium text-gray-90"
                    htmlFor="file_input"
                >
                    Upload file
                </label>
                <input
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                    type="file"
                    name="file"
                    onChange={onFileUpload}
                />
                <p className="mt-1 text-sm text-gray-500">
                    XLSX, CSV or XLS (5MB).
                </p>
                {loading && (
                    <div className="text-center">
                        <div
                            className="spinner-border text-green-500"
                            role="status"
                        >
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
                {message && <div className="my-2 text-red-500">{message}</div>}
                {data.length > 0 && (
                    <Link
                        to="/students"
                        className="bg-green-400 text-white px-3 py-2 mt-3 rounded-md w-full text-center"
                    >
                        Submit
                    </Link>
                )}
            </div>
            <div></div>
        </div>
    );
}

export default Home;
