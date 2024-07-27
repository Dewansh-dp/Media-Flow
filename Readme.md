# Read the following carefully

1. ### express
    to handle request and response

2. ### mongoose 
    used to connect to mongodb database

3. ### nodemon
    used to restart server just after making changes  

4. ### dotenv
    used to config the private variables

5. ### cors
    is a middleware used to configure the incoming request 

6. ### cookie-parser
    allow server to perform curd operation on client cookies

7. ### mongoose-aggregate-paginate-v2
    used to write aggregation queries 

8. ### bcrypt
    used to hash passwords

9. ### jsonwebtoken
    used to create JSON web tokens (JWTs)
    
10. ###  

---

- '.env' have a problem with 'type:module' so the solution for it is to add '-r dotenv/config' in 'dev' command in scripts in the package.json file

- we also used gitignore generators to generate '.gitignore' file

- used .env package to config the environment variables

- async function by default returns a promise

- app.on('eventName',callbackfn) is used to handle custom events and events are emitted by app.emit('eventName')

- app.use() is used to add middlewares and configure settings

- higher order function is the one which either 
    1. takes function as an argument 
    2. returns another function 

- Error is a predefined class 
