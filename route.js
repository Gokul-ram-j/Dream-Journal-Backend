import express from 'express'
// controller function
import { createUser, getUserDreams, addUserDream, editUserDream,getAllUserDreams, deleteUserDream } from './controller.js'

export const route=express.Router()

route.get('/getUserDreams',getUserDreams)
route.get('/getAllUserDreams',getAllUserDreams)

route.post('/addUser',createUser)
route.post('/addUserDream',addUserDream)

route.put('/editUserDream',editUserDream)

route.delete('/deleteUserDream',deleteUserDream)