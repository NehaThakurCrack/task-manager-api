const express = require('express')
const router = express.Router()
const Task= require('../db/models/task')
const auth = require('../middleware/auth')
router.post('/task',auth, async (req, res)=>{
    const task= new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
    await task.save()
    res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})
router.get('/task', auth, async (req,res)=>{
    const match={}
    const sort={}
    if(req.query.Completed){
        match.Completed= req.query.Completed === 'true'
    }
    if(req.query.sortBy){
        const parts= req.query.sortBy.split(':')
        sort[parts[0]]= parts[1]=== 'desc'? -1 :1
    }
    try{
    //const task= await Task.find({})
    await req.user.populate({path: 'tasks',
        match,
        options:{
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
        }
    }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(404).send(e)
    }
})
router.get('/task/:id', auth, async (req,res)=>{
    const _id= req.params.id
    try{
    //const task= await Task.findById(id)
    const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send(task)
        }
        res.send(task)
    }catch(e){
        res.status(404).send(e)
    }
})
router.patch('/task/:id', auth, async (req, res)=>{
    const updates= Object.keys(req.body)
    const allowUpdates = ['Description', 'Completed']
    const isValidation= updates.every((update)=> allowUpdates.includes(update))
    if(!isValidation){
        return res.status(400).send({Error: 'Invalid task'})
    }
        try{
            const _id= req.params.id
            const task= await Task.findOne({_id, owner: req.user._id})
            
            //const task = await task.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true})
            if(!task){
                res.status(400).send({Error: 'No task found'})
            }
            updates.forEach((update)=> task[update]=req.body[update])
            await task.save()
            res.status(200).send(task)
        }
        catch(e){
            res.status(404).send(e)
        }
})
router.delete('/task/:id', auth, async (req, res)=>{
    try{
        const _id= req.params.id
        const task= await Task.findOneAndDelete({_id, owner: req.user._id})
        if(!task){
            res.status(400).send({Error: 'Task not Found'})
        }
        //await task.remove()
        res.send(task)
    }catch(e){
        res.status(404).send(e)
    }
})
module.exports= router