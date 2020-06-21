# Recruitify

## About
Recruitify is a MERN Stack based web application providing an optimized **Interview Platform** for recruitements of new Employees/students.It has various features ranging from **Video Conferencing** to White board interviews thorugh **real-time Notepad**. We are exploring new ways to structure our interview process to create familiarity for candidates and account for bias, resulting in better candidate experience and hiring decisions.

## Product Features
* Login registration for the Interviewer
* Generate unique IDs for video call
* Video call for the interview
* Real-time live notepad for white board Interview
* Scoring in real-time
* View pending interviews
* View past interviews
* Massmailer to send register links to the the students for interviews.
## Hiring Process
The process of hiring is a fixed sequence of steps. The following steps are available:

* Application for the vacancy by the applicant
* Smart-filter — filter the candidate on the basis of the number of skills he/she has.
* Video interviews
* Score
* Save performance of the candidate into the database for future reference.

## The problem it solved
During this time of COVID'19,it is not possible for companies to have a physical recruitement drives in various Universities.
So,we have developed a platform to help the recruiters to get in touch with students remotely.
This platform is useful,even for those companies,which recruit employess from various parts of the world.

We have added new ways to structure our interview. We have added real-time notepad and scoring features on our platform. Live notepad makes a smooth understanding between candidate and interviewer while discussing the problems. We also developed a resume filter built using Natural Language Processing. It filters out the candidates on the basis of their skills and thus makes the interview process less hectic and more effective.

## Challenges we ran into

There were two challenges that we faced in this 32 hour long hackathon.

* We have faced problem while extracting the text from the resume pdf. In the beginning, we have used **PyPDF2** module to extract the text from pdf but it was only able to read **"\n"** from the pdf and thus we are not getting desire output. We have fixed this issue by using the **tika** module of python.
Also, the resume filter is only able to extract the data and filters the candidate on the basis of their skills. Due to time constraints, we are not able to extract all the details like name, emails, etc from the resume itself.
* The mailing system works from a given location only.As we used Gmail as our SMTP service,it doesn't allow sending mails from two different locations.


## Requirements
* **MERN STACK**
   * **MongoDB** - MongoDB is a cross-platform document-oriented database 
              program. It is used to store data related to candidates.
   * **Express** - Expres is a web application framework for Node.js. It is used for routing.
   * **React** - React is an open-source JavaScript library for building user interfaces. It is used for front end.
   * **NodeJS** - Node.js is an open-source server environment. It is used for backend.
* **Socket IO** - Socket.IO is a JavaScript library for realtime web applications. It is used for real-time display of notepad and also to make initial peer connections for video calls.
* **SMTP** - The Simple Mail Transfer Protocol is a communication protocol for electronic mail transmission. It is used for mass mailing.
* **WEBRTC** - An open framework for the web that enables Real-Time Communications (RTC) capabilities in the browser. It is used for video calling.
* **PassportJS** - Passport is authentication middleware for Node. js. It is used for authentication and authorization(Login and sign-up).


## Installation
### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0
* Open http://localhost:3000

### ReactJS
Make sure you have installed the latest [Node.js](https://nodejs.org/en/) installed.

* Install React from terminal:

`npm install -g create-react-app`

* If successful, you should be able to get version:

`create-react-app --version`

* Create react project:

`create-react-app <projectname>`

* Run project:

``` bash
cd <projectname>
npm star
```

* Open http://localhost:9000

## Database Schema

Tables/Collections-

* ADMIN
* Name
	* Organization
	* Email
	* Password
	* isVerified

* STUDENT
	* Name
	* Email
	* Institute
	* Degree
	* Branch
	* Scholar Number
	* CGPA
	* criteriaMatched
	* Resume
	* Admin
	* Interview
		* isInterviewed
		* isSelected
		* Organization
		* Date
		* Time
		* Score
		* Notepad


