<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">Sleep Pattern Analysis App (SPAA)</h3>

  <p align="center">
    An awesome application to analyze your sleep data and export it! (FHIR compatable)
    <br />
    <br />
    <a href="https://vatsalunadkat.github.io/sleep-pattern-analysis/">Visit App</a>
    ·
    <a href="https://youtu.be/rrk0dRZUqbY">View Demo</a>
    ·
    <a href="https://github.com/vatsalunadkat/sleep-pattern-analysis/issues">Report Bug</a>
    ·
    <a href="https://github.com/vatsalunadkat/sleep-pattern-analysis/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#checking-capabilities">Checking Capabilities</a></li>
        <li><a href="#using-provided-test-data">Using provided test data</a></li>
        <li><a href="#using-your-own-data">Using your own data</a></li>
      </ul>
    </li>
    <li>
      <a href="#roadmap">Roadmap</a>
      <ul>
        <li><a href="#project-timeline">Project Timeline</a></li>
        <li><a href="#extra-features-added">Extra features added</a></li>
        <li><a href="#future-scope">Future scope</a></li>
      </ul>
    </li>
    <li>
      <a href="#project-artifacts">Project Artifacts</a>
      <ul>
        <li><a href="#screen-mockups-vs-current-webpage">Screen Mockups vs Current Webpage</a></li>
        <li><a href="#architecture-diagram">Architecture Diagram</a></li>
        <li><a href="#sleep-data-calculations">Sleep Data Calculations</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<div align="center">
  <img src="https://github.com/vatsalunadkat/sleep-pattern-analysis/blob/e9c002705fff6561a0f68450b7da10759fb7592b/documentation/Images/vunadkat6-sleep-pattern-analysis.png" height="400" />
</div>

Sleep is one of the fundamental needs of the human body. It directly affects our physical and mental health. It’s not only important to have the required amount of hours of sleep but it’s also important to have quality sleep. While some people thrive on having a long 8-hour sleep session, others function better when taking naps during the day and a shorter 6-hour sleep session at night. The sleep needs of each individual differ according to their body. It is only by tracking and analyzing the sleep data, we can come to know if these needs are fulfilled properly. The main aim of the Sleep Pattern Analysis App (SPAA) is to make the user aware of which sleeping pattern works best for them.

While there are a lot of tools on the market that track and report sleep data (Android Apps, Smartwatches, Fitness Trackers, etc), very few of them provide some analysis of the sleep data. They inform the user on how long they have slept and in which stage (REM, deep, etc), but they don’t provide information regarding the quality of the sleep, recovery, sleep debt, etc. A lot of the apps also gatekeep information behind paywalls.

The Sleep Pattern Analysis App (SPAA) empowers users by providing them with a detailed analysis of their sleeping patterns to help them make informed decisions. It allows users to import their weekly/monthly data in JSON format, clean and visualize the data, and provide the user with a calculated sleep score along with some recommendations (continue sleep pattern, recovery hours, etc.)

### Built With

* [![React][React.js]][React-url]
* <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript logo" title="JavaScript" height="20" />
* <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white" alt="HTML logo" title="HTML" height="20" /> <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" alt="CSS logo" title="CSS" height="20" />
* <img src="https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white" alt="Python logo" title="Python" height="20" />
* fhir.resources library
* Deployed on  <img src="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white" alt="GitHub Pages" title="GitHub Pages" height="20" />

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Checking capabilities
When you open the webpage simply click on the button `Sample Data`.

### Using provided test data
There are 4 data files located in the folder <a href="https://github.com/vatsalunadkat/sleep-pattern-analysis/tree/e9c002705fff6561a0f68450b7da10759fb7592b/sample_import_data">sample_import_data</a>. Each file includes about 1-month worth of real sleep data I have expoted from my Fitbit accout.

### Using your own data
First fetch your own data using the steps mentioned below. Then click on the `Import` button and upload your .json file to view the analysis.

<details>
  <summary>How to import your sleep data from FitBit.</summary>
  <ol>
    <li> Login to the <a href="https://www.fitbit.com/">Fitbit dashboard</a> using your Fitbit ID or using Google SSO</li>
    <li>Click on the settings icon on the top right</li>
    <li>From the left side menu click on "Data Export"</li>
    <li>Next under "Select data to include" - select Fitbit, then choose the TXT/CSV/JSON format and click on "Next Step".</li>
    <li>Choose the folowing settings (adjust as required) - 
      <ul>
        <li>Destination - Send download link via email</li>
        <li>Frequency - Export Once</li>
        <li>File type - .zip</li>
        <li>File size - 2 GB</li>
      </ul>
    </li>
    <li>Finally click on "Create export". Depending on the size it can take anywhere between 2 to 24 hours to receive the dowload link.</li>
    <li>Download the .zip file </li>
    <li>Navigate to Takeout -> Fitbit -> Global Export Data</li>
    <li>You can select any file starting with the string "sleep-". e.g. "sleep-2023-12-29.json" to upload and use with SPAA</li>
  </ol>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

