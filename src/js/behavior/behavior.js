import {mode,clickoption} from '../dashboard/dashboard.min.js'; 


const container = document.querySelector('body > .container-fluid');
const container_info = document.createElement('div');
container_info.classList.add('container_info');
const spinner = document.querySelector('.spinner');
const body = document.querySelector('body');
spinner.style.display = 'flex';
let  bodyColor = localStorage.getItem("darkBody");

// const data = localStorage.getItem("data");
console.log(bodyColor);
document.addEventListener('DOMContentLoaded', function(event){
    // getDatafromLogin(data)
    mode();
    clickoption();
    // colorPreference();
    spinner.style.display = 'none';
})


// function colorPreference(bodyColor){
//     if(bodyColor==='1'){
//         body.classList.add('dark');
//     }
//     else{
//         body.classList.remove('dark');
//     }
// }


function getDatafromLogin(data){

    container.innerHTML = data;
    mode();
    clickoption();

    // console.log(data);
}