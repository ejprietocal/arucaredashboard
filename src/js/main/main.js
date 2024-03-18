import { mode } from "../dashboard/dashboard.min.js";
import { getPatientsData } from "../../../database/firebase/conexion.js";
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
        mode();
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
            mode();
            clickoption();
            // container.appendChild(container_info);
            spinner.style.display ="none";
            // submitLogin();
        })
    })
}

function clickoption(){
    const items = document.querySelectorAll('.link');
    const home = document.querySelector('.home');
    const loading = document.querySelector('.home > .spinner');
    const datos = document.createElement('div');
    datos.classList.add('data_from_db');
    items.forEach(item =>{
        item.addEventListener('click', function(e){
            const datosSelect =  home.querySelector('.data_from_db');
            if(datosSelect){
                datos.remove();
            }

            console.log(item.id.toLowerCase());
            loading.style.display = "flex";
            if(item.id === 'Patients'){
                fetch(`public/assets/pages/${item.id.toLowerCase()}/${item.id.toLowerCase()}.php`)
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

                    datos.innerHTML = data;
                    home.appendChild(datos);
    
                    var fechaActual = new Date();
    
                    var year = fechaActual.getFullYear();
                    var month = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
                    var day = fechaActual.getDate();
                    var hour = fechaActual.getHours();
                    var minutes = fechaActual.getMinutes();
                    var seconds = fechaActual.getSeconds();
                    var fechaHoraFormateada = day + '-' + month + '-' + year + ' ' + hour + '-' + minutes + '-' + seconds;
    
                    let content = ``;
    
                    getPatientsData(item.id).then(doc =>{
                        doc.forEach(paciente =>{
                            content+=`
                            <tr>
                                <td class="pt-3 pb-3" data-title="name">${paciente.FirstName}</td>
                                <td class="pt-3 pb-3" data-title="email">${paciente.Email}</td>
                                <td class="pt-3 pb-3" data-title="mobile">${paciente.MobileNumber}</td>
                                <td class="pt-3 pb-3" data-title="gender">${paciente.Gender}</td>
                                <td class="pt-3 pb-3" data-title="created">${paciente.CreateIn}</td>
                                <td class="pt-3 pb-3" data-title="action">somethinf</td>
                            </tr>
                            `
                        })
                        return content;
    
                    }).then(data=>{
                        tbody_patients.innerHTML = data;
                        const  table = new DataTable('#myTable',{
                            responsive:true,
                            scrollCollapse: true,
                            scroller: true,
                            scrollY: "60vh",
                            // select: true,
                            lengthMenu: [ [12, 25, 50, -1], [12, 25, 50] ], // Define las opciones para "Show entries"
                            layout: {
                                topStart: {
                                    buttons: [
                                        // Botón para copiar al portapapeles
                                        {
                                            extend: 'colvis', // Botón para mostrar/ocultar columnas
                                            text: 'Show/Hide Cols' // Texto personalizado para el botón
                                        },
                                        {
                                            extend: 'pageLength', // Botón para controlar la longitud de página
                                            text: 'Entries',
                                        },
                                        {
                                            extend: 'csv',
                                            split: [
                                                {
                                                    extend: 'pdf', // Botón para exportar a PDF
                                                    text: 'Generate PDF', // Texto para el botón de exportación PDF
                                                    filename: `${item.id}-${fechaHoraFormateada}`, // Nombre del documento PDF
                                                    exportOptions: {
                                                        columns: ':visible'
                                                    }
                                                },                                    
                                                {
                                                    extend: 'excel', // Botón para exportar a Excel
                                                    text: 'Generate Excel', // Texto para el botón de exportación Excel
                                                    filename: `${item.id}-${fechaHoraFormateada}`, // Nombre del archivo Excel
                                                    exportOptions: {
                                                        columns: ':visible'
                                                    }
                                                },
                                                
                                                {extend: 'copy', text: 'Copy all Data'},
                                                {
                                                    extend: 'copy', // Botón para copiar al portapapeles
                                                    text: 'Copy Visible Data',
                                                    exportOptions: {
                                                        modifier: {
                                                            selected: true, // Copiar solo los elementos seleccionados
                                                            page: 'current' // Copiar solo los elementos de la página actual
                                                        }
                                                    },
                                                    className: 'copyButton',
                                                    title: null,
                                                    header: false
                                                }
                                        
                                            ]
                                        },
                                        
        
                                    ]
                                }
                            }
                        });
                        loading.style.display = "none";
    
                    })
    
    
    
                })
            }
        
       })
    })

}