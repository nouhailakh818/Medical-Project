
module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "21062004",
  DB: "system_medical",
  dialect: "postgres", 
  pool: {
    max: 10, 
    min: 2,  
    acquire: 30000, 
    idle: 10000 
  }
};
