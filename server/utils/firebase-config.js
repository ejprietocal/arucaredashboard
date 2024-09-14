const admin = require('firebase-admin');
const serviceAccount = require('../key/key.json'); // Reemplaza con la ruta a tu archivo JSON
const fireBaseConfig = require('../key/firebaseConfig.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arucare-6b98c-default-rtdb.firebaseio.com"
});

const auth = admin.auth();
const db = admin.firestore(); // Obtén una instancia de Firestore


async function deleteUser(uid){
    try {
        await auth.deleteUser(uid);
        console.log('Usuario eliminado correctamente');
        return { success: true };
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
}

module.exports = { db, admin, deleteUser, auth, fireBaseConfig }; // Exporta lo que necesites
