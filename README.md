<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">Sleep Pattern Analysis App (SPAA)</h3>

  <p align="center">
    An awesome application to analyze your sleep data and export it! (FHIR compatable)
    <br />
    <br />
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
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Sleep is one of the fundamental needs of the human body. It directly affects our physical and mental health. It’s not only important to have the required amount of hours of sleep but it’s also important to have quality sleep. While some people thrive on having a long 8-hour sleep session, others function better when taking naps during the day and a shorter 6-hour sleep session at night. The sleep needs of each individual differ according to their body. It is only by tracking and analyzing the sleep data, we can come to know if these needs are fulfilled properly. The main aim of the Sleep Pattern Analysis App (SPAA) is to make the user aware of which sleeping pattern works best for them.

While there are a lot of tools on the market that track and report sleep data (Android Apps, Smartwatches, Fitness Trackers, etc), very few of them provide some analysis of the sleep data. They inform the user on how long they have slept and in which stage (REM, deep, etc), but they don’t provide information regarding the quality of the sleep, recovery, sleep debt, etc. A lot of the apps also gatekeep information behind paywalls.

The Sleep Pattern Analysis App (SPAA) empowers users by providing them with a detailed analysis of their sleeping patterns to help them make informed decisions. It allows users to import their weekly/monthly data in JSON format, clean and visualize the data, and provide the user with a calculated sleep score along with some recommendations (continue sleep pattern, recovery hours, etc.)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



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

## Checking Capabilities

When you open the webpage simply click on the button "Sample Data".

## Using your own data

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

| Sprint # | Week | Start Date | End Date | Tasks |
| :---         | :---           | :---          | :---         | :---                        |
| 1            | 1-6            | 22nd Jan      | 1st Feb      | Team Formation and Kickoff  |
| 2            | 7              | 2nd Feb       | 25th Feb     | Project Planning and Design |
| 3            | 8              | 26th Feb      | 3rd March    | Project Setup               |
| 3            | 9              | 26th Feb      | 3rd March    | Import Feature              |
| 3            | 10             | 11th Mar      | 17th Mar     | Data Cleaning + Processing  |
| 4            | 11             | 18th Mar      | 24th Mar     | Sleep Score Engine          |
| 4            | 12             | 25th Mar      | 31st Mar     | Sleep Score Engine          |
| 5            | 13             | 1st Apr       | 7th Apr      | Data Visualizations         |
| 5            | 14             | 8th Apr       | 14th Apr     | Export Feature + Cleanup    |
| 6            | 15             | 15th Apr      | 21st Apr     | Testing + Documentation + Final Submission |

### Extra Features Added (bonus)
- [x] Sample Data Button
- [x] Show/Hide processed JSON data button

See the [open issues](https://github.gatech.edu/vunadkat6/sleep-pattern-analysis/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Vatsal Paresh Unadkat - vunadkat6@gatech.edu

Project Link: [https://github.gatech.edu/vunadkat6/sleep-pattern-analysis](https://github.gatech.edu/vunadkat6/sleep-pattern-analysis)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
