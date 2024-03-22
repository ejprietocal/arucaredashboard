import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, getDocs,getDoc, setDoc, updateDoc, addDoc,deleteDoc,doc,Timestamp} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import {getAuth, deleteUser} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
// Inicializa la aplicación de Firebase con las credenciales
// import { obtenerValorCookie } from "../../src/js/dashboard/dashboard.js";

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

export function obtenerValorCookie(nombre) {
    // Separar las cookies individuales
    const cookies = document.cookie.split(';');

    // Buscar la cookie con el nombre proporcionado
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Verificar si la cookie tiene el formato nombre=valor
        if (cookie.startsWith(`${nombre}=`)) {
            // Obtener y devolver el valor de la cookie
            return cookie.substring(nombre.length + 1);
        }
    }
    // Si no se encontró la cookie, devolver null
    return null;
}



export const firebaseApp = initializeApp(fireBaseConfig);

const auth = getAuth(firebaseApp);
    
// Obtiene una instancia de Firestore
const db = getFirestore(firebaseApp);



export function getAmountOf(nameTable){
    const quantityOf = collection(db, nameTable);

    return getDocs(quantityOf)
        .then(snapshot => {
            const count = snapshot.size;
            return count;
        })
        .catch(error => {
            console.log(error);
            throw error; // Puedes lanzar el error nuevamente para que sea manejado en el contexto que llama a esta función
        });
}

export function getAmountUserPerMonth(){


        const quantityOfDoc = collection(db,'Doctors');
        const quantityOfPat = collection(db,'Patients');
        const quantityOfApp = collection(db,'Appointments');

        
        // console.log(timee);
        return getDocs(quantityOfDoc)
            .then((docsSnapshot)=>{
                docsSnapshot.forEach(docSnapshot=>{
                    console.log(docSnapshot.data().CreateIn.toDate());
                })
            })


}


export async function setCollection(tableName,formDataObject,idToken = null,uid = null){
    try{
        const db = getFirestore(firebaseApp);
        const formularioRef = collection(db, tableName);

        const now = new Date();
        const timestamp = new Timestamp(now.getTime() / 1000, 0);


        const formDataObj = {};
        const userDataObj = {};
        formDataObject.forEach((valor, clave) => {
            formDataObj[clave] = valor;
        });
        formDataObj['Token'] = idToken;
        formDataObj['UID'] = uid;
        formDataObj['CreateIn'] = timestamp;
        const docRef = await addDoc(formularioRef, formDataObj);

        const newData = {
            Id: docRef.id // Reemplaza 'nuevoCampo' por el nombre del campo que deseas agregar
        };

        const docReferece = doc(db, tableName , docRef.id);

        updateDoc(docReferece,newData)
        .then(() => {
            console.log('Campo agregado con éxito');
        })
        .catch((error) => {
            console.error('Error al agregar el campo: ', error);
            throw error;
        });

        
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
                const cookieValue = obtenerValorCookie('token');
                // console.log("Valor del campo 'uid':", uid);
                // console.log("Valor del campo 'token':", token);
                // fetch(`/public/assets/pages/delete/deleteconfirmed.php`, {
                //     method: 'POST',
                //     headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded',
                //     'Cookie': `token=${cookieValue}` // Tipo de contenido específico
                //     },
                //     body: "uid=" + uid
                //     })
                //     .then(response => {
                //         if (!response.ok) {
                //             throw new Error('Error al eliminar el usuario');
                //         }
                //         return response.text()
                //     })
                //     .then(data => {
                //         console.log(data); // Aquí obtienes el resultado de eliminarUsuario desde PHP
                //     })
                //     .catch(error => {
                //     console.error('Error al eliminar el usuario:', error);
                //     });

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




