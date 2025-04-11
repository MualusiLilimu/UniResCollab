//const mongoose = require("moongose")
const mongoose = require("mongoose");
//Replace this string with the url i provided 
mongoose.connect("mongodb+srv://alfred:a@softwaredesigndatabase.fvlznlx.mongodb.net/?retryWrites=true&w=majority&appName=SoftwareDesignDatabase")

.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

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
const collection = new mongoose.model("collection1",LogInSchema)
module.exports = collection