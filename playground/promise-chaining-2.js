require('../src/db/mongoose')

const task = require('../src/db/models/task')

// task.findByIdAndDelete('5f5bc93dfa052a2b28a36864').then((task1)=>{
//     console.log(task1)
//     return task.countDocuments({Completed: false})
// }).then((task2)=>{
//     console.log(task2)
// }).catch((e)=>{
//     console.log(e)
// })
const deleteTaskAndCount= async (id)=>{

    const dlt_task= await task.findByIdAndDelete(id)
    const count = await task.countDocuments({Completed: false })
    return count 
}
deleteTaskAndCount('5f5bca359aa6a60e589e7685').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})