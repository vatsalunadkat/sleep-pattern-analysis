<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">Sleep Pattern Analysis App (SPAA)</h3>

  <p align="center">
    An awesome application to analyze your sleep data and export it! (FHIR compatable)
    <br />
    <br />
    <a href="https://github.gatech.edu/pages/vunadkat6/sleep-pattern-analysis/">Visit App</a>
    ·
    <a href="https://github.gatech.edu/vunadkat6/sleep-pattern-analysis">View Demo</a>
    ·
    <a href="https://github.gatech.edu/vunadkat6/sleep-pattern-analysis/issues/new">Report Bug</a>
    ·
    <a href="https://github.gatech.edu/vunadkat6/sleep-pattern-analysis/issues/new">Request Feature</a>
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
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<div align="center">
  <img src="https://github.gatech.edu/vunadkat6/sleep-pattern-analysis/blob/main/documentation/Images/vunadkat6-sleep-pattern-analysis.png" height="400" />
</div>

Sleep is one of the fundamental needs of the human body. It directly affects our physical and mental health. It’s not only important to have the required amount of hours of sleep but it’s also important to have quality sleep. While some people thrive on having a long 8-hour sleep session, others function better when taking naps during the day and a shorter 6-hour sleep session at night. The sleep needs of each individual differ according to their body. It is only by tracking and analyzing the sleep data, we can come to know if these needs are fulfilled properly. The main aim of the Sleep Pattern Analysis App (SPAA) is to make the user aware of which sleeping pattern works best for them.

While there are a lot of tools on the market that track and report sleep data (Android Apps, Smartwatches, Fitness Trackers, etc), very few of them provide some analysis of the sleep data. They inform the user on how long they have slept and in which stage (REM, deep, etc), but they don’t provide information regarding the quality of the sleep, recovery, sleep debt, etc. A lot of the apps also gatekeep information behind paywalls.

The Sleep Pattern Analysis App (SPAA) empowers users by providing them with a detailed analysis of their sleeping patterns to help them make informed decisions. It allows users to import their weekly/monthly data in JSON format, clean and visualize the data, and provide the user with a calculated sleep score along with some recommendations (continue sleep pattern, recovery hours, etc.)

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![React][React.js]][React-url]
* <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript logo" title="JavaScript" height="25" />
* <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white" alt="HTML logo" title="HTML" height="25" /> <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" alt="CSS logo" title="CSS" height="25" />
* <img src="https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white" alt="Python logo" title="Python" height="25" />
* fhir.resources library
* Deployed on  <img src="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white" alt="GitHub Pages" title="GitHub Pages" height="25" />

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Checking capabilities
When you open the webpage simply click on the button "Sample Data".

### Using provided test data
There are 4 data files located in the folder <a href="https://github.gatech.edu/vunadkat6/sleep-pattern-analysis/tree/main/sample_import_data">sample_import_data</a>. Each file includes about 1-month worth of real sleep data I have expoted from my Fitbit accout.

### Using your own data
First fetch your own data using the steps mentioned below. Then click on the "Import" button and upload your .json file to view the analysis.

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
</details>

### Extra features added
- [x] Sample Data Button
- [x] Show/Hide processed JSON data button

See the [open issues](https://github.gatech.edu/vunadkat6/sleep-pattern-analysis/issues) for a full list of proposed features (and known issues).

### Future scope
- [ ] Google SSO login
- [ ] Directly importing data using the Fitbit APIs

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- OTHER ARTIFACTS -->
## Project Artifacts

### Screen Mockups vs Current Webpage
<img src="https://github.gatech.edu/vunadkat6/sleep-pattern-analysis/blob/main/documentation/Images/screen_mockups.png" height="400" /> vs <img src="https://github.gatech.edu/vunadkat6/sleep-pattern-analysis/blob/main/documentation/Images/vunadkat6-sleep-pattern-analysis.png" height="400" />

### Architecture Diagram
<img src="https://github.gatech.edu/vunadkat6/sleep-pattern-analysis/blob/main/documentation/Images/architecture_diagram.png" height="300" />


<!-- CONTACT -->
## Contact

Vatsal Paresh Unadkat - vunadkat6@gatech.edu
Project Link: [https://github.gatech.edu/vunadkat6/sleep-pattern-analysis](https://github.gatech.edu/vunadkat6/sleep-pattern-analysis)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
