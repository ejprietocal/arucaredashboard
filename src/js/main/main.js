import { mode,validateEmail} from "../dashboard/dashboard.min.js";
import {signInWithEmailAndPassword,getAuth,sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { firebaseApp,validateAccess} from "../../../database/firebase/conexion.js";

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
        // const script = document.createElement('script');
 
        const toastTrigger = document.querySelector('.click-forgot');
        const toastLiveExample = document.getElementById('liveToast');
    
        if (toastTrigger) {
    
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        const liveToast = document.querySelector('#liveToast'),
                toastHeader = liveToast.querySelector('.toast-header'),
                iconHeader = toastHeader.querySelector('i.bi'),
                messageUp = liveToast.querySelector('.messageUp'),
                toastBody = liveToast.querySelector('.toast-body');
            toastTrigger.addEventListener('click', () => {


    
                const user = document.querySelector('#validationCustomUsername').value;
                // console.log(validateEmail(user));
                if(!validateEmail(user)){
                    iconHeader.classList.add('bi-exclamation-circle');
                    iconHeader.classList.remove('bi-send-check-fill');
                    liveToast.classList.add('bg-danger-subtle');
                    liveToast.classList.add('text-danger-emphasis');
                    liveToast.classList.remove('bg-success-subtle');
                    messageUp.innerHTML = '¡Ups!';
                    liveToast.classList.remove('text-success-emphasis');
                    toastBody.innerHTML = "Please Enter a valid email in the User Field";
                }
                else{
                    sendPasswordResetEmail(autorization,user)
                        .then(()=>{
                            toastBody.innerHTML = "Check your email and Follow Steps to reset password"
                            messageUp.innerHTML = '¡Email Sent!'
                            iconHeader.classList.remove('bi-exclamation-circle');
                            iconHeader.classList.add('bi-send-check-fill');
                            liveToast.classList.remove('bg-danger-subtle');
                            liveToast.classList.remove('text-danger-emphasis');
                            liveToast.classList.add('bg-success-subtle');
                            liveToast.classList.add('text-success-emphasis');
                        })
                        .catch((error) => {

                            iconHeader.classList.add('bi-exclamation-circle');
                            iconHeader.classList.remove('bi-send-check-fill');
                            liveToast.classList.add('bg-danger-subtle');
                            liveToast.classList.add('text-danger-emphasis');
                            liveToast.classList.remove('bg-success-subtle');
                            messageUp.innerHTML = '¡Ups!';
                            liveToast.classList.remove('text-success-emphasis');
                            toastBody.innerHTML = error.message;

                            // Se produjo un error al enviar el correo electrónico de restablecimiento
                            // console.error("Error al enviar el correo electrónico para restablecer la contraseña:", error);
                          });


                    

                }
                
                toastBootstrap.show()
            })
        }
        
    })
    .catch(error => {
        console.error('Error en la solicitud fetch:', error);
    });

}
function submitLogin(){
    const login = document.querySelector('.form_container'),
            input_email = login.querySelector('#validationCustomUsername'),
            input_password = login.querySelector('#password_field'),
            spinner_border = login.querySelector('button .spinner-border'),
            button_submit = login.querySelector('button');

    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    const liveToast = document.querySelector('#liveToast'),
            toastHeader = liveToast.querySelector('.toast-header'),
            iconHeader = toastHeader.querySelector('i.bi'),
            messageUp = liveToast.querySelector('.messageUp'),
            toastBody = liveToast.querySelector('.toast-body');

            iconHeader.classList.add('bi-exclamation-circle');
            iconHeader.classList.remove('bi-send-check-fill');
            liveToast.classList.add('bg-danger-subtle');
            liveToast.classList.add('text-danger-emphasis');
            liveToast.classList.remove('bg-success-subtle');
            liveToast.classList.remove('text-success-emphasis');

            let messagepop= ``;
    if(login){
        login.addEventListener('submit', function(e){

            if (!login.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            else{
                e.preventDefault();
                e.stopPropagation();
                button_submit.disabled = true;
                spinner_border.style.display = 'flex';

                signInWithEmailAndPassword(autorization,input_email.value,input_password.value)
                .then(cred =>{
                    const user = cred.user;
                    const uid = user.uid;
                   validateAccess(uid)
                        .then(promise=>{
                            console.log(promise)
                            if(promise){
                                user.getIdToken()
                                    .then(token=>{
                                        if(!token) {
                                            throw new Error('Access token couldn\'t be found');
                                        }
                                        else{
                                            return token;
                                        }
                                    })
                                    .then(token=>{
                                        document.cookie = `token=${token}; max-age=86400 path=/`;
                                        fetch('public/assets/pages/dashboard/dashboard.php')
                                        .then(response=>{
                                            if (response.status === 404) {
                                                throw new Error('Resource page couldn\'t be found 404');
                                            } else if (response.status === 500) {
                                            throw new Error('Internal Server Error: 500');
                                            } else if(!response.ok) {
                                            throw new Error('Error in fetch: ' + response.status);
                
                                        }
                                            else{
                                                return response.text();
                                            }
                                        })
                                        .then(data=>{        
                                            window.location.href = "dashboard.php";
                                        })
                                        .catch(error => {
                                            // Manejo de errores
                                            messagepop = error;
                                            toastBody.innerHTML = messagepop;
                                            toastBootstrap.show(); 
                                            button_submit.disabled = false;
                                            spinner_border.style.display = 'none';
                                            // console.log(error);
            
                                        });
                                    })
                                    .catch(error => {
                                        messagepop = error;
                                        toastBody.innerHTML = messagepop;
                                        toastBootstrap.show(); 
                                        button_submit.disabled = false;
                                        spinner_border.style.display = 'none'; 
                                    });
                            }
                            else{
                                spinner.style.display ="none";
                                throw new Error('User has no access to this dashboard');
                            }

                        })
                        .catch(error=>{
                            // console.log(error);
                            
                            messagepop = error.message
                            button_submit.disabled = false;
                            spinner_border.style.display = 'none';
                            toastBody.innerHTML = messagepop;
                            toastBootstrap.show();
                        })

                })   
                .catch(error=>{
                    

                    // console.log(error.message);

                    messageUp.innerHTML = '¡Ups!';

                    if(error.message === 'Firebase: Error (auth/invalid-email).'){
                        messagepop = 'Email is Invalid';
                    }
                    else if(error.message === 'Firebase: Error (auth/user-not-found).'){
                        messagepop = 'Email/User not found'
                    }
                    else if(error.message === 'Firebase: Error (auth/wrong-password).'){
                        messagepop = 'You typed an incorrect password'
                    }
                    else if(error.message === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'){
                        messagepop = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later'
                    }
                    else{
                        messagepop = error.message;
                    }
                    button_submit.disabled = false;
                    spinner_border.style.display ="none";
                    toastBody.innerHTML = messagepop;
                    toastBootstrap.show();

                })
            }
            login.classList.add('was-validated');
        },false);     

    }
}




