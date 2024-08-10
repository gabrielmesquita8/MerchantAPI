import express from 'express'
import customerRouter from './routes/CustomerRoute'
import itemRouter from './routes/ItemRoute'

const app = express()

app.use(express.json())
app.use([customerRouter, itemRouter])

app.listen(3000)

export default app