--I'm Feeling Hungry--

* a full stack recipe generator that allows users to search for recipes based on ingredients,
  max cook time, meal type, cuisine type, alleries, and/or diets. users can also create and log in
  to an account to save recipes and view their saved recipes. user is delivered up to 6 different
  recipe option previews after upon searching and can click on them to view ingredients, instructions,
  and access the webpage that hosts the original recipe.
* developed by Audrey Holbrook, Sabrina Frank, Michelle Ung, Emily Freeman, Jianing Leng, and Zhanpeng Huang

GITHUB
* this project is hosted on github at https://github.com/ach38075/im-feeling-hungry
* to clone the repositiory to your local device, type the following command into your terminal:
     "git clone https://github.com/ach38075/im-feeling-hungry.git"
* to pull any updates made by developers, type the following commands into your terminal:
     "cd im-feeling-hungry"
     "git pull origin main"

REQUIREMENTS:
* Node.js for the frontend
* Docker Desktop for backend
* Git to pull repo and fetch updates

HOW TO RUN PROJECT:
1. Start running Docker
2. Start the backend server,
   from the "im-feeling-hungry" directory, type the following commands into your terminal:
       "cd backend"
       "./build_local.sh"
* This builds a Node.js Docker image, installs dependencies, and starts the backend server on port 8080.
* See backend/README.md for more specific details around starting the backend
3. Start the front end,
   from the "im-feeling-hungry" directory, type the following commands into another terminal window:
       "cd frontend"
       "npm install" // this only needs to be done when running for the first time
       "npm run dev"
* This will launch the frontend app at http://localhost:5173.
4. Visit http://localhost:5173 in web browser and begin searching for recipes!
* This project has been designed for Google Chrome -- It will run in other web browsers,
  but some formatting may not look exactly as intended.

HOW TO STOP PROJECT:
1. To kill the frontend process,
    * press "Ctrl + C" in the terminal running frontend
2. To kill the backend server,
    * in a terminal that is not the one running the backend, type "docker ps" to get a list of container ids
    * look for the container id with the image cs4050-backend
    * type "docker stop <CONTAINER_ID>" with the container id from before

