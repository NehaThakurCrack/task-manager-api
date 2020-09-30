const mongoose = require ('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',
{
   useNewUrlParser: true,
   useCreateIndex: true 
})   
// const me= new User({
//     Name: 'Neha',
//     age: 23,
//     email: 'neha.na0@xyz.com',
//     password: 'ab1236cd'
// })
// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

// const task = new Tasks({
//     Description: "Create a mail",
// })
// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log(error)
// })
