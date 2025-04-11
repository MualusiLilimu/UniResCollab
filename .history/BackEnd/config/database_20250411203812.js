//const mongoose = require("moongose")
const mongoose = require("mongoose");
//Replace this string with the url i provided 
//changed the connection to a promise (why?)
//I wanted to be able to call the DB first in the server before starting the server using await
const DB = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect("mongodb+srv://alfred:alan_turing_01@softwaredesigndatabase.fvlznlx.mongodb.net/?retryWrites=true&w=majority&appName=SoftwareDesignDatabase")
        .then(() => {
          console.log("Database connected");
          resolve();
        })
        .catch((err) => {
          console.error(" Failed to create);
          reject(err); 
        });
    });
  };



//We write the name of the collection in the argument,The name of the schema
module.exports = { DB };