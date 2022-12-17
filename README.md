# This is the README for BlinSoft Internship Project

> ![Image](assets/img/tripData.png)

### Backend for customization of itenaries for a trip-planner project.

## Technology Used

Trip Planner is a full-stack app, built primarily using Node, Express.js and MongoDB. Utilized languages include HTML, CSS, JavaScript and mongoose.

## Installation

Here are instructions for installing the app on your local machine.

1. Clone the copy to your local machine.

```
git clone https://github.com/jhaashutosh/blinsoft-trip-planner-backend
```

2. Install the required dependencies.

```
npm install
```

3. Create a new file named `.env` and copy the content below into it. Set `SECRET` equal to the string of your choosing.

```
SECRET=''
PORT=''
```

4. This app utilizes mongoDB for its database system.

```
You have to connect your mongoDB atlas or mongoDB compass to run this app.
Create a cluster and then create a database named "user"
```

5. Start the server.

```
Note: the app is set up to run on port 4522, but you can set it in the `env file` .
```

6. use postman to hit different API routes:

## USING POSTMAN TO VIEW DATA

```
1. /register = "registration data has to be provided in the body of the request and creating a post request"
2. /login = "login using the same credentials by posting data in the body of the request"
3. /add-trip = "To GET all the trip's data" (GET REQUEST)
4. /add-trip = "To ADD a new trip" (POST REQUEST)
5. /add-trip/:id = "To GET data of a particular trip" (GET REQUEST)
6. /add-trip/:id = "To UPDATE a particular tri's data" (PUT REQUEST)
7. /add-trip/:id = "To DELETE a particular trip" (DELETE REQUEST)

```

npm start

```

```
