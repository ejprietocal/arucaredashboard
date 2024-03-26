import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, getDocs,getDoc, setDoc, updateDoc, addDoc,deleteDoc,doc,Timestamp} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
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

export function getAmountAppointmentsUserPerMonth(){

        const quantityOfApp = collection(db,'Appointments');
        const currentYear = new Date().getFullYear();

        return getDocs(quantityOfApp)
        .then((docsSnapshot)=>{
            const countOfperMonth = {};
    
            docsSnapshot.forEach(docSnapshot=>{
                const year_month = docSnapshot.data().createIn.split('-').slice(0, 2);
                const string_year = year_month[0];
                const string_month = year_month[1];
    
                if(!countOfperMonth[string_year]){
                    countOfperMonth[string_year]={};
                }
                if(!countOfperMonth[string_year][string_month]){
                    countOfperMonth[string_year][string_month] = 1;
                }
                else{
                    countOfperMonth[string_year][string_month]++;
                }
            });
    
            const lastTwoYearsData = {};
    
            for (let year = currentYear - 1; year <= currentYear; year++) {
                if (countOfperMonth[year.toString()]) {
                    lastTwoYearsData[year.toString()] = countOfperMonth[year.toString()];
                }
            }
    
            // Generar todos los meses de enero a diciembre con un valor de 0 si no hay datos
            for (let year = currentYear - 1; year <= currentYear; year++) {
                if (!lastTwoYearsData[year.toString()]) {
                    lastTwoYearsData[year.toString()] = {};
                }
    
                for (let month = 1; month <= 12; month++) {
                    const monthString = month.toString().padStart(2, '0');
                    if (!lastTwoYearsData[year.toString()][monthString]) {
                        lastTwoYearsData[year.toString()][monthString] = 0;
                    }
                }
            }
            return lastTwoYearsData;
        })
        .catch(error=>{
            throw error;
        })
        
}


export async function setCollection(tableName,formDataObject,idToken = null,uid = null,mapa=null){
    try{
        const db = getFirestore(firebaseApp);
        const now = new Date();
        const timestamp = new Timestamp(now.getTime() / 1000, 0);
        const formDataObj = {};
        const userDataObj = {};
        const medicinesDataObj = {};
        const servicesDataObject = {};
        let mapTousers = {};
        let mapToObject = {};

        if(tableName === 'Services'){
            const docReference = doc(db, 'Services', formDataObject.get('name'));

            formDataObject.forEach((valor, clave) => {
                servicesDataObject[clave] = valor;
            });
            servicesDataObject['CreateIn'] = timestamp;

            await setDoc(docReference,servicesDataObject);


            return formDataObject.get('name');
            
        }
        else if(tableName === 'Doctors'){
            const docReference = doc(db, 'Doctors', uid);

            formDataObject.forEach((valor, clave) => {
                formDataObj[clave] = valor;
            });
            formDataObj['ID'] = uid;
            formDataObj['CreateIn'] = timestamp;

            await setDoc(docReference, formDataObj);
    
            //map to specializations
            if(mapa !=null){
                for (let [clave, mapaInterno] of mapa.entries()) {
                    mapToObject[clave] = {};
                    for (let [claveInterna, valor] of mapaInterno.entries()) {
                        mapToObject[clave][claveInterna] = valor;
                    }
                }
            }
            await updateDoc(docReference,{Specializations:mapToObject});
            //=============================

            if(tableName === 'Doctors'){
                userDataObj['email'] = formDataObject.get('Email');
                userDataObj['type'] = "Doctor";
    
                mapa.forEach((mapaInterno,indice)=>{
                      mapTousers[indice] ={};
                      mapaInterno.forEach((finalmap,index)=>{
                        if(index == 'Specialization'){
                            mapTousers[indice]['specialization'] = finalmap;
                        }
                        else if(index == 'Status'){
                            mapTousers[indice]['status'] = finalmap;
                        }
                      })  
                })

                
    
                // const users = collection(db,'Users')
                const docReference = doc(db, 'Users', uid);
    
                await setDoc(docReference,userDataObj);
                await updateDoc(docReference,{specializations:mapTousers});
            }
            
        }
        else if(tableName === 'Medicines'){
            const medicinesCollection = collection(db,'Medicines');
            formDataObject.forEach((valor, clave) => {
                medicinesDataObj[clave] = valor;
            });
            medicinesDataObj['CreateIn'] = timestamp;

            const medicineRef = await addDoc(medicinesCollection,medicinesDataObj);
            return medicineRef.id;
        }

        return uid;

    }catch(error){
        console.error("Error al guardar el documento: ", error);
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

        // Eliminar el documento
        await deleteDoc(UserRef);
        await deleteDoc(documentRef);


        return documentId;

    } catch (error) {
        throw error;
    }
}
export async function getDocToupdate(tableName, documentId) {
    try {
        const ref = doc(collection(db, tableName), documentId);

        if(tableName === 'Doctors'){
            let obj = {};

            const printObjectProperties = (obj, prefix = '') => {
                const newObj = {};
    
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object' && obj[key] !== null) {
                            // Si el valor es un objeto, imprimir sus propiedades de forma recursiva
                            newObj[key] = printObjectProperties(obj[key], prefix + key + '.');
                        } else {
                            newObj[key] = obj[key];
                        }
                    }
                }
    
                return newObj;
            };
    
            const docSnapshot = await getDoc(ref);
    
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
    
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        obj[key] = data[key];
                    }
                }
    
                obj.id = docSnapshot.id;
    
                const finalObject = printObjectProperties(obj);
                // console.log(finalObject);
                return finalObject;
            } else {
                console.log('Documento no encontrado');
                return null;
            }
        }
        else if(tableName === 'Medicines' || tableName === 'Services'){
            const info = await getDoc(ref);
            const infoString = JSON.stringify(info);
            const data = info._document.data.value.mapValue.fields;
            // console.log(data);
            return data;
        }
   
    } catch (error) {
        console.error("Error al obtener el documento:", error);
        throw error;
    }
}


