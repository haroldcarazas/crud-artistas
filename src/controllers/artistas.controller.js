import { pool } from '../config/db.js'

export const getAll = async (req, res) => {
  const [artistas] = await pool.query('SELECT * FROM artist') // resultado[0]
  res.json(artistas)
}

export const deleteById = async (req, res) => {
  const { id } = req.params

  const [resultado] = await pool.execute(
    'DELETE FROM artist WHERE artist_id = ?',
    [id]
  )

  if (resultado.affectedRows === 1) {
    return res.json({ messsage: 'Artista eliminado' })
  }

  return res.status(500).json({ message: 'No se pudo eliminar el artista' })
}

export const store = async (req, res) => {
  try {
    const { fname, lname, dob, country, local } = req.body

    if (!fname || !lname || !dob || !country || !local) { return res.status(400).json({ message: 'Faltan datos en el formulario' }) }

    const [resultado] = await pool.execute(
      'INSERT INTO artist(fname, lname, dob, country, local) VALUES (?, ?, ?, ?, ?)',
      [fname, lname, dob, country, local]
    )

    if (resultado.affectedRows !== 1 && !resultado.insertId) {
      return res
        .status(500)
        .json({ message: 'Hubo un error al crear el artista' })
    }

    res.status(201).json({ message: 'Artista guardado' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error interno', details: error.message })
  }
}

export const totalUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const { fname, lname, dob, country, local, mname, dod } = req.body

    if (!fname || !lname || !dob || !country || !local) { return res.status(400).json({ message: 'Faltan datos en el formulario' }) }

    const [resultado] = await pool.execute(
      'UPDATE artist SET fname=?, lname=?, dob=?, country=?, local=?, mname=?, dod=? WHERE artist_id=?',
      [fname, lname, dob, country, local, mname ?? null, dod ?? null, id]
    )

    if (resultado.affectedRows !== 1) {
      return res.status(500).json({ message: 'No se pudo actualizar el artista' })
    }

    res.json({ message: 'Artista actualizado' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error interno', details: error.message })
  }
}

export const partialUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const { fname, lname, dob, country, local, mname, dod } = req.body

    let query = 'UPDATE artist SET'
    const params = []

    if (fname) {
      query += ' fname=?,'
      params.push(fname)
    }

    if (lname) {
      query += ' lname=?,'
      params.push(lname)
    }

    if (dob) {
      query += ' dob=?,'
      params.push(dob)
    }

    if (country) {
      query += ' country=?,'
      params.push(country)
    }

    if (local) {
      query += ' local=?,'
      params.push(local)
    }

    if (mname) {
      query += ' mname=?,'
      params.push(mname)
    }

    if (dod) {
      query += ' dod=?,'
      params.push(dod)
    }

    // Eliminar la última coma
    query = query.slice(0, -1)
    query += ' WHERE artist_id=?'
    params.push(id)

    const [resultado] = await pool.execute(query, params)

    if (resultado.affectedRows !== 1) {
      return res.status(500).json({ message: 'No se pudo actualizar el artista' })
    }

    res.json({ message: 'Artista actualizado' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error interno', details: error.message })
  }
}
