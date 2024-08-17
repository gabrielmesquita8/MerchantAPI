import 'express-async-errors';
import express from 'express'
import customerRouter from './routes/CustomerRoute'
import itemRouter from './routes/ItemRoute'
import transactionRouter from './routes/TransactionRoute'
import { errorMiddleware } from './middlewares/Error'
import { authMiddleware } from './middlewares/errors/AuthMiddleware';

const app = express()

app.use(express.json())
app.use(itemRouter)

app.use(authMiddleware)

app.use([customerRouter, transactionRouter])
app.use(errorMiddleware)

app.listen(3000)

export default app