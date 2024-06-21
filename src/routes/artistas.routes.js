import { Router } from 'express'
import { deleteById, getAll, partialUpdate, store, totalUpdate } from '../controllers/artistas.controller.js'

const router = Router()

// RUTAS PARA ARTISTAS
router.get('/', getAll)
router.post('/', store)
router.delete('/:id', deleteById)
router.put('/:id', totalUpdate)
router.patch('/:id', partialUpdate)

export default router
