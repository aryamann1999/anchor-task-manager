const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../lib/prisma')

router.post('/signup', async (req,res) => {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({error: 'Email and password are required'})
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: {email}
        })

        if (existingUser) {
            return res.status(400).json({error: 'Email already in use'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        res.status(201).json({token})
    }catch{
        res.status(500).json({error:'Failed to SignUp'})
    }
})

router.post('/login', async (req,res) =>{
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({error:'Email and password are required'})
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: {email}
        })

        if (!existingUser) {
            return res.status(400).json({error: 'Invalid email or password'})
        }

        const passwordCheck = await bcrypt.compare(password, existingUser.password)
        if (!passwordCheck) {
            return res.status(401).json({error: 'Invalid email or password'})
        }

        const token = jwt.sign(
            {userId: existingUser.id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        res.status(200).json({token})
    }catch{
        res.status(500).json({error:'Failed to Login'})
    }

})

module.exports = router