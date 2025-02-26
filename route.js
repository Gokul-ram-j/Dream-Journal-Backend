import express from 'express'
// controller function
import { createUser, getUserDreams, addUserDream, editUserDream,getAllUserDreams, deleteUserDream, fetchUserDetails } from './controller.js'

export const route=express.Router()

route.get('/getUserDreams',getUserDreams)
route.get('/getAllUserDreams',getAllUserDreams)
route.get('/userDetails',fetchUserDetails)

route.post('/addUser',createUser)
route.post('/addUserDream',addUserDream)

route.put('/editUserDream',editUserDream)

route.delete('/deleteUserDream',deleteUserDream)