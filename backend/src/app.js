import express from 'express';
import cors from 'cors';
import newRoute from './routes/news.route.js'
import whetherRoute from './routes/whether.route.js'
import { sanitizeMiddleWare } from './middlewares/inputeSanitize.js';
import userRoute from './routes/user.route.js'
import { verifySession } from './middlewares/verifySession.js';
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(cookieParser())
app.use('/api/news',verifySession,newRoute)
app.use('/api/whether',verifySession,whetherRoute)
app.use('/api/user',sanitizeMiddleWare,userRoute)


export default app;