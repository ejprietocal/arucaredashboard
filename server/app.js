const express = require('express')
const app = express()
const cors = require('cors')

const {deleteUser} = require('./utils/firebase-config')
app.use(cors())
app.use(express.json())


app.post('/delete-user', async (request,response)  =>{
    const {uid} =  request.body

    try{

        const userDeleted = await deleteUser(uid)
        return response.status(200).json(userDeleted)
    }catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }

})

module.exports = app