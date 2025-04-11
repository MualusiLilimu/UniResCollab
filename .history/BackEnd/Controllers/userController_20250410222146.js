module.exports = {
    // For /user route
    get: (req, res) => {
      res.send("User: Alfred That's working");
    },
    
    // For /user/Details route
    getDetails: (req, res) => {
      res.json({
        userName: "Alfred",
        email: "alfred@example.com",
        age: 25,
        address: "123 Example St, Example City"
      });
    }
  }
  