import { mode} from "../dashboard/dashboard.min.js";


const spinner = document.querySelector('.spinner');
const container = document.querySelector('body > .container-fluid');
const container_info = document.createElement('div');
container_info.classList.add('container_info');


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
        // sistemColorPreference(document.querySelector('body'));
        
    })
    .catch(error => {
        // Capturar y manejar errores
        console.error('Error en la solicitud fetch:', error);
    });

}
function submitLogin(){
    const login = document.querySelector('.form_container');
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

                // window.location.href = '/dashboard.php';
                
                spinner.style.display ="flex";
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
                    // container.appendChild(container_info);
                    // submitLogin();

                    return data;
                })
                .then(data=>{
                    // getDatafromLogin(data);
                    // let bool = 0;
                    // if(document.querySelector('body').classList.contains('dark')){
                    //     bool = 0;
                    // }
                    // else{
                    //     bool = 1;
                    // }
                    // localStorage.setItem('data',data);

                    // localStorage.setItem('darkBody',bool);
                    window.location.href = "/dashboard.php";
                    // spinner.style.display ="none";
                    // container.innerHTML = data;
                    // mode();
                    // clickoption();
                    // activateTooltips();
                    // return data;
                })
                .catch(error => {
                    // Manejo de errores
                    return error;
                });

            }

            login.classList.add('was-validated');
        },false);     

    }
}




