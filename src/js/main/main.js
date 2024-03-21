import { mode} from "../dashboard/dashboard.min.js";
import {signInWithEmailAndPassword,getAuth } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { firebaseApp } from "../../../database/firebase/conexion.js";

const spinner = document.querySelector('.spinner');
const container = document.querySelector('body > .container-fluid');
const container_info = document.createElement('div');
container_info.classList.add('container_info');
const autorization = getAuth(firebaseApp);

// let tuken;

document.addEventListener('DOMContentLoaded', function(event){
    login();  
})
function login(){

    spinner.style.display = 'flex';
    fetch('public/assets/pages/login/login.php')
    .then(response=>{
        if (response.status === 404) {
            throw new Error('El recurso solicitado no se encontró');
        } else if (response.status === 500) {
        throw new Error('Error interno del servidor');
        } else if(!response.ok) {
        throw new Error('Error en la solicitud fetch: ' + response.status);
        }
        else{
            return response.text();
        }
    })
    .then(data=>{
        container_info.innerHTML = data;
        container.lastChild.remove();
        container.appendChild(container_info);
        spinner.style.display ="none";
        const eyepassword = document.querySelector('.password-input-text'),
              eye = eyepassword.querySelector('.bi');  
        const passwordInput = document.querySelector('.input-login-password');

        eyepassword.addEventListener('click', e=>{
            if(eye.classList.contains('bi-eye')){
                eye.classList.remove('bi-eye');
                eye.classList.add('bi-eye-slash');
                passwordInput.setAttribute('type','password');
            }
            else{
                eye.classList.add('bi-eye');
                eye.classList.remove('bi-eye-slash');
                passwordInput.setAttribute('type','text');
            }
        })
        mode();
        submitLogin();
        const script = document.createElement('script');
        script.textContent = `
            const toastTrigger = document.querySelector('.click-forgot')
            const toastLiveExample = document.getElementById('liveToast')
        
            if (toastTrigger) {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastTrigger.addEventListener('click', () => {
                toastBootstrap.show()
            })
        }
        `
        document.head.appendChild(script);

        // sistemColorPreference(document.querySelector('body'));
        
    })
    .catch(error => {
        // Capturar y manejar errores
        console.error('Error en la solicitud fetch:', error);
    });

}
function submitLogin(){
    const login = document.querySelector('.form_container'),
            input_email = login.querySelector('#validationCustomUsername'),
            input_password = login.querySelector('#password_field');
    if(login){
        
        login.addEventListener('submit', function(e){

            if (!login.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            else{
                e.preventDefault();
                e.stopPropagation();
                const form = new FormData(this);
                
                // form.forEach((key,value)=>{
                //     console.log(key,'->',value );
                // })
                // autorization(input_email,input_password);
                // window.location.href = '/dashboard.php';

                

                signInWithEmailAndPassword(autorization,input_email.value,input_password.value)
                .then(cred =>{
                    // alert('usuario logeado');
                    spinner.style.display ="flex";
                    const user = cred.user;
                    const userUID = user.uid
                    user.getIdToken()
                        .then(token=>{
                            console.log(token);
                            console.log(userUID);
                            sessionStorage.setItem('token', token);
                            fetch('public/assets/pages/dashboard/dashboard.php')
                            .then(response=>{
                                if (response.status === 404) {
                                    throw new Error('El recurso solicitado no se encontró');
                                } else if (response.status === 500) {
                                throw new Error('Error interno del servidor');
                                } else if(!response.ok) {
                                throw new Error('Error en la solicitud fetch: ' + response.status);
                                }
                                else{
                                    return response.text();
                                }
                            })
                            .then((data)=>{
            
                                return data;
                            })
                            .then(data=>{
            
                                window.location.href = "/dashboard.php";
            
                            })
                            .catch(error => {
                                // Manejo de errores
                                return error;
                            });
                        })
                        .catch(error => {
                            console.error('Error al obtener el token:', error);
                        });
                })   
                .catch(error=>{
                    // console.log(error);
                    const liveToast = document.querySelector('#liveToast'),
                          toastHeader = liveToast.querySelector('toast-header'),
                          messageUp = liveToast.querySelector('.messageUp'),
                          toastBody = liveToast.querySelector('.toast-body');

                    toastBody.innerHTML = error.message;
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                    toastBootstrap.show();


                })



            }

            login.classList.add('was-validated');
        },false);     

    }
}