### Project Timeline

<table>
  <thead>
    <tr>
      <th>Sprint #</th>
      <th>Week #</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Tasks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td><td>1-6</td><td>22nd Jan</td><td>1st Feb</td><td>Team Formation and Kickoff</td>
    </tr>
    <tr>
      <td>2</td><td>7</td><td>2nd Feb</td><td>25th Feb</td><td>Project Planning and Design</td>
    </tr>
    <tr>
      <td rowspan=3>3</td><td>8</td><td>26th Feb</td><td>3rd March</td><td>Project Setup</td>
    </tr>
    <tr>
      <td>9</td><td>4th Mar</td><td>10th Mar</td><td>Import Feature</td>
    </tr>
    <tr>
      <td>10</td><td>11th Mar</td><td>17th Mar</td><td>Data Cleaning + Processing</td>
    </tr>
    <tr>
      <td rowspan=2>4</td><td>11</td><td>18th Mar</td><td>24th March</td><td>Sleep Score Engine</td>
    </tr>
    <tr>
      <td>12</td><td>25th Mar</td><td>31th March</td><td>Sleep Score Engine</td>
    </tr>
    <tr>
      <td rowspan=2>5</td><td>13</td><td>1st Apr</td><td>7th Apr</td><td>Data Visualizations</td>
    </tr>
    <tr>
      <td>14</td><td>8th Apr</td><td>14th Apr</td><td>Export Feature + Cleanup</td>
    </tr>
    <tr>
      <td>6</td><td>15</td><td>15th Apr</td><td>21st Apr</td><td>Testing + Documentation + Final Submission</td>
    </tr>
  </tbody>
</table>


<details>
  <summary>Detailed tasks completed in each week</summary>
  <table>
    <thead>
      <tr>
        <th>Week #</th>
        <th>Accomplishments for the week</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1-7</td>
        <td><ul><li>Team Formation and Kickoff</li><li>Project Planning and Design</li></ul></td>
      </tr>
      <tr>
        <td>8-9</td>
        <td><ul><li>Learning React and JS</li><li>Research about sleep in general</li><li>Setting up project<ul><li>Base React code setup</li><li>GitHub Pages deployment setup</li><li>Resolving issues with deployment</li></ul></li><li>Basic homepage visuals</li><li>Import JSON feature + it’s deployment</li></ul></td>
      </tr>
      <tr>
        <td>10</td>
        <td><ul><li>Learning React and JS</li><li>Research around sleep stages and calculations possible for the available data.</li><li>Data cleaning and processing<ul><li>Checks for invalid JSONs</li><li>Calculation of fields like duration, timeInBed, efficiency, etc.</li><li>Identifying and calculating the level of sleep (deep, light, etc.) from the main data array.</li></ul></li><li>Documentation of above calculation formulas (50% done)</li><li>GitHub Pages deployment maintenance.</li></ul></td>
      </tr>
      <tr>
        <td>11</td>
        <td><ul><li>Research for sleep engine (sleep stages + calculations)</li><li>Started work on sleep engine (scoring) calculations.</li><li>Updated formulas for calculating efficiency more accurately.</li><li>Updated formulas for calculating duration (using 2 methods) and added an error check for &gt;5%.</li><li>Updated JSON processing (part of code cleanup)</li><li>Added proper error handling code (part of code cleanup)</li><li>Updated console logs for better debugging (part of code cleanup)</li></ul></td>
      </tr>
      <tr>
        <td>12</td>
        <td><ul><li>Research for sleep engine (specifically regarding sleep stages)</li><li>Completing work on sleep engine (scoring) calculations.</li><li>Rectifying issues with sleep engine logic. (majority time went here)</li><li>GitHub Pages deployment maintenance.</li><li>Preparation for the next sprint - Learning about data visualizations and exploring its available libraries.</li></ul></td>
      </tr>
      <tr>
        <td>13</td>
        <td><ul><li>Spent time exploring and learning React graph libraries. Tried a few but some of them did not have the customization I was looking for.</li><li>Finally settled on using the 'recharts' library. Most of the time was spent experimenting with the data and graphs.</li><li>Spent some more time modifying the data processing functions as we needed the data in a particular format to give as input for the graphs.</li><li>Also added the sample data button which is supposed to pick up some sample data to show to the user (currently under progress) (extra feature)</li><li>A lot of visual changes + CSS (like choosing color schemes, graph layout, etc.)</li></ul></td>
      </tr>
      <tr>
        <td>14</td>
        <td><ul><li>Export as a FHIR importable resource (export button feature).</li><li>Show/Hide processed JSON data button.</li><li>Updating graph visuals (using more complex graphs).</li><li>Fixed/Updated some calculations (avg sleep debt, sleep phase percentage, etc.).</li><li>GitHub Pages deployment maintenance and checks for final deployment.</li><li>Preparation for the next sprint - started work on documentation.</li></ul></td>
      </tr>
    </tbody>
  </table>
