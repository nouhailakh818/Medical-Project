const express = require("express");
const cors = require("cors");
const path = require('path'); 
require('dotenv').config();


const app = express();
const db = require("./models");
const userController = require('./controllers/user.controller'); 
const laboratoireRoutes = require('./routes/laboratoire.routes');
const articleRoutes = require('./routes/article.routes');
const orderRoutes = require('./routes/orderRoutes'); 
const factureRoutes = require('./routes/factureRoutes');


console.log('Role model in api.js:', db.Role);
console.log('User model in api.js:', db.User);
console.log(userController.assignRole); 
console.log(userController.removeRole);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const cartRoutes = require('./routes/cart.routes');
app.use('/cart', cartRoutes);

app.use('/', laboratoireRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/articles', articleRoutes);

app.use('/api/factures', factureRoutes);


app.use('/api/orders', orderRoutes);

app.get('/users', userController.getAllUsers);
app.post('/users/:id/assign-role', userController.assignRoles);
app.post('/users/:userId/remove-role', userController.removeRoleFromUser );
app.get('/roles', userController.getRoles);

const medicamentRoutes = require('./routes/medicament.routes');
const boardRoutes = require('./routes/board.routes');
require('./routes/auth.routes')(app);

app.use('/', medicamentRoutes);
app.use('/api/board', boardRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const initial = async () => {
  await db.Role.upsert({ id: 1, name: "user" });
  await db.Role.upsert({ id: 2, name: "moderator" });
  await db.Role.upsert({ id: 3, name: "admin" });
};

db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database synchronized');
  initial();
}).catch(err => {
  console.error('Database synchronization error:', err);
});

app.listen(3333, () => {
  console.log('Server is listening on port 3333');
});

