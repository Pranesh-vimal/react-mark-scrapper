import React, { useContext, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataContext = React.createContext();

export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [message, setMessage] = useState("");
    const [sheets, setSheets] = useState([]);
    const [data, setData] = useState([]);
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const [rollNoColumn, setRollNoColumn] = useState("");
    const [nameColumn, setNameColumn] = useState("");
    const [dobColumn, setDobColumn] = useState("");
    const [results, setResults] = useState([]);
    const [headings, setHeadings] = useState([]);

    const navigate = useNavigate();

    const changeSheet = (index) => {
        setActive(index);
        setDobColumn("");
        setNameColumn("");
        setRollNoColumn("");
    };

    const onFileUpload = (e) => {
        setMessage("");
        setActive(0);
        setData([]);
        setSheets([]);
        setLoading(true);

        if (e.target.files.length === 0) {
            setMessage("No file selected");
            setLoading(false);
            return;
        }

        var allowedExtensions = /(\.xlsx|\.csv|\.xls)$/i;
        const files = e.target.files;
        const f = files[0];

        if (!allowedExtensions.exec(f.name)) {
            setMessage("File must be type of .xlsx, .csv or .xls");
            setLoading(false);
            return;
        }

        if (f.size > 5242880) {
            setMessage("File size must be less than 5MB");
            setLoading(false);
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            setSheets(workbook.SheetNames);
            var records = [];
            workbook.SheetNames.forEach((element, index) => {
                const first_sheet_name = workbook.SheetNames[index];
                const worksheet = workbook.Sheets[first_sheet_name];
                const data_json = XLSX.utils.sheet_to_json(worksheet, {
                    raw: true,
                });
                records.push(data_json);
            });
            setData(records);
        };
        reader.readAsBinaryString(f);
        setLoading(false);
    };

    const fetchResult = async () => {

        setLoading(true);
        setMessage("");

        const body = {
            data: data[active],
            rollNoColumn,
            nameColumn,
            dobColumn,
        };

        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/upload`,
            body,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
        console.log(response);
        setLoading(false);

        if (response.data.error) {

            setMessage(response.data.error);
        } else {

            setResults(response.data.result);
            setHeadings(response.data.headings);

            navigate("/marks", { replace: true });
        }
    };

    const value = {
        onFileUpload,
        message,
        sheets,
        data,
        active,
        setActive,
        loading,
        changeSheet,
        rollNoColumn,
        setRollNoColumn,
        nameColumn,
        setNameColumn,
        dobColumn,
        setDobColumn,
        fetchResult,
        results,
        headings,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
}
