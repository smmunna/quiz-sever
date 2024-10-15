## Node.js Server Starter Template

### Installation Process
1. Run the following command
```javascript
npx nodeexpressjs
```
2. Create a new database in MongoDB Compass or MongoDB Cloud Storage
3. Then update `.env` file `DATABASE_URL`, Default name given `nextjs` change it whatever you want.
4. You can add local and also cloud for production level.
5. Then create a new table name `users`, contain following fields.
   ```javascript
   {
      "username": "Minhazul Abedin Munna",
      "email": "munna@gmail.com",
      "password": "1234",
      "role": "admin"
   }
   ```
6. Goto this project directory & open `two` terminal
```javascript
npx tsc --w
```
```javascript
npm start
```
7. Now project will run in following port
```javascript   
http://localhost:5000
```

### New Features
   - Server created with Node, Express, TypeScript (JS)

### Installed packages (NPM)
   - "cors"
   - "dotenv"
   - "express"
   - "jsonwebtoken"
   - "mongoose"
   - "nodemon"
   - "typescript"
   - "multer"
   - "sslcommerze"
   - "paypal": maybe not supported
   - "bcrypt"
   - "nodemailer"
   - "helmet"

### Folder Structures
   - `dist` > compiled the src folder all files
   - `src` > contains all the important folders
   - `app` > contains middleware, modules, utils
   - `app.ts`> base of the application
   - `server.ts`> server configuration here
   - `utils.ts`> contains important functions


  #### Thank you
  2024&copy; Developed by <a href="https://github.com/smmunna">smmunna</a>