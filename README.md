Dear Team, I tried to cover the assesment requirements as provided here: https://github.com/ombori/fullstack-code-test-ts.
I would like to give a detailed walkthrough of how I build this solution.

* I have bootstrapped this application with Create React APP. It provided me with built-in setup of running, testing, build processing and scaffolding of the complete application.
* I used to follow this directory structure:
 ![directory_structure](https://github.com/tahir-masood1/omburi-assesment/assets/99633903/9a58cb9e-751e-421b-8a4a-702b8568f430)

This way I got complete segregation of static elements (Assets for Images, Helpers for static textual constants), Services for all network communications, Components for all screens or deatures inside the application. I tries to separately define the css for each component, placed inside the folder against each component. This way I remains aware of specific locations of where to find one csuch components' css.
    * same component folder can have the test file against each component
* I have applied eslint with prettier as formatter for this application. These are my main go-to tools regarding linting and formatter for the any React FE application. I have alse fixed all the lint errors in the application. Usually I used to bind the successful run of eslint as a required process before any build is performed.
* I have used toast messaging to show any notification like when we have no more users to show in the scrolling. 
* I have tried to follow the design images to replicate in a responsive layout. Although web design was not provided, but I have tried to figure it out using mobile design provided.
* I have tried to animate through the provided loading image but it was not providing the required results. So I have trimmed it in .gif image and used it in the application. Proof of my attempts regarding animation are available in the dashboard.css file which can be reviewed as well.  
 
**Steps to run this app**
* Clone or checkout code from repo
* run command >  **npm install**
* run command > **npm start**
