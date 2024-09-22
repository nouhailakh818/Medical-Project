const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const Role = db.Role;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        console.log("role req from body", req.body.roles);
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.status(200).send({ message: "User registered successfully!" }); 
          });
        });
      } else {
        console.log("role req from body", req.body.roles);
        user.setRoles([1]).then(() => {
          res.status(200).send({ message: "User registered successfully!" }); 
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "There was a problem registering the user." }); 
    });
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res
        .status(401)
        .send({ accessToken: null, message: "Invalid password!" });
    }

    
    const roles = await user.getRoles();
    const authorities = roles.map((role) => "ROLE_" + role.name.toUpperCase());

    const token = jwt.sign(
      { 
        id: user.id, 
        roles: authorities 
      }, 
      config.secret, 
      {
        algorithm: "HS256",
        expiresIn: 86400 
      }
    );


    res.status(200).send({
      id: user.id,
      email: user.email,
      roles: authorities, 
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: "There was a problem signing in." });
  }
};
