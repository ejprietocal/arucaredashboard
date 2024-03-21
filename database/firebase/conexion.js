import { initializeApp, } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, getDocs,getDoc, setDoc, updateDoc, addDoc,deleteDoc,doc} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import {getAuth, deleteUser} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
// Inicializa la aplicación de Firebase con las credenciales


const fireBaseConfig ={
    apiKey: "AIzaSyDEx11phpYJhl6QQqh4YsaQ4_d7K14PgII",
    authDomain: "arucare-6b98c.firebaseapp.com",
    projectId: "arucare-6b98c",
    storageBucket: "arucare-6b98c.appspot.com",
    messagingSenderId: "495395256474",
    appId: "1:495395256474:web:5f8ec04c3be6e25b144723",
    measurementId: "G-5D18HVZ7SD"
}
// export const firebaseApp = initializeApp({
//     credential: autho,
//     projectId: "arucare-6b98c",
//     databaseURL: 'https://arucare-6b98c.firebaseio.com'
// });

export const firebaseApp = initializeApp(fireBaseConfig);

const auth = getAuth(firebaseApp);
    
// Obtiene una instancia de Firestore
const db = getFirestore(firebaseApp);


// const querySnapshot = await getDocs(collection(db, 'Patients'));
// export const autorization = getAuth(firebaseApp);
// Obtén los datos de la colección "appointments"
// const dataRef = collection(db, "Appointments");

export async function setCollection(tableName,formDataObject,idToken = null,uid = null){
    try{
        const db = getFirestore(firebaseApp);
        const formularioRef = collection(db, tableName);

        const formDataObj = {};
        const userDataObj = {};
        formDataObject.forEach((valor, clave) => {
            formDataObj[clave] = valor;
        });
        formDataObj['Token'] = idToken;
        formDataObj['UID'] = uid;
        const docRef = await addDoc(formularioRef, formDataObj);

        
        if(tableName === 'Doctors'){
            userDataObj['email'] = formDataObject.get('Email');
            userDataObj['type'] = "Doctor";

            // const users = collection(db,'Users')
            const docReference = doc(db, 'Users', docRef.id);

            const userRef = await setDoc(docReference,userDataObj);

        }

        return docRef.id;

    }catch(error){
        // console.error("Error al guardar el documento: ", error);
        throw error;
    }

}

export async function deleteDocument(tableName, documentId) {
    try {
        // Obtener una referencia a la colección
        const db = getFirestore(firebaseApp);
        const collectionRef = collection(db, tableName);
        const collectionUsers = collection(db,'Users');
        

        // Obtener una referencia al documento que se desea eliminar
        const documentRef = doc(collectionRef, documentId);
        const UserRef = doc(collectionUsers,documentId);

        // const uid = 

        if(tableName === 'Doctors'){
            getDoc(documentRef)
            .then((docSnapshot) => {
                // Acceder al campo "uids"
                const uid = docSnapshot.data().UID;
                // const token = docSnapshot.data().Token;
                const token = sessionStorage.getItem('token');
                console.log("Valor del campo 'uid':", uid);
                console.log("Valor del campo 'token':", token);
                fetch(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDEx11phpYJhl6QQqh4YsaQ4_d7K14PgII`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Reemplazar con tu token de autenticación
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        localId: uid // Reemplazar con el UID del usuario que deseas eliminar
                    })
                    })
                    .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el usuario');
                    }
                    console.log('Usuario eliminado correctamente');
                    })
                    .catch(error => {
                    console.error('Error al eliminar el usuario:', error);
                    });

            })
            .catch((error) => {
                console.error("Error al obtener el documento:", error);
            });
        }
        // Eliminar el documento
        await deleteDoc(UserRef);
        await deleteDoc(documentRef);



        return documentId;

    } catch (error) {

        throw error;
    }
}

export async function getData(data) {
    try {
        const querySnapshot = await getDocs(collection(db, data));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error al obtener datos de pacientes: ", error);
        return [];
    }
}




