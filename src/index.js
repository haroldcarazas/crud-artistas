import express from 'express'
import { PORT } from './config/config.js'
import morgan from 'morgan'
import artistasRoutes from './routes/artistas.routes.js'
import swaggerUi from 'swagger-ui-express'
import jsonDocs from './config/swagger-output.json' assert { type: 'json' }

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/artistas', artistasRoutes)

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(jsonDocs))

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
