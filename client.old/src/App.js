// client/src/App.js
import React from 'react';
import TableComponent from './TableComponent';
import './App.css';

const App = () => {
    console.log("Rendering App component...");
    return (
        <div className="App">
            <h1>City of Calgary Parking API Data</h1>
            <TableComponent />
        </div>
    );
};

export default App;
