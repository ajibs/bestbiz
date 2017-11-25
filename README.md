# Bestbiz
Search and explore business listings.

Bestbiz is a [Devcenter](https://devcenter.co/) Project.


## Feature List
* User can view listings.
* User can search listings through name and description.
* Authenticated user can create a listing for a business.
* New listing contains: business name, address, description, website url, categories, email and phone.
* Authenticated user can see how many views a business listing has had.
* Authenticated user can modify or delete a listing.
* Search API for listing name and description.


## Getting Started
Bestbiz is hosted on Heroku and can be accessed here:
- [Production](https://bestbiz.herokuapp.com/)

### Search API:
Make a GET request via
  > ``` https://bestbiz.herokuapp.com/api/search/?q= ```

  - The value of ``` q ``` could be a listing name or description
  - Output is in JavaScript Object Notation (JSON)
#### Example
The following example requests all listings that match the query '``` payments ```' :
  > ``` https://bestbiz.herokuapp.com/api/search/?q=payments ```


## Prerequisites
 These are what you need installed on your computer to use the application:

 - Web Browser (Chrome, or Mozilla, or Safari, or Opera, or Microsoft Edge )

 #### For Developers:
 - [Git](https://git-scm.com/)
 - [Node.js](https://nodejs.org/en/download/)
 - [MongoDb](https://www.mongodb.com/download-center#community)
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - ``` yarn ``` will install all dependencies


## Built With
- [Git](https://git-scm.com/) - Version Control
- [Node.js](https://nodejs.org/) - JS Runtime Environment
- [Yarn](https://yarnpkg.com) - Package Manager
- [Express](https://expressjs.com/en/starter/installing.html) - Web Framework
- [Pug](https://pugjs.org/api/getting-started.html) - Templating Engine
- [Webpack](https://webpack.js.org/) - Build Tool
- [Babel](https://babeljs.io/) - Transpiler
- [Eslint](https://eslint.org/) - Linting Tool
- [mLab](https://mlab.com/) - Database
- [Heroku](https://heroku.com) - Hosting and Continuous Deployment
- [VS Code](https://code.visualstudio.com/) - Code Editor
- [Chrome](https://www.google.com/chrome/browser/desktop/index.html) - Browser


## Author
* [Bolu Ajibawo](https://github.com/ajibs)


## Acknowledgments
* [FreeCodeCamp](https://www.freecodecamp.org/)
* [Chingu Cohorts](https://chingu-cohorts.github.io/chingu-directory/)
* Red Pandas
* Developer Community
* Family and Friends
