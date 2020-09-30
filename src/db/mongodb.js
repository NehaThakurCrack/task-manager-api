//CRUD create read  update delete commands
//const mongodb=require('mongodb')
const {MongoClient, ObjectID}=require('mongodb')
//const mongodbClient= mongodb.MongoClient
const id=  ObjectID()
console.log(id.id)
const connectionURL="mongodb://127.0.0.1:27017"
const databaseName="task-manager"

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{
    if(error){
        return console.log("there is an error in the connectivity")
    }
    const db= client.db(databaseName)

    //***************Delete command  */
    // db.collection('users').deleteMany({_id: new ObjectID("5f16dd5dae3b9230fc25cf99")}).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    //***********Update command  */
    // const db= client.db(databaseName)
    // db.collection('users').updateMany({name: 'Neha'},
    // { $set: {
    //     age: 23
    // }}).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    //************Find command*********** */
    // db.collection('tasks').findOne({_id: new ObjectID("5f4f9c4915e53f20b0b94729")},(error, task)=>{
    //     if(error){
    //         return  console.log("Error reported")
    //     }
    //     console.log(task)
    // })
    // db.collection('users').find({name: "Neha"}).toArray((error, result)=>{
    //     if(error){
    //         return console.log("error in tasks")
    //     }
    //     console.log(result)
    // })
    //console.log("Connected")
    // const db= client.db(databaseName)

    //************************Insert command  */
    // db.collection('users').insertMany([{
    //     _id: id,
    //     name:"Neha",
    //     age: 24
    // }
// {
//     name: 'Varsha',
//     age: 23
// }],(error, result)=>{
//         if(error){
//             return console.log("unable to insert user")
//         }
//         console.log(result.ops)
//     })
//     db.collection('tasks').insertMany([
//         {
//             Description: 'Send an email',
//             Completed: true
//         },
//         {
//             Description: 'Read an email',
//             Completed:false
//         }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log("unable to insert task info")
    //     }
    //     console.log(result.ops)
    // })

})