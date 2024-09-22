const router = express.Router()
const express = require ('express')

router.post('/messages', authenticateToken, async (req,res) => {
    try {
    const {content, createdBy} = req.body

    if (!content || !createdBy) {
        return res.status(400).json({error : 'error'})
    }
    const newMessage = newMessage ({  
        content: req.body.content,
        createdBy: req.body.createdBy,
        createdAt: new Date ()
    })
        await newMessage.save()

        res.status(201).json(newMessage)
} catch (error) {
    res.status(500).json({error: 'Failed to create message'})
}
})

module.exports = router