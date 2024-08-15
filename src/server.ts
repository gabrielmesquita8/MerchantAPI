import express from 'express'
import customerRouter from './routes/CustomerRoute'
import itemRouter from './routes/ItemRoute'
import transactionRouter from './routes/TransactionRoute'

const app = express()

app.use(express.json())
app.use([customerRouter, itemRouter, transactionRouter])

app.listen(3000)

export default app