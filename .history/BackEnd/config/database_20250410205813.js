const mongoosee=require('mongoose')



const url ="mongodb+srv://2732543:SIYA@cluster0.6ytkwv5.mongodb.net/U?retryWrites=true&w=majority&appName=Cluster0"
mongoosee.connect(url)
.then((result)=>console.log('connected'))
.catch((err)=>console.log('error '))