# Boilerplate
Boilerplate is a microservice(written in **ES7**) to demontrate architecturing nodejs app for reminder App.It is built on the top of pure MVC architecture which includes following modules:- 

- **api** :- includes all the folders which process request and implement business logic on it, then produce desired output for the users.Its subparts consists:- 
  -**routes**:- consists all api routes of the application.
  -**controllers**:- acts as a mediator between the routes and models. Important! it never implement any kind of business logic on the requests. It only responsebody wrapper and pass it to the global handler.
  -**models**:- core files of the application which consists all the business logic and defined so properly that could be test independentely.
  -**helpers**:- these are the utilities functions or packages which could implement thirdparty logic or the generic function which is common for models.
  -**libs**:- consists of wrappers that could be used as generic middlewares.
  -**crons**:- consists of cron functions used as to run cron job.

-**config**:- consists all configurations of the application (including invoking of db connections).

-**server.js**:- starting point of the application which invokes babel and lets devs to define es7 in the files.

# Server starting 
To start the server .env is file is required because all the credentials for the application resides in it and the command to start it is

``` npm start ```



# Testing of the application 
Jest is used for the testing purposes and all the test cases and suites could be find in the **test** module in the root folder.

Command to run tests
``` npm test ```


# Database Integration 
Used mongodb for database connection. refer sample.env.example for .env variables

# SMS Integration 
Used fast2sms for sms.



