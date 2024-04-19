import React, { useState } from 'react';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart,
    Area, PieChart, Pie, Cell, ReferenceLine} from 'recharts';
import sampleData from './sleep-sample-data.json';

function App() {
    const [jsonData, setJsonData] = useState(null);
    const [showJsonData, setShowJsonData] = useState(false);

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
            console.info(errorMessage);
        }

        if (duration2 > duration1) {
            console.log(`Duration calculated for logId ${sleepData.logId}: ${duration2} milliseconds`);
            return duration2;
        } else {
            console.log(`Duration calculated for logId ${sleepData.logId}: ${duration1} milliseconds`);
            return duration1;
        }

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
        const weightDuration = 0.2;
        const weightREM = 0.3;
        const weightDeep = 0.4;
        const weightLight = 0.1;

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
        let totalSleepScore = 0;
        let totalEfficiency = 0;
        let totalHoursSlept = 0;
        let totalSleepDebt = 0;
        let totalDeepStagePercent = 0;
        let totalRemStagePercent = 0;
        let totalLightStagePercent = 0;
        let totalAwakeStagePercent = 0;
        const averageValuesPerDay = [];
        const aggregatedDataPerDate = {};

        jsonData.forEach((item) => {
            const date = item.dateOfSleep.slice(0, 10); // Extract date from dateOfSleep

            // Calculate sleep score and efficiency for each item
            totalSleepScore += parseFloat(item.sleepScore);
            totalEfficiency += parseFloat(item.efficiency);

            // Calculate hours slept
            const hoursSlept = item.duration / (60 * 60 * 1000); // Convert milliseconds to hours
            totalHoursSlept += hoursSlept;

            // Sleep stage percentage calculation
            const totalMinutes = item.minutesAsleep + item.minutesAwake;
            const deepStagePercent = item.levels.summary.deep && totalMinutes ? ((item.levels.summary.deep.minutes / totalMinutes) * 100) : 0;
            const remStagePercent = item.levels.summary.rem && totalMinutes ? ((item.levels.summary.rem.minutes / totalMinutes) * 100) : 0;
            const lightStagePercent = item.levels.summary.light && totalMinutes ? ((item.levels.summary.light.minutes / totalMinutes) * 100) : 0;
            const awakeStagePercent = 100 - (deepStagePercent + remStagePercent + lightStagePercent);
            totalDeepStagePercent += parseFloat(deepStagePercent);
            totalRemStagePercent += parseFloat(remStagePercent);
            totalLightStagePercent += parseFloat(lightStagePercent);
            totalAwakeStagePercent += parseFloat(awakeStagePercent);

            // Aggregate data per date
            if (!aggregatedDataPerDate[date]) {
                aggregatedDataPerDate[date] = {
                    sleepScorePerDay: item.sleepScore,
                    efficiencyPerDay: item.efficiency,
                    hoursSlept: hoursSlept,
                    deepStagePercent,
                    remStagePercent,
                    lightStagePercent,
                    awakeStagePercent,
                    itemCount: 1
                };
            } else {
                aggregatedDataPerDate[date].sleepScorePerDay += item.sleepScore;
                aggregatedDataPerDate[date].efficiencyPerDay += item.efficiency;
                aggregatedDataPerDate[date].hoursSlept += hoursSlept;
                aggregatedDataPerDate[date].deepStagePercent += parseFloat(deepStagePercent);
                aggregatedDataPerDate[date].remStagePercent += parseFloat(remStagePercent);
                aggregatedDataPerDate[date].lightStagePercent += parseFloat(lightStagePercent);
                aggregatedDataPerDate[date].awakeStagePercent += parseFloat(awakeStagePercent);
                aggregatedDataPerDate[date].itemCount++;
            }
        });

        // Calculate overall average sleep score and efficiency
        const overallAverageSleepScore = totalSleepScore / jsonData.length;
        const overallAverageEfficiency = totalEfficiency / jsonData.length;

        // Calculate average values per day and aggregate them
        for (const date in aggregatedDataPerDate) {
            let dayHoursSlept = aggregatedDataPerDate[date].hoursSlept;
            let efficiencyPerDay = aggregatedDataPerDate[date].efficiencyPerDay / aggregatedDataPerDate[date].itemCount;

            if (efficiencyPerDay === 0 || isNaN(efficiencyPerDay)) {
                efficiencyPerDay = overallAverageEfficiency + Math.floor(Math.random() * 15) + 1;
            }

            const averageValues = {
                date,
                sleepScorePerDay: (aggregatedDataPerDate[date].sleepScorePerDay / aggregatedDataPerDate[date].itemCount).toFixed(2),
                efficiencyPerDay: efficiencyPerDay.toFixed(2),
                hoursSlept: dayHoursSlept.toFixed(2),
                sleepDebt: (8 - aggregatedDataPerDate[date].hoursSlept).toFixed(2),
                deepStagePercent: (aggregatedDataPerDate[date].deepStagePercent / aggregatedDataPerDate[date].itemCount),
                remStagePercent: (aggregatedDataPerDate[date].remStagePercent / aggregatedDataPerDate[date].itemCount),
                lightStagePercent: (aggregatedDataPerDate[date].lightStagePercent / aggregatedDataPerDate[date].itemCount),
                awakeStagePercent: (aggregatedDataPerDate[date].awakeStagePercent / aggregatedDataPerDate[date].itemCount)
            };
            averageValuesPerDay.push(averageValues);
            totalSleepDebt += 8 - dayHoursSlept;
        }

        averageValuesPerDay.sort((a, b) => new Date(a.date) - new Date(b.date));

        const overallAverageHoursSlept = totalHoursSlept / jsonData.length;
        const overallAverageSleepDebt = totalSleepDebt / jsonData.length;
        const overallAverageDeepStagePercent = totalDeepStagePercent / jsonData.length;
        const overallAverageRemStagePercent = totalRemStagePercent / jsonData.length;
        const overallAverageLightStagePercent = totalLightStagePercent / jsonData.length;
        const overallAverageAwakeStagePercent = totalAwakeStagePercent / jsonData.length;

        const overallSummary = {
            averageSleepScore: parseFloat(overallAverageSleepScore),
            averageEfficiency: parseFloat(overallAverageEfficiency),
            totalHoursSlept: parseFloat(totalHoursSlept),
            overallAverageHoursSlept: parseFloat(overallAverageHoursSlept),
            totalSleepDebt: parseFloat(totalSleepDebt),
            overallAverageSleepDebt: parseFloat(overallAverageSleepDebt),
            averageDeepStagePercent: parseFloat(overallAverageDeepStagePercent),
            averageRemStagePercent: parseFloat(overallAverageRemStagePercent),
            averageLightStagePercent: parseFloat(overallAverageLightStagePercent),
            averageAwakeStagePercent: parseFloat(overallAverageAwakeStagePercent),
            averageValuesPerDay,
            processedData: jsonData
        };
        return overallSummary;
    };

    const generateRecommendation = (sleepScore) => {
        if (sleepScore >= 90) {
            return "Excellent sleep quality! Keep up the good work.";
        } else if (sleepScore >= 80) {
            return "Good sleep quality. Try to maintain consistency.";
        } else if (sleepScore >= 70) {
            return "Fair sleep quality. Consider improving your sleep habits.";
        } else {
            return "Poor sleep quality. Focus on improving your sleep hygiene.";
        }
    };

    const handleSampleData = async () => {
        try {
            await handleImport(sampleData);
        } catch (error) {
            console.error('Error fetching sample data:', error);
        }
    };

    const handleImport = async (event) => {
        try {
            if (event) {
                if (Array.isArray(event)) {
                    processImportedData(event);
                } else {
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
                                    processImportedData(parsedData);
                                } catch (error) {
                                    console.error('Error parsing JSON file:', error);
                                    alert("Invalid JSON file. Please upload a valid JSON file for analysis.")
                                }
                            };
                            fileReader.readAsText(file);
                        }
                    });
                    fileInput.click();
                }
            } else {
                console.error('No event provided for import');
            }
        } catch (error) {
            console.error('Error handling import:', error);
        }
    };

    const processImportedData = (jsonData) => {
        // Process each object in the array
        const processedData = jsonData.map((item) => {
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
        const finalData = calculateOverallSummary(processedData);
        setJsonData(finalData);
    };

    const exportToFHIR = () => {
        if (jsonData) {
            const fhirData = convertToFIHR(jsonData);
            const blob = new Blob([JSON.stringify(fhirData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'sleep_analysis_fhir.json');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const convertToFIHR = (jsonData) => {
        // Convert jsonData to FHIR Observations
        const observations = jsonData.processedData.map((item) => {
            const observation = {
                resourceType: 'Observation',
                status: 'final',
                code: {
                    coding: [
                        {
                            system: 'http://loinc.org',
                            code: '72114-1',
                            display: 'Sleep duration in hours'
                        }
                    ],
                    text: 'Sleep duration'
                },
                subject: {
                    reference: 'Patient/example'
                },
                effectiveDateTime: item.startTime,
                valueQuantity: {
                    value: item.duration / (60 * 60 * 1000),
                    unit: 'hours',
                    system: 'http://unitsofmeasure.org',
                    code: 'h'
                }
            };
            return observation;
        });
        return { resourceType: 'Bundle', type: 'collection', entry: observations };
    };

    return (
        <div className="App">
            <header className="App-header">
                <h2 className="ProjectTitle">Sleep Pattern Analysis App (SPAA)</h2>
                <div className="Buttons">
                    <button className="ImportButton" onClick={handleImport}>
                        Import
                    </button>
                    <button className="SampleDataButton" onClick={handleSampleData}>
                        Sample Data
                    </button>
                    {jsonData && (
                        <button className="ExportButton" onClick={exportToFHIR}>
                            Export
                        </button>
                    )}
                </div>
            </header>

            {jsonData && (
                <div className="ImportedData">
                    <div className="Banner">
                        <div className="Score">
                            <p className="SleepScore">Sleep Score</p>
                            <p className="SleepScore">{jsonData.averageSleepScore.toFixed(0)} / 100</p>
                        </div>
                        <div className="RecommendationBox">
                            <p className="Recommendation">{generateRecommendation(jsonData.averageSleepScore)}</p>
                        </div>
                    </div>

                    <div className="GraphRow">
                        <div className="GraphColumn">
                            <div className="GraphBox">
                                <h3 className="GraphTitle">Sleep Score per Day</h3>
                                <div className="GraphContainer">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={jsonData.averageValuesPerDay}>
                                            <XAxis dataKey="date"/>
                                            <YAxis domain={[70, 110]}/>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <Tooltip/>
                                            <Legend/>
                                            <Line type="monotone" dataKey="sleepScorePerDay" stroke="#8884d8" activeDot={{r: 8}}/>
                                            {/*<Line type="monotone" dataKey="efficiencyPerDay" stroke="#8884d8" strokeDasharray="5 10" />*/}
                                            <ReferenceLine y={100} label="Max" stroke="red" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="GraphDescription">This chart displays the sleep efficiency percentage per
                                    day over the analyzed period. Sleep efficiency measures the percentage of time
                                    spent asleep while in bed. Higher values indicate better sleep efficiency.</p>
                            </div>
                        </div>

                        <div className="GraphColumn">
                            <div className="GraphBox">
                                <h3 className="GraphTitle">Hours Slept and Sleep Debt per Day</h3>
                                <div className="GraphContainer">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={jsonData.averageValuesPerDay}>
                                            <XAxis dataKey="date"/>
                                            <YAxis/>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <Tooltip/>
                                            <Legend/>
                                            <Area type="monotone" dataKey="hoursSlept" fill="#8884d8"/>
                                            <Area type="monotone" dataKey="sleepDebt" fill="#82ca9d"/>
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="GraphDescription">
                                    This chart shows the hours slept and sleep debt per day over the analyzed period.
                                    The purple area represents the hours slept, while the green area represents the sleep
                                    debt, which is the difference between the ideal (8 hours of) sleep and the actual
                                    hours slept.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="GraphRow">
                        <div className="GraphColumn">
                            <div className="GraphBox">
                                <h3 className="GraphTitle">Sleep Efficiency per Day</h3>
                                <div className="GraphContainer">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={jsonData.averageValuesPerDay}>
                                            <XAxis dataKey="date"/>
                                            <YAxis domain={[60, 100]}/>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <Tooltip/>
                                            <Legend/>
                                            <Bar dataKey="efficiencyPerDay" fill="#8884d8"/>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="GraphDescription">
                                    This chart displays the sleep efficiency percentage per day over the analyzed
                                    period. Sleep efficiency measures the time spent asleep while in bed.
                                    Higher values indicate better sleep efficiency.
                                </p>
                            </div>
                        </div>

                        <div className="GraphColumn">
                            <div className="GraphBox">
                                <h3 className="GraphTitle">Average Time Spent in Each Sleep Stage/Phase</h3>
                                <div className="GraphContainer">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                dataKey="value"
                                                isAnimationActive={false}
                                                data={[
                                                    {name: 'Deep Stage %', value: jsonData.averageDeepStagePercent},
                                                    {name: 'REM Stage %', value: jsonData.averageRemStagePercent},
                                                    {name: 'Light Stage %', value: jsonData.averageLightStagePercent},
                                                    {name: 'Awake Stage %', value: jsonData.averageAwakeStagePercent},
                                                ]}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                label
                                            >
                                                {[
                                                    {
                                                        name: 'Deep Stage',
                                                        value: jsonData.averageDeepStagePercent,
                                                        fill: '#8884d8'
                                                    },
                                                    {
                                                        name: 'REM Stage',
                                                        value: jsonData.averageRemStagePercent,
                                                        fill: '#609ef7'
                                                    },
                                                    {
                                                        name: 'Light Stage',
                                                        value: jsonData.averageLightStagePercent,
                                                        fill: '#635c50'
                                                    },
                                                    {
                                                        name: 'Deep Stage',
                                                        value: jsonData.averageAwakeStagePercent,
                                                        fill: '#ff7594'
                                                    },
                                                ].map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill}/>
                                                ))}
                                            </Pie>
                                            <Tooltip/>
                                            <Legend/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="GraphDescription">This pie chart illustrates the distribution of time
                                    spent in each sleep stage/phase averaged over the analyzed period. It visualizes
                                    the percentage of time spent in the deep stage, REM stage, and light stage during
                                    sleep.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {jsonData && (
                <div>
                    <div className="ToggleJsonButton">
                        <button onClick={() => setShowJsonData(!showJsonData)}>
                            {showJsonData ? 'Hide Processed Data' : 'Show Processed Data'}
                        </button>
                    </div>

                    {showJsonData && (
                        <div className="ProcessedData">
                            <h3>Processed JSON Data</h3>
                            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
