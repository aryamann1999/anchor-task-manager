//all tasks endpoints
const authMiddleware = require('../middleware/auth')
const express = require('express')
const router = express.Router()
const prisma = require('../lib/prisma')

//Fetch all tasks for the logged in user
router.get('/',authMiddleware,async (req,res) => {
    try{
        const tasks = await prisma.task.findMany({
            where:{userId:req.userId}
        })
        res.status(200).json({tasks})
    }catch{
        res.status(500).json({error: 'Failed to fetch tasks'})
    }
})

//Create Task for User
router.post('/',authMiddleware, async(req,res) =>{
    try{
        const {taskName,priority,dueDate} = req.body
        const task = await prisma.task.create({
            data:{
                userId:req.userId,
                taskName:taskName,
                priority:priority,
                dueDate: dueDate
            }
        })
        res.status(201).json({task})
    }catch{
        res.status(500).json({error: 'Failed to create task'})
    }
})

//Delete Task for User
router.delete('/:id',authMiddleware, async(req,res) =>{
    try{
        const deletedTask = await prisma.task.delete({
            where:{id:req.params.id,userId:req.userId}
        })
        res.status(200).json({deletedTask})
    }catch{
        res.status(500).json({error:'Failed to Delete Task'})
    }
})

//Toggle isComplete for Task
router.patch('/:id/completeToggle',authMiddleware, async(req,res) =>{
    try{
        const task = await prisma.task.findUnique({
            where:{id:req.params.id,userId:req.userId}
        })
        if(!task){
            return res.status(404).json({error:'Task not found'})
        }
        const updatedTask = await prisma.task.update({
            where:{id:req.params.id,userId:req.userId},
            data:{
                isComplete: !task.isComplete
            }
        })
        res.status(200).json({updatedTask})
    }catch{
        res.status(500).json({error:'Failed to Toggle Complete Task'})
    }
})

module.exports = router