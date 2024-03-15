import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonData, setJsonData] = useState(null);

    const calculateDuration = (sleepData) => {
        // Calculate duration if startTime and endTime are present
        if (!sleepData.duration && sleepData.startTime && sleepData.endTime) {
            const startTime = new Date(sleepData.startTime);
            const endTime = new Date(sleepData.endTime);
            const duration = endTime - startTime;
            console.log(`Duration calculated for logId ${sleepData.logId}: ${duration} milliseconds`);
            return duration;
        }
        return sleepData.duration;
    };

    const handleImport = async (event) => {
        try {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.json';

            fileInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    const fileReader = new FileReader();
                    fileReader.onload = (e) => {
                        const data = e.target.result;
                        try {
                            let parsedData = JSON.parse(data);

                            // Process each object in the array
                            parsedData = parsedData.map((item) => ({
                                ...item,
                                duration: calculateDuration(item),
                            }));

                            setJsonData(parsedData);
                        } catch (error) {
                            console.error('Error parsing JSON file:', error);
                        }
                    };
                    fileReader.readAsText(file);
                }
            });

            fileInput.click();
        } catch (error) {
            console.error('Error importing JSON file:', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="ProjectTitle">Sleep Pattern Analysis App (SPAA)</h1>
                <button className="ImportButton" onClick={handleImport}>
                    Import
                </button>
            </header>

            {jsonData && (
                <div className="ImportedData">
                    <h2>Imported JSON Data:</h2>
                    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;