import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonData, setJsonData] = useState(null);

    const calculateLevelsSummary = (sleepData) => {
        // Calculate levels summary from data
        const levelsSummary = {
            deep: { count: 0, minutes: 0 },
            light: { count: 0, minutes: 0 },
            rem: { count: 0, minutes: 0 },
            wake: { count: 0, minutes: 0 }
        };

        sleepData.levels.data.forEach((entry) => {
            const { level, seconds } = entry;
            levelsSummary[level].count++;
            levelsSummary[level].minutes += seconds / 60;
        });

        console.log(`Levels summary calculated for logId ${sleepData.logId}:`, levelsSummary);
        return levelsSummary;
    };

    const calculateDuration = (sleepData) => {
        // Calculate duration using endTime - startTime
        const startTime = new Date(sleepData.startTime);
        const endTime = new Date(sleepData.endTime);
        const duration1 = endTime - startTime;

        // Calculate duration using sum of level minutes
        const levelsSummary = calculateLevelsSummary(sleepData);
        const duration2 = Object.values(levelsSummary).reduce((total, level) => total + level.minutes, 0) * 60 * 1000;

        // Check for consistency
        const errorMargin = 0.05; // 5% error margin
        if (Math.abs(duration1 - duration2) / duration1 > errorMargin) {
            const errorMessage = `Inconsistent JSON for logId ${sleepData.logId}: Duration calculated using different methods.`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        console.log(`Duration calculated for logId ${sleepData.logId}: ${duration1} milliseconds`);
        return duration1;
    };

    const calculateTimeInBed = (sleepData) => {
        // Calculate timeInBed if duration is present
        if (!sleepData.timeInBed && sleepData.duration) {
            const timeInBed = sleepData.duration / 60000;
            console.log(`Time in bed calculated for logId ${sleepData.logId}: ${timeInBed} minutes`);
            return timeInBed;
        }
        return sleepData.timeInBed;
    };

    const calculateEfficiency = (sleepData, levelsSummary) => {
        // Calculate efficiency if timeInBed and levelsSummary is present
        if (!sleepData.efficiency && sleepData.timeInBed && levelsSummary) {
            const calAsleep = levelsSummary.deep.minutes + levelsSummary.light.minutes + levelsSummary.rem.minutes;
            const efficiency = (calAsleep / sleepData.timeInBed) * 100;
            const roundedEfficiency = efficiency.toFixed(2);
            console.log(`Efficiency calculated for logId ${sleepData.logId}: ${roundedEfficiency}%`);
            return roundedEfficiency;
        }
        return sleepData.efficiency;
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
                            parsedData = parsedData.map((item) => {
                                try {
                                    const levelsSummary = calculateLevelsSummary(item);
                                    const duration = calculateDuration(item);
                                    const timeInBed = calculateTimeInBed({ ...item, duration });
                                    const efficiency = calculateEfficiency({ ...item, timeInBed }, levelsSummary);

                                    return {
                                        ...item,
                                        levels: { summary: levelsSummary, data: item.levels.data },
                                        duration,
                                        timeInBed,
                                        efficiency
                                    };
                                } catch (error) {
                                    console.error('Error processing sleep data:', error);
                                    return item;
                                }
                            });

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
