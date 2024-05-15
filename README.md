Project Title : _Real-time Sensor Data Visualization_

This project is divided into three main folders: client, server, and script.

**Client**

The "client" folder contains the frontend code of the application. To set up the client-side application, follow these steps:

1. Navigate to the "client" folder.
2. Run 'npm install' or 'npm i' to install all the required packages.
3. After installation, you can start the development server by running 'npm start'.
4. Open http://localhost:3000 in your browser to view the application.

**Server**

The "server" folder contains the backend code of the application. To set up the server-side application, follow these steps:

1. Navigate to the "server" folder.
2. Run 'npm install' or 'npm i' to install all the required packages.
3. After installation, configure the local MySQL database connection by setting the DB_URL environment variable.
   For example: DB_URL="mysql://root:password@localhost:3306/schemaName".
   _Note: Replace 'schemaName' with the name of your database schema. If you don't have a schema yet, create a new one and replace 'schemaName' with its name._
4. Run 'prisma migrate dev' to apply any pending migrations to your local development database.
5. Run 'prisma generate' to generate Prisma Client, ensuring your database access code is up-to-date.
6. Start the server by running 'npm start'.
7. The server will start running on the specified port, typically http://localhost:8000.

**Script**

The "script" folder contains the mock data code of the application. To set up the mock data generation, follow these steps:

1. Navigate to the script folder.
2. Run 'npm install' or 'npm i' to install all the required packages.
3. After installation, start the script by running 'npm start'.
4. The script will continuously generate mock sensor data and send it to the server.

**_Note_**

Ensure that both the "server" and the "script" are running simultaneously to receive and visualize real-time sensor data. Additionally, to display the real-time data, make sure to run the "client" application as well.
