import swaggerAutogen from 'swagger-autogen'
import { BASE_URL } from './config.js'

const doc = {
  info: {
    title: 'Galería de arte',
    description: 'Esta es la API para manejar los datos de la galería de arte.'
  },
  host: BASE_URL
}

const outputFile = './swagger-output.json'
const routes = ['./src/index.js']

swaggerAutogen()(outputFile, routes, doc)
