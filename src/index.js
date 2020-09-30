const express= require('express')
const app=express()
const User= require('./db/models/User')
const Task=require('./db/models/task')
const userRouter= require('./router/user')
const taskRouter= require('./router/task')
const { default: validator } = require('validator')
require('./db/mongoose')
const port = process.env.PORT || 3000

// app.use((req, res, next)=>{
//     res.status(503).send('Website is under maintenance')
// })
app.use(express.json())

app.listen(port, ()=>{
    console.log("Server listening on "+port)
})
app.use(userRouter)
app.use(taskRouter)
//****************Users Operations ******************** */
//**********  Task operations ***************** */

// const main = async ()=>{
//     // const task= await Task.findById('5f69ba0ead339d19f87dc3fd')
//     // console.log(task)
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     const user= await User.findById('5f69b9ffad339d19f87dc3fa')
//     await  user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()