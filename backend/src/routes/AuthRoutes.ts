import express from 'express'

const router = express.Router();


router.post('/create-account', () => {
    console.log("desde auth")
} )


export default router