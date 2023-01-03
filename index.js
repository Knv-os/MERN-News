import express from 'express'
import connectDatabase from './src/database/db.js'
import dotenv from 'dotenv'

import useRoute from './src/routes/user.route.js'
import authRouter from './src/routes/auth.route.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

connectDatabase()
app.use(express.json())
app.use('/user', useRoute)
app.use('/auth', authRouter)


app.listen(port, () => console.log(`ta na porta ${port}`))

//primeiro commit
