import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonData, setJsonData] = useState(null);

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
                            const parsedData = JSON.parse(data);
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
                <h1>GitHub Pages - Hello World!</h1>
                <button onClick={handleImport} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    Import
                </button>
            </header>

            {jsonData && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Imported JSON Data:</h2>
                    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;