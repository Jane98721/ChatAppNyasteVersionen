import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import  jwt from 'jsonwebtoken'

const express = require ('express')
const messageRouter = require ('./messages')

app.use(express.json())
app.use('/api',messageRouter)

const app = express()
const port = process.env.PORT || 3000
const secretKey= process.env.JWT_SECRET || 'yourSecretKey'

function authenticateToken(req,res,next) {
    const authHeader= req.headers['authorization']
    const token = authHeader && authHeader.split (' ') [1]

    if (!token) return res.status(401).json({message : 'Token saknas eller är ogiltig'})

        jwt.verify(token, secretKey, (err,user) => {
            if(err) { return res.status (403).json({message : 'Åtkomst saknas'})
            }
                req.user=user
            next()
        })
}

function generateAccessToken(user) {
    return jwt.sign(user, secretKey, {expiresIn: '24h'})
}

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "My api",
        },
        servers:[
            {
                url: "http://localhost:5174",
            },
        ],
        components : {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',   
                    bearerFormat: 'JWT'
                },
            },
        },

        security: [{
            bearerAuth: []
        }],
    },

    apis: ['./server.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup (swaggerDocs))

app.use(express.json())

app.get('/messages', authenticateToken, (req, res) => {
    res.json({message: 'Protected route'})
})

app.post('/auth/token', (req, res) => {
    const {username} = req.body 
    if (!username) {
        return res.status(400).json ({message : 'Användarnamn krävs för att generera token'})
    }


    const user= { name: username}


    const accessToken= generateAccessToken(user)
    res.json({accessToken})
})

localStorage.setItem('authToken', accessToken)
app.listen(port,() => {
    console.log(`port ${port}` )
})

export default app
