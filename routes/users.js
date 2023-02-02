import express from "express";
import { getUser, login, signup ,} from "../controllers/users.js";

const router=express.Router()



// router.get('/:id',getPostById)

router.post('/login',login)
router.post('/signup',signup)
router.get('/users',getUser)

export default router
