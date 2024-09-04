
module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "21062004",
  DB: "system_medical",
  dialect: "postgres", 
  pool: {
    max: 10, // Nombre maximal de connexion
    min: 2,  // Nombre minimal de connexion
    acquire: 30000, // Temps avant qu'une connexion soit considérée comme échouée
    idle: 10000 // Temps  avant qu'une connexion inoccupée soit libérée
  }
};