export async function updateDocument(tablename,formDataObject,documentId,mapa=null){

    try{
        const now = new Date();
        const timestamp = new Timestamp(now.getTime() / 1000, 0);
        const formDataObj = {};
        const userDataObj = {};
        const docReference = doc(db, tablename,documentId);
        let mapTousers = {};
        let mapToObject = {};


        if(tablename === 'Doctors'){
            userDataObj['email'] = formDataObject.get('Email');
            userDataObj['type'] = "Doctor";

            
            formDataObject.forEach((valor, clave) => {
                formDataObj[clave] = valor;
            });
            // formDataObj['ID'] = formDataObject;
            formDataObj['ModifyIn'] = timestamp;

            mapa.forEach((mapaInterno,indice)=>{
                mapTousers[indice] ={};
                mapaInterno.forEach((finalmap,index)=>{
                  if(index == 'Specialization'){
                      mapTousers[indice]['specialization'] = finalmap;
                  }
                  else if(index == 'Status'){
                      mapTousers[indice]['status'] = finalmap;
                  }
                })  

                
            })

            for (let [clave, mapaInterno] of mapa.entries()) {
                mapToObject[clave] = {};
                for (let [claveInterna, valor] of mapaInterno.entries()) {
                    mapToObject[clave][claveInterna] = valor;
                }
            }
            
            const docReferenceTable = doc(db, 'Doctors', documentId);
            await updateDoc(docReferenceTable, formDataObj);
            await updateDoc(docReferenceTable,{Specializations:mapToObject});

            const docReference = doc(db, 'Users', documentId);
            await updateDoc(docReference,{specializations:mapTousers});
            return true;
        }
        else if(tablename === "Medicines" || tablename === 'Services'){
            formDataObject.forEach((valor, clave) => {
                formDataObj[clave] = valor;
            });

            formDataObj['ModifyIn'] = timestamp;
            await updateDoc(docReference,formDataObj);

            return true;
        }

    }
    catch(error){

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

export async function validateAccess(uid){
    try{

        const docReference = doc(db, 'Users', uid);
        const docSnapshot = await getDoc(docReference);
    
        if(docSnapshot.exists()){
            const userData = docSnapshot.data();
            const userType = userData.superUser;
    
            if(userType){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    catch(error){
        throw error;
    }

}

