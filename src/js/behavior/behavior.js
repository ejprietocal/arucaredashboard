import {mode,clickoption} from '../dashboard/dashboard.min.js'; 


const container = document.querySelector('body > .container-fluid');
const container_info = document.createElement('div');
container_info.classList.add('container_info');
const spinner = document.querySelector('.spinner');
const body = document.querySelector('body');
spinner.style.display = 'flex';


document.addEventListener('DOMContentLoaded', function(event){
    mode();
    clickoption();

    spinner.style.display = 'none';
})


