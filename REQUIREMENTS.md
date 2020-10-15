# Software Requirements

Use this app with an iPhone and the Expo client app. Test the app with the following steps: 
```
git clone https://github.com/trackChat/trackChat.git
cd trackchat
npm i
npm start
```
Scan the QR code with your iPhone

### Vision: 
A simple and easy to use phone app that allows users to view the location of a group of users on a map. They will also have the ability to chat with each other in the app and send an SOS message in case they are in trouble. 

### Pain Point:
In existing apps you have to change between texting apps and location apps to communicate with each other. This app aims to solve that issue by giving users a space where they can see the location of their friends and chat with them. 

### Why should we care?:
This is a good solution for groups traveling together in a new location, and the SOS button allows users to feel like they can easily reach out to their friends if they get in trouble. This has the technolgy to be built out for parents and guardians to keep track of their children.
	
### Scope
##### IN
* Users will be able to see each other and where they are on a map
* Allows for in app messaging and alert system
* Users will be able to chat with each other in the app
* Users will be identified by their username
##### OUT
* Does not alert authorities with SOS button
* Does not show location to individuals not on app
	
### MVP
* Single chat room made up of every user on app
* Map that shows location of other users using the app
* Ability for user to press a single button to send out a templated SOS signal 
### Stretch Goals
* Alternate, simplified application layout and set of capabilities for children
* Ability to be in and create multiple chat rooms
* Enable user to turn on and off location

### Functional Requirements
* A user can make an account
* A user can sign in with the same username and password in future sessions
* A user can see other user locations on a map
* A user can chat with other users in the application
* A user can send an SOS message that will alert other users that they are in danger
* A user can see other users that have the app so they can find their friends and connect with them

#### Data Flow
* User signs up/logs in to app with username, phone number, email and password
* Sign up is done on the POST `/signup` route, sign in is done on the POST `/signin` route 
* Name, phone number, email, and password are stored in a database when you sign up, referenced when you sign in
* It is a Mongo database, and it is stored on Atlas
* All user names can be reached on the GET `/getusers` route so users can find their friends 
* Users allow app to access location and alerts
* App connects to React Native Maps
* App connects to socket server, hosted on Heroku
* Each location is shared to all sockets from server
* Each user is represented by a pin in the map, with their username displayed above the pin
* The location is updated every 3 seconds
* Messages are shared to all users when sent via the socket server
* SOS triggers an alert on all the users' phones via the socket server
* The Redux store keeps track of each user's "logged in" status, their username, and their location

### Non-Functional Requirements
* Security - Each user makes a private account with a password so no one else can access their account. Their passwords are encrypted before being stored in the database. Each username, password, and phone number that a user signs up with must be unique
* Usability - The user can easily navigate the app with tabs at the bottom of the page. The map centers around the user's initial position and then the user can move the map around to see where other users are on the map. There is a clear SOS button that the user can press to indicate that they are in trouble, and everyone else will receive a clear alert that another user is in danger.

