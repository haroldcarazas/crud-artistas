import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'Galería de arte',
    description: 'Esta es la API para manejar los datos de la galería de arte.'
  },
  host: 'localhost:3000'
}

const outputFile = './swagger-output.json'
const routes = ['./src/index.js']

swaggerAutogen()(outputFile, routes, doc)
