const express = require("express");
const cors = require("cors");
const path = require('path'); // Import the path module

const app = express();
const db = require("./models");
const userController = require('./controllers/user.controller'); // Import your user controller
const laboratoireRoutes = require('./routes/laboratoire.routes');

// Log the models to debug
console.log('Role model in api.js:', db.Role);
console.log('User model in api.js:', db.User);
console.log(userController.assignRole); // Should not be undefined
console.log(userController.removeRole);
// Configuration CORS
app.use(cors());


app.use('/', laboratoireRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes directly
app.get('/users', userController.getAllUsers);
app.post('/users/:id/assign-role', userController.assignRoles);
app.post('/users/:userId/remove-role', userController.removeRoleFromUser );
app.get('/roles', userController.getRoles);

// Import and use other routes if needed
const medicamentRoutes = require('./routes/medicament.routes');
const boardRoutes = require('./routes/board.routes');
require('./routes/auth.routes')(app);

// Use routes in the application
app.use('/', medicamentRoutes);
app.use('/api/board', boardRoutes);

// Base route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Initialize base data
const initial = async () => {
  await db.Role.upsert({ id: 1, name: "user" });
  await db.Role.upsert({ id: 2, name: "moderator" });
  await db.Role.upsert({ id: 3, name: "admin" });
};

db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database synchronized');
  initial(); // Initialize base data
}).catch(err => {
  console.error('Database synchronization error:', err);
});

// Start server
app.listen(3333, () => {
  console.log('Server is listening on port 3333');
});