</details>

### Extra features added
- [x] Reactive Graphs
- [x] Sample Data Button
- [x] Show/Hide processed JSON data button

### Future scope
- [ ] Enhanced Exports - More customizations (FHIR compatible) for the export feature.
- [ ] Enhanced Visualization - Adding more interactive and customizable visualization options.
- [ ] Google SSO Login - for quick and easy access to import the data.
- [ ] Enhanced compatibility - Add support to directly import data from the Fitbit APIs, as well as integration and support with Apple Health and Garmin.
- [ ] Integration with Wearable Devices - Integrating with wearable devices to directly import sleep data, providing real-time insights and personalized recommendations.

See the [open issues](https://github.com/vatsalunadkat/sleep-pattern-analysis/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- OTHER ARTIFACTS -->
## Project Artifacts

### Screen Mockups vs Current Webpage
<img src="https://github.com/vatsalunadkat/sleep-pattern-analysis/blob/e9c002705fff6561a0f68450b7da10759fb7592b/documentation/Images/screen_mockups.png" height="400" /> vs <img src="https://github.com/vatsalunadkat/sleep-pattern-analysis/blob/e9c002705fff6561a0f68450b7da10759fb7592b/documentation/Images/vunadkat6-sleep-pattern-analysis.png" height="400" />

### Architecture Diagram
<img src="https://github.com/vatsalunadkat/sleep-pattern-analysis/blob/e9c002705fff6561a0f68450b7da10759fb7592b/documentation/Images/architecture_diagram.png" height="300" />

### Sleep Data Calculations
1. **Calculate Levels Summary:**
   - **Formula:** Calculate the count and total minutes for each sleep stage (deep, light, rem, wake) from the `levels` data.
   - **Function:** `calculateLevelsSummary(sleepData)`
2. **Calculate Duration:**
   - **Formula:** Calculate sleep duration using two methods: 
     - By subtracting `endTime` from `startTime`.
     - By summing the minutes of each sleep stage.
   - **Function:** `calculateDuration(sleepData)`
3. **Calculate Time in Bed:**
   - **Formula:** If `timeInBed` is not provided, calculate it using sleep duration.
   - **Function:** `calculateTimeInBed(sleepData)`
4. **Calculate Efficiency:**
   - **Formula:** Calculate sleep efficiency as the ratio of total sleep time to time in bed.
   - **Function:** `calculateEfficiency(sleepData, levelsSummary)`
5. **Calculate Sleep Metrics:**
   - **Formula:** If `minutesAsleep` and `minutesAwake` are not provided, calculate them using the sum of minutes for each sleep stage.
   - **Function:** `calculateSleepMetrics(sleepData, levelsSummary)`
6. **Calculate Sleep Score:**
   - **Formula:** Calculate sleep score based on duration, sleep stages (deep, light, rem), and efficiency.
   - **Function:** `calculateSleepScore(sleepData, duration, timeInBed, levelsSummary, efficiency, minutesAsleep, minutesAwake)`
7. **Calculate Duration Factor:**
   - **Formula:** Normalize sleep duration between 7 to 8 hours and calculate a factor based on how close it is to the ideal range.
   - **Function:** `calculateDurationFactor(duration)`
8. **Calculate Sleep Phase Factor:**
   - **Formula:** Calculate a factor based on the percentage of time spent in a specific sleep phase compared to the total sleep time.
   - **Function:** `calculateSleepPhaseFactor(phaseMinutes, totalMinutes, targetPercentage)`
9. **Calculate Overall Summary:**
   - **Formula:** Calculate average sleep score, efficiency, hours slept, sleep debt, and sleep stage percentages per day.
   - **Function:** `calculateOverallSummary(jsonData)`



<!-- CONTACT -->
## Contact

Vatsal Paresh Unadkat - vunadkat6@gatech.edu
Project Link: [https://github.gatech.edu/vunadkat6/sleep-pattern-analysis](https://github.gatech.edu/vunadkat6/sleep-pattern-analysis)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
