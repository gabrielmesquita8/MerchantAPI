import express from 'express'
import router from './routes/CustomerRoute'

const app = express()

app.use(express.json())
app.use(router)

app.listen(3000)

export default app