# MHC - Wellness Event Booking Application

The idea for the project is creating web-based application to provide wellness event booking between vendors and company users with NodeJS

# Database Schema

This project uses NoSql database, mongoDB, and you can see the full details of database scheme including validator and sample data in [here](https://mhc-wellness.herokuapp.com/erd.html)

# Setting Prerequisites

This project require [NodeJS](https://nodejs.org/) to run

To install:

```
$ git clone git@bitbucket.org:idrusandwinata/backend.git
$ cd MHC-Wellness
$ npm install or yarn install
$ npm start or yarn start
```

# Unit Testing Dependencies

This project is provided by Unit Testing, and the dependencies are:

- [chai](https://www.chaijs.com/)
- [chai-http](https://www.chaijs.com/plugins/chai-http/)
- [chai-like](https://www.npmjs.com/package/chai-like)
- [chai-things](https://www.chaijs.com/plugins/chai-things/)
- [mocha](https://mochajs.org/)
- [nyc](https://www.npmjs.com/package/nyc)

# Unit Testing Coverage

This is the coverage, as a result of all functional codes:

- [Coverage](https://reddit-in.herokuapp.com/coverage/)

# Backend Dependencies

The framework and packages used are listed below:

- [express](https://www.express.com/)
- [mongoose](https://mongoosejs.com)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/bcrypt)
- [morgan](https://www.npmjs.com/package/morgan)
- [dotenv](https://www.npmjs.com/package/dotenv)

NOTE: please open `config.json` file to access the environment variable

# Deployment

This project is deployed to Heroku web server, you can access all of the API below:

- [MHC Wellness Heroku](https://mhc-wellness.herokuapp.com)

# Documentation

The documentation for this project can be found here and if you use [Postman](https://www.getpostman.com/) you can directly run all of the API within the environment

- [MHC Wellness Documentation](https://documenter.getpostman.com/view/6658461/S1LsZr4e#3a1a78ed-1537-44f1-8466-9987acdc3967)

# License

```
Copyright 2019 M Idrus Salam

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
