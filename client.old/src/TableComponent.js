// client/src/TableComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TableComponent.css';

const TableComponent = () => {
    const [data, setData] = useState({ data1: [], data2: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Fetching data from server...");
        // Fetch data from the Express backend
        axios.get("http://localhost:5000/api/data")
            .then((response) => {
                console.log("Data fetched successfully:", response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        console.log("Loading data...");
        return <p>Loading...</p>;
    }

    console.log("Rendering tables with fetched data...");
    return (
        <div className="table-container">
            <h2>Data from API 1</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data1.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id || 'N/A'}</td>
                            <td>{item.name || 'N/A'}</td>
                            <td>{item.type || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Data from API 2</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data2.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id || 'N/A'}</td>
                            <td>{item.name || 'N/A'}</td>
                            <td>{item.address || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
