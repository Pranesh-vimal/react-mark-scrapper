import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { CSVLink } from "react-csv";

function Marks() {

    const navigate = useNavigate();

    const { results, headings } = useData();

    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (results.length === 0 || headings.length === 0) {
            return navigate("/", { replace: true });
        }
    }, [results, headings, navigate]);

    return (
        <div className="mx-5 my-5">
            <h6 className="text-center font-bold my-2">Marks</h6>
            <div className="grid grid-cols-1 md:grid-cols-3 text-center mb-5 print:hidden">
                <div></div>
                <div className="my-3">
                    <label htmlFor="fileName" className="block mb-2 text-sm font-medium text-gray-900">Enter Your
                        File Name</label>
                    <div className="flex flex-col gap-1">
                        <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2" />
                        {fileName.length > 0 && (
                            <CSVLink
                                data={results}
                                filename={fileName + ".csv"}
                                className="w-full text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2 focus:outline-none"
                                target="_blank"
                            >
                                Export Result
                            </CSVLink>
                        )}
                    </div>

                </div>
                <div></div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg scrollbar-hide">
                <table className="relative w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {headings.map((heading, index) => (
                                <th scope="col" className="px-6 py-3 text-center" key={index}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {results.length > 0 && results.map((item, index) => (
                            <tr
                                className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700" key={index}>
                                {headings.map((heading, index) => (
                                    <td className="px-6 py-4 text-center" key={index}>
                                        {item[heading] || "-"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Marks