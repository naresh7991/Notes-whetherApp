import express from 'express';
import cors from 'cors';
import newRoute from './routes/news.route.js'
import whetherRoute from './routes/whether.route.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/news',newRoute)
app.use('/api/whether',whetherRoute)

export default app;