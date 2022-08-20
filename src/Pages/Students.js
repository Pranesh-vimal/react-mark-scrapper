import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useData } from "../context/DataContext";

function Students() {
    const navigate = useNavigate();

    const {
        loading,
        sheets,
        data,
        active,
        dobColumn,
        nameColumn,
        rollNoColumn,
        setDobColumn,
        setNameColumn,
        setRollNoColumn,
        changeSheet,
        fetchResult,
    } = useData();

    useEffect(() => {
        if (data.length === 0) {
            return navigate("/", { replace: true });
        }
    }, [data, navigate]);

    return (
        <div className="mx-5 my-5 pb-20">
            <h6 className="text-center font-bold my-2">Sheets</h6>
            <h6 className="text-center text-gray-500 text-sm">
                Choose a sheet to fetch the results
            </h6>
            <ul
                className="nav nav-tabs flex flex-col justify-center md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 text-center md:text-left"
                id="tabs-tab3"
                role="tablist"
            >
                {sheets.length > 0 &&
                    sheets.map((sheet, index) => (
                        <li
                            className="nav-item mx-1"
                            role="presentation"
                            key={index}
                        >
                            <a
                                href={`#tabs-tab${sheet}`}
                                className={`nav-link rounded-md w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-green-500 focus:border-transparent ${active === index ? "bg-green-400" : ""
                                    }`}
                                data-bs-toggle="pill"
                                role="tab"
                                aria-selected="true"
                                onClick={() => changeSheet(index)}
                            >
                                {sheet}
                            </a>
                        </li>
                    ))}
            </ul>
            <h6 className="text-center text-black">
                Please select the columns
            </h6>
            <div className="grid grid-cols-1 md:grid-cols-4 my-3 gap-4">
                <div className="flex justify-center">
                    <select
                        name="nameColumn"
                        value={nameColumn}
                        onChange={(e) => setNameColumn(e.target.value)}
                        className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Please Select Name Column</option>
                        {data[active] &&
                            Object.keys(data[active][0]).map((item, index) => (
                                <option
                                    value={index}
                                    key={index}
                                    className="text-center"
                                >
                                    {index + 1}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="flex justify-center">
                    <select
                        name="rollNoColumn"
                        value={rollNoColumn}
                        onChange={(e) => setRollNoColumn(e.target.value)}
                        className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Please Select Roll No Column</option>
                        {data[active] &&
                            Object.keys(data[active][0]).map((item, index) => (
                                <option
                                    value={index}
                                    key={index}
                                    className="text-center"
                                >
                                    {index + 1}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="flex justify-center">
                    <select
                        name="dobColumn"
                        value={dobColumn}
                        onChange={(e) => setDobColumn(e.target.value)}
                        className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Please Select D.O.B Column</option>
                        {data[active] &&
                            Object.keys(data[active][0]).map((item, index) => (
                                <option
                                    value={index}
                                    key={index}
                                    className="text-center"
                                >
                                    {index + 1}
                                </option>
                            ))}
                    </select>
                </div>
                {nameColumn && rollNoColumn && dobColumn && (
                    <div className="flex justify-center">
                        <button
                            onClick={() => fetchResult()}
                            type="button"
                            className="w-full text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Fetch Result
                        </button>
                    </div>
                )}
            </div>

            {loading && (
                <Loader />
            )}

            <div className="tab-content mt-5">
                {data.length > 0 && (
                    <div className="tab-pane" role="tabpanel">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="table-auto w-full text-sm text-center text-gray-500 dark:text-gray-400">
                                <thead>
                                    {data[active] && (
                                        <tr className="border-t border-b bg-gray-50 capitalize">
                                            {Object.keys(data[active][0]).map(
                                                (item, index) => (
                                                    <th
                                                        className="px-4 py-2 font-extrabold text-black"
                                                        key={index}
                                                    >
                                                        {item}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    )}
                                </thead>
                                <tbody>
                                    {data[active].map((student, index) => (
                                        <tr
                                            className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 capitalize"
                                            key={index}
                                        >
                                            {Object.values(student).map(
                                                (item, index) => (
                                                    <td
                                                        className="px-4 py-2"
                                                        key={index}
                                                    >
                                                        {item}
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Students;
