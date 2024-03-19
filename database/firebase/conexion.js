import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, updateDoc, addDoc} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import {auth}  from "../key/arucare-6b98c-firebase-adminsdk-hfb95-3069606af1.js";

// Inicializa la aplicación de Firebase con las credenciales
const firebaseApp = initializeApp({
    credential: auth,
    projectId: "arucare-6b98c",
    databaseURL: 'https://arucare-6b98c.firebaseio.com'
});

// Obtiene una instancia de Firestore
const db = getFirestore(firebaseApp);
// const querySnapshot = await getDocs(collection(db, 'Patients'));

// Obtén los datos de la colección "appointments"
const dataRef = collection(db, "Appointments");

export async function setCollection(tableName,formDataObject){
    try{
        const db = getFirestore(firebaseApp);
        const formularioRef = collection(db, tableName);

        const formDataObj = {};
        formDataObject.forEach((valor, clave) => {
            formDataObj[clave] = valor;
        });

        const docRef = await addDoc(formularioRef, formDataObj);
        return docRef.id;

    }catch(error){
        console.error("Error al guardar el documento: ", error);
        throw error;
    }

}




export async function getData(data) {
    try {
        // const item_clicked = document.querySelectorAll('.link');
        const querySnapshot = await getDocs(collection(db, data));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error al obtener datos de pacientes: ", error);
        return [];
    }
}




