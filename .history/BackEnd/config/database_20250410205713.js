const mongoosee=require('mongoose')



const url =""
mongoosee.connect(url)
.then((result)=>console.log('connected'))
.catch((err)=>console.log('error '))