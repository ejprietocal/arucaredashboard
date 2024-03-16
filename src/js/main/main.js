import { sidebar } from "../dashboard/dashboard.min.js";

const spinner = document.querySelector('.spinner');
const container = document.querySelector('.container-fluid');
const container_info = document.createElement('div');
container_info.classList.add('container_info');

document.addEventListener('DOMContentLoaded', function(event){
    login();

})
document.addEventListener('load', function(event){
    // spinner.style.display ="none";
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
        container.appendChild(container_info);
        spinner.style.display ="none";
        submitLogin();
    })
    .catch(error => {
        // Capturar y manejar errores
        console.error('Error en la solicitud fetch:', error);
    });

}
function submitLogin(){
    const login = document.querySelector('.form_container');

    login.addEventListener('submit', function(event){
        event.preventDefault();
        const form = new FormData(this);
        form.forEach((key,value)=>{
            console.log(key,'->',value );
        })
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
        .then(data=>{
            container.innerHTML = data;
            sidebar();
            // container.appendChild(container_info);
            spinner.style.display ="none";
            // submitLogin();
        })
    })
}