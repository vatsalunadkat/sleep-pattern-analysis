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
            if (levelsSummary[level]) {
                levelsSummary[level].count++;
                if (levelsSummary[level].minutes !== undefined) {
                    levelsSummary[level].minutes += seconds / 60;
                }
            }
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

    const calculateSleepMetrics = (sleepData, levelsSummary) => {
        // Calculate minutesAsleep if levelsSummary is present
        if (!sleepData.minutesAsleep && !sleepData.minutesAwake && levelsSummary) {
            const minutesAsleep = levelsSummary.deep.minutes + levelsSummary.light.minutes + levelsSummary.rem.minutes;
            const minutesAwake = levelsSummary.wake.minutes;
            console.log(`Sleep metrics calculated for logId ${sleepData.logId}: {minutesAsleep: ${minutesAsleep}, minutesAwake: ${minutesAwake}}`);
            return { minutesAsleep, minutesAwake };
        }
        return { minutesAsleep: sleepData.minutesAsleep, minutesAwake: sleepData.minutesAwake };
    };

    const calculateSleepScore = (sleepData, duration, timeInBed, levelsSummary, efficiency, minutesAsleep, minutesAwake) => {
        // Weights for each factor
        const weightDuration = 0.1;
        const weightREM = 0.3;
        const weightDeep = 0.4;
        const weightLight = 0.2;

        // Calculate factors
        const durationFactor = calculateDurationFactor(duration);
        const remFactor = calculateSleepPhaseFactor(levelsSummary.rem.minutes, minutesAsleep, 0.25); // 25% of sleep should be in REM
        const deepFactor = calculateSleepPhaseFactor(levelsSummary.deep.minutes, minutesAsleep, 0.23); // 23% of sleep should be in deep
        const lightFactor = calculateSleepPhaseFactor(levelsSummary.light.minutes, minutesAsleep, 0.52); // 52% of sleep should be in light

        // Calculate weighted sum of factors
        const weightedSum = (weightDuration * durationFactor) + (weightREM * remFactor) + (weightDeep * deepFactor) + (weightLight * lightFactor);

        // Normalize sleep score to range 60 (to not demotivate users) and 95
        const minScore = 60;
        const maxScore = 95;
        const normalizedSleepScore = minScore + (weightedSum * (maxScore - minScore));

        // Check if sleep score is below 70 or null or undefined, then fallback to 70
        if (normalizedSleepScore < minScore || isNaN(normalizedSleepScore) || normalizedSleepScore === null || normalizedSleepScore === undefined) {
            return minScore;
        }

        console.log(`Sleep score calculated for logId ${sleepData.logId}: ${normalizedSleepScore}`);
        return normalizedSleepScore;
    };

    const calculateDurationFactor = (duration) => {
        // Ideal duration for adults is 7 to 8 hours
        const minIdealDuration = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
        const maxIdealDuration = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
        const idealDuration = (duration - minIdealDuration) / (maxIdealDuration - minIdealDuration); // Normalize between 0 and 1
        return Math.max(0, Math.min(idealDuration, 1)); // Ensure value is between 0 and 1
    };

    const calculateSleepPhaseFactor = (phaseMinutes, totalMinutes, targetPercentage) => {
        // Sleep phase factor: percentage of phase time compared to total sleep time
        const idealPercentage = phaseMinutes / totalMinutes;
        const deviation = Math.abs(idealPercentage - targetPercentage);
        return 1 - deviation; // Inverse deviation: closer to 1 is better
    };

    const calculateOverallSummary = (jsonData) => {
        // Initialize variables for overall summary
        let totalSleepScore = 0;
        let totalEfficiency = 0;
        let totalHoursSlept = 0;
        let totalSleepDebt = 0;
        let totalDeepStagePercent = 0;
        let totalRemStagePercent = 0;
        let totalLightStagePercent = 0;
        const averageValuesPerDay = [];

        // Initialize object to store aggregated data per date
        const aggregatedDataPerDate = {};

        // Iterate through each item in the JSON data
        jsonData.forEach((item) => {
            const date = item.dateOfSleep.slice(0, 10); // Extract date from dateOfSleep

            // Calculate sleep score and efficiency for each item
            totalSleepScore += item.sleepScore;
            totalEfficiency += item.efficiency;

            // Calculate hours slept and sleep debt
            const hoursSlept = item.duration / (60 * 60 * 1000); // Convert milliseconds to hours
            totalHoursSlept += hoursSlept;
            totalSleepDebt += 8 - hoursSlept; // Assuming ideal sleep duration is 8 hours

            // Calculate percentage of time spent in each sleep stage
            const totalMinutes = item.minutesAsleep + item.minutesAwake;
            const deepStagePercent = item.levels.summary.deep ? (item.levels.summary.deep.minutes / totalMinutes) * 100 : 0;
            const remStagePercent = item.levels.summary.rem ? (item.levels.summary.rem.minutes / totalMinutes) * 100 : 0;
            const lightStagePercent = item.levels.summary.light ? (item.levels.summary.light.minutes / totalMinutes) * 100 : 0;
            totalDeepStagePercent += deepStagePercent;
            totalRemStagePercent += remStagePercent;
            totalLightStagePercent += lightStagePercent;

            // Aggregate data per date
            if (!aggregatedDataPerDate[date]) {
                aggregatedDataPerDate[date] = {
                    sleepScorePerDay: item.sleepScore,
                    efficiencyPerDay: item.efficiency,
                    hoursSlept,
                    sleepDebt: 8 - hoursSlept,
                    deepStagePercent,
                    remStagePercent,
                    lightStagePercent
                };
            } else {
                aggregatedDataPerDate[date].sleepScorePerDay += item.sleepScore;
                aggregatedDataPerDate[date].efficiencyPerDay += item.efficiency;
                aggregatedDataPerDate[date].hoursSlept += hoursSlept;
                aggregatedDataPerDate[date].sleepDebt += 8 - hoursSlept;
                aggregatedDataPerDate[date].deepStagePercent += deepStagePercent;
                aggregatedDataPerDate[date].remStagePercent += remStagePercent;
                aggregatedDataPerDate[date].lightStagePercent += lightStagePercent;
            }
        });

        // Calculate overall average sleep score and efficiency
        const overallAverageSleepScore = totalSleepScore / jsonData.length;
        const overallAverageEfficiency = totalEfficiency / jsonData.length;

        // Calculate average values per day and aggregate them
        for (const date in aggregatedDataPerDate) {
            const averageValues = { [date]: {} };
            for (const key in aggregatedDataPerDate[date]) {
                averageValues[date][key] = aggregatedDataPerDate[date][key] / jsonData.filter(item => item.dateOfSleep.slice(0, 10) === date).length;
            }
            averageValuesPerDay.push(averageValues);
        }

        // Calculate overall average sleep debt and stage percentages
        const overallAverageHoursSlept = totalHoursSlept / jsonData.length;
        const overallAverageSleepDebt = totalSleepDebt / jsonData.length;
        const overallAverageDeepStagePercent = totalDeepStagePercent / jsonData.length;
        const overallAverageRemStagePercent = totalRemStagePercent / jsonData.length;
        const overallAverageLightStagePercent = totalLightStagePercent / jsonData.length;

        // Construct the overall summary object
        const overallSummary = {
            averageSleepScore: overallAverageSleepScore,
            averageEfficiency: overallAverageEfficiency,
            totalHoursSlept: totalHoursSlept,
            totalSleepDebt: totalSleepDebt,
            averageDeepStagePercent: overallAverageDeepStagePercent,
            averageRemStagePercent: overallAverageRemStagePercent,
            averageLightStagePercent: overallAverageLightStagePercent,
            averageValuesPerDay,
            processedData: jsonData
        };

        return overallSummary;
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
                                    const { minutesAsleep, minutesAwake } = calculateSleepMetrics(item, levelsSummary);
                                    const duration = calculateDuration(item);
                                    const timeInBed = calculateTimeInBed({ ...item, duration });
                                    const efficiency = calculateEfficiency({ ...item, timeInBed }, levelsSummary);
                                    const sleepScore = calculateSleepScore(
                                        item,
                                        duration,
                                        timeInBed,
                                        levelsSummary,
                                        efficiency,
                                        minutesAsleep,
                                        minutesAwake
                                    );

                                    return {
                                        ...item,
                                        levels: { summary: levelsSummary, data: item.levels.data },
                                        duration,
                                        timeInBed,
                                        efficiency,
                                        minutesAsleep,
                                        minutesAwake,
                                        sleepScore
                                    };
                                } catch (error) {
                                    console.error('Error processing sleep data:', error);
                                    return item;
                                }
                            });

                            // Calculate overall summary
                            const overallSummary = calculateOverallSummary(parsedData);

                            // Prepend the overall summary to the JSON data array
                            const finalData = [overallSummary, ...parsedData];

                            setJsonData(finalData);
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
