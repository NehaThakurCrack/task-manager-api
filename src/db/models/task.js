const mongoose = require ('mongoose')
const taskSchema= new mongoose.Schema({
    Description:{
        type: String,
        required: true,
        trim: true,
    },
    Completed:{
        type: Boolean,
        default: false,
        required: false 
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})
const Tasks = mongoose.model('Tasks',taskSchema)
module.exports=Tasks