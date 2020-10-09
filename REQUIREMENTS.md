### Vision: 
A simple and easy to use app that allows users to view the location of a group of users.

### Pain Point:
Creates a centralized view to locate and communicate with a group of people to enable safe travel

### Why should we care?:
The ability to press a single button and alert friends when lost or in danger.
	
### Scope
##### IN
* Shows location of others using app
* Allows for in app messaging and alert system
* Users will be able to communicate within app
* Users will be identified by their phone numbers
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
#### Data Flow
* User signs up/logs in to app with name, phone number, and password
* Name, phone number, and password are stored in database when you sign up, referenced when you sign in
* Users allow app to access contacts, sms, and geolocation, more?
* App connects to map API or Google Map, or something equivalent
* App connects to socket server
* Each location is shared to all sockets from server
* Movement or passage of time triggers location update
* Messages are shared to all users when sent
* SOS triggers SMS send
* State keeps track of location and messages to display

### Non-Functional Requirements
* Simple, clean layout of application
* Easily accessible 
