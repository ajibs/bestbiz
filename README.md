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
  ```bash
  https://bestbiz.herokuapp.com/api/search/?q=
  ```
  - The value of `q` could be a listing name or description
  - Output is in JavaScript Object Notation (JSON)

#### Example
The following example requests all listings that match the query '` payments `' :
```bash
https://bestbiz.herokuapp.com/api/search/?q=payments
```

## Prerequisites
 These are what you need installed on your computer to use the application:

 - Web Browser (Chrome, or Mozilla, or Safari, or Opera, or Microsoft Edge )

 #### For Developers:
 - [Node.js](https://nodejs.org/en/download/)
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - [MongoDb](https://www.mongodb.com/download-center#community)


## Setup
#### Install Node.js and Yarn
If you don't have Node.js installed, please go ahead and grab it [here](https://nodejs.org/). This project uses ES6+ features and requires Node version `<=8.9.1`

Yarn is a package manager for Node.js and can be installed from [here](https://yarnpkg.com/en/docs/install).

To confirm that you have Node.js installed, run the following in your terminal:
```bash
node -v
```
You should get something like `v8.9.1`.

To confirm that you have Yarn installed, run the following in your terminal:
```bash
yarn -v
```
You should get something like `1.3.2`.

#### Setup Database and .env file
You can setup a database on [mlab](https://mlab.com/). You should also create a `.env` file using `.env.sample` as a prototype.

#### Install Node.js Modules
To install all dependencies, run the following in your terminal:
```bash
yarn
```


## Development
To kickstart the application, run the following in your terminal:
```bash
npm start
```

To continue full-stack development on this project, run the following in your terminal:
```bash
npm run dev
```


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


## Possible Features
- Change listing url to slugs
- Authenticated user can upload an image when creating a listing
- Pagination for pages with a lot of data to display e.g. explore page, dashboard


## Author
* [Bolu Ajibawo](https://github.com/ajibs)