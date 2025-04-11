//const mongoose = require("moongose")
const mongoose = require("mongoose");
//Replace this string with the url i provided 
//changed the connection to a promise (why)
const DB = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect("mongodb+srv://alfred:alan_turing_01@softwaredesigndatabase.fvlznlx.mongodb.net/?retryWrites=true&w=majority&appName=SoftwareDesignDatabase")
        .then(() => {
          console.log("✅ MongoDB connected");
          resolve();
        })
        .catch((err) => {
          console.error(" Failed to connect to MongoDB:", err.message);
          reject(err); 
        });
    });
  };

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    student_id: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Researcher', 'Reviewer', 'Admin'],  
        default: 'Researcher'  
    }

})

//We write the name of the collection in the argument,The name of the schema
const collection = new mongoose.model("collection1",LoginSchema)
module.exports = {DB,collection};