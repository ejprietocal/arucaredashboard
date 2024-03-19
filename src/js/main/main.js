import { mode, sistemColorPreference } from "../dashboard/dashboard.min.js";
import { getData } from "../../../database/firebase/conexion.js";
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
        sistemColorPreference(document.querySelector('body'));
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
    const heightContent = "55vh";
    items.forEach(item =>{
        item.addEventListener('click', function(e){
            const datosSelect =  home.querySelector('.data_from_db');
            var fechaActual = new Date();
    
            var year = fechaActual.getFullYear();
            var month = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
            var day = fechaActual.getDate();
            var hour = fechaActual.getHours();
            var minutes = fechaActual.getMinutes();
            var seconds = fechaActual.getSeconds();
            var fechaHoraFormateada = day + '-' + month + '-' + year + ' ' + hour + '-' + minutes + '-' + seconds;

            let content = ``;

            if(datosSelect){
                datos.remove();
            }

            loading.style.display = "flex";
            if(item.id ==='Services'){
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
                    getData(item.id).then(doc =>{
                        doc.forEach(appointment =>{
                            content+=`
                            <tr id="${appointment.id}">
                                <td class="pt-3 pb-3">${appointment.name}</td>
                                <td class="pt-3 pb-3">${appointment.available}</td>
                                <td class="pt-3 pb-3 text-center">
                                    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                                    <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                            `
                        })
                        return content;
    
                    }).then(data=>{
                        tbody_patients.innerHTML = data;
                        const  table = new DataTable('#myTable',{

                            responsive:true,
                            scrollCollapse: true,
                            columnDefs: [
                                        {orderable:false,targets:[2]},
                                        // {searchable:false,targets:[9]}
                                        ],
                            scroller: true,
                            scrollY: heightContent,
                            destroy:true,
                            // select: true,
                            lengthMenu: [ [5, 10, 15, -1], [5, 10, 15] ], // Define las opciones para "Show entries"
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
                        clickAdd();
                    })
                })
            }
            if(item.id === 'Appointments'){
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
    
                    // initDatatable(item);
    
                    getData(item.id).then(doc =>{
                        doc.forEach(appointment =>{
                            content+=`
                            <tr id="${appointment.id}">
                                <td class="pt-3 pb-3">${appointment.patientFirstName}</td>
                                <td class="pt-3 pb-3">${appointment.patientLastName}</td>
                                <td class="pt-3 pb-3">${appointment.patientEmail}</td>
                                <td class="pt-3 pb-3">${appointment.service}</td>
                                <td class="pt-3 pb-3">${appointment.description}</td>
                                <td class="pt-3 pb-3">${appointment.doctorFirstName} ${appointment.doctorLastName}</td>
                                <td class="pt-3 pb-3">${appointment.doctorEmail}</td>
                                <td class="pt-3 pb-3">${appointment.status}</td>
                                <td class="pt-3 pb-3 text-center">
                                    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                                    <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                            `
                        })
                        return content;
    
                    }).then(data=>{
                        tbody_patients.innerHTML = data;
                        const  table = new DataTable('#myTable',{

                            responsive:true,
                            scrollCollapse: true,
                            columnDefs: [{className:"text-centered",targets:[0,1,2,3,4,5]},
                                        {orderable:false,targets:[8]},
                                        // {searchable:false,targets:[9]}
                                        ],
                            scroller: true,
                            scrollY: heightContent,
                            destroy:true,
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
            if(item.id === 'Doctors'){
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
    


                    // initDatatable(item);
    
                    getData(item.id).then(doc =>{
                        doc.forEach(doctor =>{
                            content+=`
                            <tr id="${doctor.id}">
                                <td class="pt-3 pb-3">${doctor.FirstName}</td>
                                <td class="pt-3 pb-3">${doctor.LastName}</td>
                                <td class="pt-3 pb-3">${doctor.DocumentID}</td>
                                <td class="pt-3 pb-3">${doctor.Email}</td>
                                <td class="pt-3 pb-3">${doctor.Contact}</td>
                                <td class="pt-3 pb-3"></td>
                                <td class="pt-3 pb-3">${doctor.Experience}</td>
                                <td class="pt-3 pb-3">${doctor.Dob}</td>
                                <td class="pt-3 pb-3">${doctor.Gender}</td>
                                <td class="pt-3 pb-3">${doctor.Status}</td>
                                <td class="pt-3 pb-3 text-center">
                                    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                                    <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                            `
                        })
                        return content;
    
                    }).then(data=>{
                        tbody_patients.innerHTML = data;
                        const  table = new DataTable('#myTable',{

                            responsive:true,
                            scrollCollapse: true,
                            columnDefs: [{className:"text-centered",targets:[0,1,2,3,4,5]},
                                        {orderable:false,targets:[9,6]},
                                        // {searchable:false,targets:[9]}
                                        ],
                            scroller: true,
                            scrollY: heightContent,
                            destroy:true,
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
                        clickAdd();
                    })
                })
            }
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

                    // initDatatable(item);
    
                    getData(item.id).then(doc =>{
                        doc.forEach(paciente =>{
                            content+=`
                            <tr id="${paciente.id}">
                                <td class="pt-3 pb-3" data-title="name">${paciente.FirstName}</td>
                                <td class="pt-3 pb-3" data-title="email">${paciente.Email}</td>
                                <td class="pt-3 pb-3" data-title="mobile">${paciente.MobileNumber}</td>
                                <td class="pt-3 pb-3" data-title="gender">${paciente.Gender}</td>
                                <td class="pt-3 pb-3" data-title="created">${paciente.CreateIn}</td>
                                <td class="pt-3 pb-3 text-center" data-title="action">
                                    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                                    <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                            `
                        })
                        return content;
    
                    }).then(data=>{
                        tbody_patients.innerHTML = data;
                        const  table = new DataTable('#myTable',{

                            responsive:true,
                            scrollCollapse: true,
                            columnDefs: [{className:"text-centered",targets:[0,1,2,3,4,5]},
                                        {orderable:false,targets:[5]},
                                        {searchable:false,targets:[5]}
                                        ],
                            scroller: true,
                            scrollY: heightContent,
                            destroy:true,
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

function clickAdd(){
    const buttonadd = document.querySelectorAll('.add-button');
    const loading = document.querySelector('.home > .spinner');
    buttonadd.forEach(button =>{
        if(button){
            button.addEventListener('click', function(event){
                // console.log(button.id);
                
                loading.style.display = 'flex';
                fetch(`public/assets/pages/${button.id.toLowerCase()}/${button.id.toLowerCase()}.php`)
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
                    const home = document.querySelector('.home');
                    const added = document.createElement('div');
                    added.id  = `${button.id}Container`;
                    added.classList.add('position-absolute');
                    added.classList.add('createContainer');
                    added.classList.add('d-flex');
                    added.classList.add('top-0');
                    added.classList.add('align-items-center');
                    added.classList.add('justify-content-center');
                    added.classList.add('w-100');
                    added.style.height = '100vh';



                    added.innerHTML = data;
                    home.appendChild(added);

                    loading.style.display = 'none';
                    saveInfo();

                })


            })
        }
    })

}


function saveInfo(){
    const form = document.getElementById('form'),
          loadingform = form.querySelector('.spinner-border'),
          button = form.querySelector('.btn'), 
          btn_close = form.querySelector('.button-close'),
          iconform = form.querySelector('.bxs-save');  
    form.addEventListener('submit', function(e){

        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
          }

        else{
            e.preventDefault();
            e.stopPropagation();
            loadingform.style.display='flex';
            iconform.style.display='none';
            button.classList.add('disabled');
            btn_close.classList.add('disabled');
            const formData = new FormData(this);

            formData.forEach((value,key)=>{
            console.log(key,'->',value);

            if(value === ''|| value===null){
                errores.push(`el campo ${key} no puede ir vacio`);
                }
            });

            // button.classList.remove('disabled');
            btn_close.classList.remove('disabled');
        }  

        form.classList.add('was-validated')

            // loadingform.style.display='none';
            // iconform.style.display='flex';
        // }

    },false);
}


