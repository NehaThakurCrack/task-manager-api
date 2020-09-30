const mongoose = require ('mongoose')
const { default: validator } = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task= require('../models/task')
const userSchema= new mongoose.Schema({
    Name:{
        type: String,
        required: true,
        trim: true
    },
    Age: {
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
               throw new Error("Age cannot be in negative number")
            }
        }
    },
    email:{
        type: String,
        reuired: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error('Please enter the valid email address')
            }
        }
    },
    password:{
        type: String,
        requied: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Please do not add password as password")
            }

        }
    },
    avatar:{
        type: Buffer
    },
    tokens: [{
        token :{
            type: String,
            required: true
        }
    }]
},
 {
    timestamps: true
})
userSchema.virtual('tasks',{
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})
userSchema.methods.generateAuthToken = async function() {
    const user= this
    const token= jwt.sign({_id: user._id.toString()}, 'thisismycourse')
    user.tokens= user.tokens.concat({token})
    await user.save()
    //console.log(token)
    return token
}
userSchema.methods.toJSON= function(){
    console.log("hide")
    const user= this
    const user_toObject = user.toObject()
    delete user_toObject.password
    delete user_toObject.tokens
    delete user_toObject.avatar
    console.log(user_toObject)
    return user_toObject
}
//match the user
userSchema.statics.findByCredentials= async (email, password)=>{
    const user= await User.findOne({email})
    if(!user){
        throw new Error('No user found!')
    }
    const isMatched= bcrypt.compare(password, user.password)
    console.log(isMatched)
    if(!isMatched){
        throw new Error('Credentials Doesnt matched')
    }
    return user
}
//convert password to hash
userSchema.pre('save',async function(next){
    const user =this
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password, 8)
    }
    next()

})
//remove task when user delete
userSchema.pre('remove', async function(next){
    const user= this
    Task.deleteMany({owner: user._id})
    next()
})
const User = mongoose.model('User', userSchema)
module.exports=User