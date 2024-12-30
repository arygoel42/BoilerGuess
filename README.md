#BoilerGuess
BoilerGuess simulates the popular geography game, "Geoguessr", tailored to Purdue and the West Lafayette region surrounding campus. 

##🚀 Features
🌟 Gameplay
Explore Purdue landmarks in a GeoGuessr-style game
Two different game modes. The Easy game mode picks popular locations around Purdue's Campus, whereas the hard game mode chooses any location within West Lafayette

🔐 Authentication
Google Authentication Login option (OAuth 2.0)
Traditional username and password login
JWT-based authentication for secure sessions
Authentication middleware for server-side request validation
Secure input validation with JOI

🗺️ Google Maps API Integration
Utilized Google Maps API to implement interactive and responsive map, as well as obtain street-view of locations picked
Implemented a timer through useState variables to track time for each guess. Points were awarded based off of accuracy and time taken for each guess

##⚡Technologies Used
React: Frontend framework for building reusable UI components
React Query: Efficient state management and server-side data fetching
Axios: Handle asynchronous HTTP requests to the backend
Node.js & Express: Backend framework for API development
MongoDB: Database for storing user data, game progress, and achievements
TypeScript: Adds static typing to JavaScript for safer and more robust code
HTML & CSS: Core technologies for layout and styling
JWT Tokens: Secures user sessions
JOI: Ensures secure server-side validation of user inputs

##🖥️ Deployment
BoilerGuess is deployed through Vercel

##Try it for yourself!
To play the game, visit the following link: https://purdue-geoguessr.vercel.app/
