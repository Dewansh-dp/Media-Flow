# Read the following carefully

1. ### express
    to handle request and response

2. ### nodemon
    used to restart server just after making changes  

3. ### dotenv
    used to config the private variables

4. ### cors
    is a middleware used to configure the incoming request 

5. ### cookie-parser

---

- '.env' have a problem with 'type:module' so the solution for it is to add '-r dotenv/config' in 'dev' command in scripts in the package.json file

- we also used gitignore generators to generate '.gitignore' file

- used .env package to config the environment variables

- async function by default returns a promise

- app.on('eventName',callbackfn) is used to handle custom events and events are emitted by app.emit('eventName')

- app.use() is used to add middlewares and configure settings