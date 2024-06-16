import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import connectDB from './config/connectDB'
import viewEngine from './config/viewEngine'
import protectedRoutes from './route/protectedRoute'
import initWebRoutes from './route/web'

require('dotenv').config()

let app = express()

let corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

viewEngine(app)
initWebRoutes(app)
protectedRoutes(app)

connectDB()


let port = process.env.PORT || 8080

app.listen(port, () => {
    console.log('Backend Nodejs is running on port ' + port)
})


