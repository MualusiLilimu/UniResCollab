const mongoose=require('mongoose')

const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
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

});
const collection = mongoose.model('collection1', LoginSchema);
module.exports = collection;