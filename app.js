import express from 'express'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors"
import admin from './routes/admin.js'
import user from './routes/user.js'
import student from './routes/student.js'
import invester from './routes/invester.js'
import contract from './routes/contract.js'

config({
    path: "./data/config.env"
})

export const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2]
}))

app.use("/api/v1/admin",admin)
app.use("/api/v1/user",user)
app.use("/api/v1/student",student)
app.use("/api/v1/invester",invester)
app.use("/api/v1/contract",contract)