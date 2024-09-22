exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.redirect('/users'); 
  };
  
  exports.adminBoard = (req, res) => {
    res.redirect('/Admin');
  };
  
  exports.moderatorBoard = (req, res) => {
    res.redirect('/moderator');
  };
  