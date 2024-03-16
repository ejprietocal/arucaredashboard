import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import {auth}  from "../key/arucare-6b98c-firebase-adminsdk-hfb95-3069606af1.js";

// Inicializa la aplicación de Firebase con las credenciales
const firebaseApp = initializeApp({
    credential: auth,
    projectId: "arucare-6b98c",
    databaseURL: 'https://arucare-6b98c.firebaseio.com'
});

// Obtiene una instancia de Firestore
const db = getFirestore(firebaseApp);

// Obtén los datos de la colección "appointments"
// const dataRef = collection(db, "Appointments");

// // Obtiene los documentos de la colección y muestra su contenido
// getDocs(dataRef)
//     .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             console.log(doc.id, " => ", doc.data());
//         });
//     })
//     .catch((error) => {
//         console.error("Error al obtener documentos: ", error);
// });

export const database = db;