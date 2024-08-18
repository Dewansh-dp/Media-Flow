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

10.   ### multer

      used for uploading file

11.   ### cloudinary
      is a service used to store the media on its server

---

-  '.env' have a problem with 'type:module' so the solution for it is to add '-r dotenv/config' in 'dev' command in scripts in the package.json file

-  we also used gitignore generators to generate '.gitignore' file

-  used .env package to config the environment variables

-  async function by default returns a promise

-  app.on('eventName',callbackfn) is used to handle custom events and events are emitted by app.emit('eventName')

-  app.use() is used to add middlewares and configure settings

-  higher order function is the one which either

   1. takes function as an argument
   2. returns another function

-  Error is a predefined class in node

-  we have generated access token from SHA256

-  uploading the media files first to the local diskstorage and then uploading it to the cloudinary and deleting(unlink) the files which were not uploaded from local to cloudinary

-  multer.diskStorage({}) have two options only (destination,filename)

-  if we write a URL on chrome browser, only GET request will give us response and to get response of the POST request we have to use thunder client or postman

-  cookies are accessed two ways (req and res both have access)

-  if 'undefined' value is added to the cookies then they are stored like string "undefined"

-  we are setting cookie maxAge(takes value in milliseconds) that is the expiry of the cookie
   we can also use expires(takes Date value) attribute to set the expiry
   but do not confuse with the jwt token expiry
   -  JWT and Cookies both have their own exipry and we have set both

- all dotenv variables become type string