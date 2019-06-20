# Wellness Event Booking Application

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) ![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)

The idea for the project is creating web-based application to provide wellness event booking between vendors and company users with NodeJS

## Database Scheme

![Database Scheme](https://res.cloudinary.com/drovood07/image/upload/v1557213537/database_scheme_tuzq9l.png)

This project uses NoSql database, mongoDB, and you can see the full details of database scheme including validator and sample data in [Database Scheme](https://mhc-wellness.herokuapp.com/erd.html)

## MongoDB Collections

![Sample](https://res.cloudinary.com/drovood07/image/upload/v1557213746/Mongodb_Collection_r7qmne.png)

You can find full data of mongoDB collection in screenshot and json format in [MongoDB Collections](https://mhc-wellness.herokuapp.com/mongodb.pdf)

## How it works

Here is the full guide and response of the API on what feature you can apply.

To give you a clear explanation, these are the list of actors and business processes.

#### Actors

- Hr Company Account
- Vendor

by default, there are already created accounts, 2 HR and 2 Vendor users. However, you can create more for I provided the API to create additional users.

#### Business Processes

**1. As a Hr Company Account**

- Login => Redirect to HR Dashboard
- Get all Events / Grouped => HR can choose event from the listed event
- Create a Booking => Input proposed dates (3 choices) and choosen event
- Get all Booked Event => Only showing booked event by specific Hr ID

**2. As a Vendor**

- Login => Redirect to Vendor Dashboard
- Create, Read, Update Event => Admin is able to create event
- Get all Booked event => Only showing booked event by specific Vendor ID
- Update status to Approved/Reject => If Vendor gives 'approved' status, Vendor will choose one of the proposed date. If Vendor gives 'rejected' status, Vendor will give the remarks on why it is rejected.

**Hr Company Account**

1. Login

![Login HR](https://res.cloudinary.com/drovood07/image/upload/v1557210111/Screen_Shot_2019-05-07_at_1.21.26_PM_g0hjvz.png)

Give a response of success status and token (used to authorize specific task that only HR company account may do)

2. Redirect to Dashboard and Get Grouped Events

![Get all grouped events](https://res.cloudinary.com/drovood07/image/upload/v1557210380/Screen_Shot_2019-05-07_at_1.25.54_PM_nzcqmq.png)

Give a response of success status and all events in group (If event name is same, vendor Id will be stored in an Array)

3. Create a booking

![Get all grouped events req](https://res.cloudinary.com/drovood07/image/upload/v1557210875/Screen_Shot_2019-05-07_at_1.34.03_PM_e5ce0w.png)
![Get all grouped events res](https://res.cloudinary.com/drovood07/image/upload/v1557210874/Screen_Shot_2019-05-07_at_1.33.54_PM_o3vsmv.png)

Input 3 proposed dates and choosen event ID. The response will give the created booking (let default null value on "responseDate", "confirmedDate", and "remarks", it will be updated when Vendor accept/reject the book)

4. Get Booking by HR ID (Only showing the booked event by specified HR ID)

![Show Booked Event](https://res.cloudinary.com/drovood07/image/upload/v1557211234/Screen_Shot_2019-05-07_at_1.40.04_PM_zjfw7k.png)
![Show Booked Event](https://res.cloudinary.com/drovood07/image/upload/v1557211326/Screen_Shot_2019-05-07_at_1.41.49_PM_kdifkf.png)

Give response of booked event data and show the data by stored Hr Id Field.

**Vendor**

1. Login

![Login Vendor](https://res.cloudinary.com/drovood07/image/upload/v1557211754/Screen_Shot_2019-05-07_at_1.48.37_PM_dpmgfl.png)

Give a response of success status and token (used to authorize specific task that only Vendor may do)

2. Redirect to Dashboard and CRUD Event features

![Create Event req](https://res.cloudinary.com/drovood07/image/upload/v1557211923/Screen_Shot_2019-05-07_at_1.51.43_PM_kdv1oa.png)
![Create Event res](https://res.cloudinary.com/drovood07/image/upload/v1557212056/Screen_Shot_2019-05-07_at_1.53.29_PM_bac3kt.png)

Give a response of success status and created event's name and vendorId will be stored.

3. Get Booking by Vendor ID (Only showing the booked event by specified Vendor ID)
   ![Get Booked Event Vendor](https://res.cloudinary.com/drovood07/image/upload/v1557212475/Screen_Shot_2019-05-07_at_2.00.58_PM_zwn5nx.png)
   ![Get Booked Event Vendor res](https://res.cloudinary.com/drovood07/image/upload/v1557212555/Screen_Shot_2019-05-07_at_2.02.07_PM_gnqs4m.png)

Give response of booked event data and show the by stored Vendor Id Field.

4. Update status to 'Approved or 'Rejected'
   ![Update Status req](https://res.cloudinary.com/drovood07/image/upload/v1557212685/Screen_Shot_2019-05-07_at_2.04.23_PM_cfrdb4.png)
   ![Update Status res](https://res.cloudinary.com/drovood07/image/upload/v1557212737/Screen_Shot_2019-05-07_at_2.05.20_PM_zrglqo.png)

Give a response of updated booking data. If status 'Rejected', Vendor must fill the 'remarks' field to give the reason. If 'approved', choosen date from 'Date' (proposed dates) will be stored in 'confirmedDated'

## Setting Prerequisites

This project require [NodeJS](https://nodejs.org/) to run

To install:

```
$ git clone git@bitbucket.org:idrusandwinata/backend.git
$ cd MHC-Wellness
$ npm install or yarn install
$ npm start or yarn start
```

## Unit Testing Dependencies

This project is provided by Unit Testing, and the dependencies are:

- [chai](https://www.chaijs.com/)
- [chai-http](https://www.chaijs.com/plugins/chai-http/)
- [chai-like](https://www.npmjs.com/package/chai-like)
- [chai-things](https://www.chaijs.com/plugins/chai-things/)
- [mocha](https://mochajs.org/)
- [nyc](https://www.npmjs.com/package/nyc)

## Unit Testing Coverage

![GetCoverage](https://res.cloudinary.com/drovood07/image/upload/v1557220864/Screen_Shot_2019-05-07_at_4.20.48_PM_nfksqu.png)

This is the coverage, as a result of all functional codes:

- [Coverage](https://mhc-wellness.herokuapp.com/coverage/)

## Backend Dependencies

The framework and packages used are listed below:

- [express](https://www.express.com/)
- [mongoose](https://mongoosejs.com)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/bcrypt)
- [morgan](https://www.npmjs.com/package/morgan)
- [dotenv](https://www.npmjs.com/package/dotenv)

NOTE: please open `.config.env` file to access the environment variable

## Deployment

This project is deployed to Heroku web server, you can access all of the API below:

- [MHC Wellness Heroku](https://mhc-wellness.herokuapp.com)

## Documentation

The documentation for this project can be found here and if you use [Postman](https://www.getpostman.com/) you can directly run all of the API within the environment

- [MHC Wellness Documentation](https://documenter.getpostman.com/view/6658461/S1LsZr4e#3a1a78ed-1537-44f1-8466-9987acdc3967)

## License

```
Copyright 2019 M Idrus Salam

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
