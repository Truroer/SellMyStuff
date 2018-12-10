# SellMyStuff

I delevoped a module to calculate a package shipping cost from different providers, based on the user location, and item characteristics. This basic demo app shows the module integrated in a simple marketplace. 

## Screenshots

![SellMyStuff](https://res.cloudinary.com/truroer/image/upload/c_scale,w_242/v1544440081/App_2018-12-10_11-58-38.png)
![SellMyStuff](https://res.cloudinary.com/truroer/image/upload/c_scale,w_242/v1544440081/App_2018-12-10_11-42-02.png)
![SellMyStuff](https://res.cloudinary.com/truroer/image/upload/c_scale,w_242/v1544440081/App_2018-12-10_11-42-44.png)

## Getting started 
To get Node go to nodejs.org

Clone this repo and enter:

`git clone https://github.com/Truroer/SellMyStuff.git`

`cd SellMyStuff`

### Frontend
go to the frontend folder: 
`cd App`
install dependecies
`npm install`
run the app:
`npm start`

### Backend
install postgresql:

`brew install postgres`

Access PostgresSQL command line on the default database "postgres":

`psql postgres`

Your bash should now look like this:

`psql (10.3)
Type "help" for help.
postgres=#`

Now create a new database and connect it:

`postgres=# CREATE DATABASE template1;
postgres=# \c template1;`

go to the backend folder 

`cd server`
install dependecies

`npm install`

start the server:
`npm node index.js`

## Tech Stack

* Front-end: 
  * Angular

* Back-end:
  * Express.js
  * PostgreSQL


## Developed by:

* Maxim Sinelnikov - [GitHub](http://github.com/Truroer) - [LinkedIn](https://www.linkedin.com/in/maxim-sinelnikov-35a46316a)
