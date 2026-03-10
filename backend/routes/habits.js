//all habit endpoints
const authMiddleware = require('../middleware/auth')
const prisma = require('../lib/prisma')
const express = require('express')
const router = express.Router()

//Fetch all habits for the logged-in user
router.get('/', authMiddleware, async(req,res) => {
    try {
        const habits = await prisma.habit.findMany({
            where: {userId: req.userId},
            include:{completions:true}
        })

        res.status(200).json({habits})
    }catch{
        res.status(500).json({error:'Failed to fetch habits'})
    }
})

//Create a Habit
router.post('/',authMiddleware, async(req,res) =>{
    try{
        const {habitName,habitSchedule} = req.body
        const habit = await prisma.habit.create({
            data:{
                userId:req.userId,
                habitName:habitName,
                habitSchedule:habitSchedule
            },
            include:{completions:true}
        })
        res.status(200).json({habit})
    }catch{
        res.status(500).json({error: 'Failed to create new habit'})
    }
})

//Delete Habit for User
router.delete('/:id',authMiddleware,async(req,res) =>{
    try{
        const deletedHabit = await prisma.habit.delete({
            where:{id:req.params.id, userId: req.userId}
        })
        res.status(200).json({deletedHabit})
    }catch{
        res.status(500).json({error: 'Failed to delete habit'})
    }
})

//Toggle isActive for Habit
router.patch('/:id/active',authMiddleware, async (req,res) =>{
    try{
        const habit = await prisma.habit.findUnique({
            where:{id:req.params.id,userId:req.userId}
        })
        if(!habit){
            return res.status(404).json({error:'Habit not found'})
        }
        const updatedHabit = await prisma.habit.update({
            where:{id:req.params.id,userId:req.userId},
            data:{
                isActive:!habit.isActive
            },
            include:{completions:true}
        })
        res.status(200).json({updatedHabit})
    }catch{
        res.status(500).json({error:'Failed to Toggle Active for Habit'})
    }
})

//Toggle Complete Habit for the day
router.patch('/:id/completeToggle',authMiddleware, async (req,res) => {
    try{
        const todayDate = new Date().toISOString().split('T')[0]
        const completion = await prisma.habitCompletion.findUnique({
            where:{habitId_date:{habitId: req.params.id,date: todayDate}}
        })
        if(!completion){
            const updatedHabit = await prisma.habitCompletion.create({
                data:{
                    habitId:req.params.id,
                    date:todayDate
                }
            })
            return res.status(200).json({updatedHabit,action: 'completed'})
        }else{
            const updatedHabit = await prisma.habitCompletion.delete({
                where:{habitId_date:{habitId: req.params.id,date: todayDate}}
            })
            return res.status(200).json({updatedHabit,action: 'uncompleted'})
        }
    }catch{
        res.status(500).json({error:'Failed to Toggle Complete for Habit'})
    }
})

module.exports = router