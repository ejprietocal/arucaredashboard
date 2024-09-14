const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const {deleteUser,admin,db,auth,fireBaseConfig} = require('./utils/firebase-config')


app.post('/delete-user', async (request,response)  =>{
    const {uid} =  request.body
    console.log(request.body)

    if (typeof uid !== 'string' || uid.trim() === '') {
        console.error('UID no válido:', uid);
        return response.status(400).json({ error: 'UID no válido', uid: uid });
    }
    try{
        const userDeleted = await deleteUser(uid)
        return response.status(200).json(userDeleted)
    }catch (error) {
        console.error('Error al eliminar usuario:', error);
        return response.status(500).json({ error: error.message, uid: request.body.uid });
    }

})

app.get('/firebaseConfig', (request, response) =>{
    console.log(fireBaseConfig)
    response.json(fireBaseConfig);
})
app.get('/admin/instance', (request, response) =>{
    response.json(db);
})
app.get('/admin/auth', (request, response) =>{
    response.json(auth);
})

module.exports = app