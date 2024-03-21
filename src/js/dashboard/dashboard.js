import { getData,setCollection,deleteDocument} from "../../../database/firebase/conexion.js";
import {createUserWithEmailAndPassword,getAuth,signOut } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { firebaseApp } from "../../../database/firebase/conexion.js";
const auth = getAuth(firebaseApp);

var tooltipList;
const spinner = document.querySelector('body > .spinner_extern');
// let  bodyColor = localStorage.getItem("darkBody");

export function mode(){
    const body = document.querySelector('body'),
    sidebar = body.querySelector('.side-bar'),
    toggle = body.querySelector('.toogle'),
    searchBtn = body.querySelector('.search-box'),
    modeSwitch = body.querySelectorAll('.toogle-switch'),
    modeText = body.querySelector('.mode-text');


//     sistemColorPreference(body);
    if(toggle){
          toggle.addEventListener('click' ,()=>{
                sidebar.classList.toggle('close');
          })
    }
    modeSwitch.forEach(button=>{
      button.addEventListener('click' ,()=>{
            console.log('click button')
            body.classList.toggle('dark');
  
            if(body.classList.contains('dark')){
                  if(modeText){
                        modeText.innerText = "Light Mode";
                  
                  }
                  localStorage.setItem('darkBody',1);            
            }
            else{
                  if(modeText){
                        modeText.innerText = "Dark Mode";
                  }
                  localStorage.setItem('darkBody',0);

            }
      })  
      

 
    })

    sistemColorPreference(body);
    colorPreference();
}

 function colorPreference(){
      localStorage.getItem("darkBody");
      const body = document.querySelector('body');
      if(localStorage.getItem("darkBody")==='1'){
          body.classList.add('dark');
      }
      else{
          body.classList.remove('dark');
      }
  }


function sistemColorPreference(body){
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark');
      }
}

export function clickoption(){
      const items = document.querySelectorAll('.link');
      const home = document.querySelector('.home');
      const loading = document.querySelector('.home > .spinner');
      const datos = document.createElement('div');
      datos.classList.add('data_from_db');
      const heightContent = "55vh";
      items.forEach(item =>{
          item.addEventListener('click', function(e){
              const createContainer = document.querySelector('.createContainer');
              if(createContainer){
                  createContainer.remove();
              }
  
              home.dataset.idbutton=`${item.id}`;
  
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
                                          { responsivePriority: 1, targets: 0 },
                                          { responsivePriority: 2, targets: 2 }
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
                          ModyfyAndDelete();
                          activateTooltips();
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
                                      <button class="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Modify"><i class="fa-solid fa-pencil"></i></button>
                                      <button class="btn btn-sm btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete"><i class="fa-solid fa-trash"></i></button>
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
                          activateTooltips();
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
                                  <td id="email-doctor-table" class="pt-3 pb-3">${doctor.Email}</td>
                                  <td class="pt-3 pb-3">${doctor.Contact}</td>
                                  <td class="pt-3 pb-3"></td>
                                  <td class="pt-3 pb-3">${doctor.Experience}</td>
                                  <td class="pt-3 pb-3">${doctor.Dob}</td>
                                  <td class="pt-3 pb-3">${doctor.Gender}</td>
                                  <td class="pt-3 pb-3">${doctor.Status}</td>
                                  <td class="pt-3 pb-3 text-center">
                                      <button class="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Modify"><i class="fa-solid fa-pencil"></i></button>
                                      <button class="btn btn-sm btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete"><i class="fa-solid fa-trash"></i></button>
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
                                          { responsivePriority: 1, targets: 0 },
                                          { responsivePriority: 2, targets: 10 }
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
                          activateTooltips();
                          clickAdd();
                          ModyfyAndDelete();
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
                                  <td class="pt-3 pb-3 text-center">
                                      <button class="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Modify"><i class="fa-solid fa-pencil"></i></button>
                                      <button class="btn btn-sm btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete"><i class="fa-solid fa-trash"></i></button>
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
                          activateTooltips();
                          loading.style.display = "none";
                      })
                  })
              }
              if(item.id === 'Medicines'){
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
                          doc.forEach(medicines =>{
                              content+=`
                              <tr id="${medicines.id}">
                                  <td class="pt-3 pb-3" >${medicines.Name}</td>
                                  <td class="pt-3 pb-3" >${medicines.Price}</td>
                                  <td class="pt-3 pb-3" >${medicines.Composition}</td>
                                  <td class="pt-3 pb-3" >${medicines.Quantity}</td>
                                  <td class="pt-3 pb-3" >${medicines.Available}</td>
                                  <td class="pt-3 pb-3" >${medicines.Delivery}</td>
                                  <td class="pt-3 pb-3 text-center">
                                      <button class="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Modify"><i class="fa-solid fa-pencil"></i></button>
                                      <button class="btn btn-sm btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete"><i class="fa-solid fa-trash"></i></button>
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
                                          {orderable:false,targets:[4]},
                                          {searchable:false,targets:[4]},
                                          { responsivePriority: 1, targets: 0 },
                                          { responsivePriority: 2, targets: 6 }
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
                          activateTooltips();
                          clickAdd();
                          ModyfyAndDelete();
      
                      })
                  })
              }
              if(item.id==='Dashboard'){
                  loading.style.display = "none";
                  activateTooltips();
              }
              if(item.id ==='Logout'){
                  loading.style.display = "none";
                  spinner.style.display = "flex";
                  signOut(auth)
                        .then(() => {
                        // La sesión se ha cerrado correctamente
                        console.log("Sesión cerrada correctamente.");
                        })
                        .catch((error) => {
                        // Manejar errores al cerrar sesión
                        console.error("Error al cerrar sesión:", error);
                        });
                  // activateTooltips();
                  window.location.href = "/";
                  // destroyTooltips();
              }
          
         })
      })
  
  }
function activateTooltips(){
      if (typeof tooltipList !== 'undefined' && tooltipList.length > 0) {
          tooltipList.forEach(tooltip => {
              tooltip.dispose();
          });
          tooltipList = []; // Limpiar la lista de tooltips activos
      }
  
      // Crear nuevas instancias de tooltips con el nuevo método
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}


  
function clickAdd(){
      const buttonadd = document.querySelectorAll('.add-button');
      const loading = document.querySelector('.home > .spinner');
      buttonadd.forEach(button =>{
          if(button){
              button.addEventListener('click', function(event){
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
                      saveInfo(button.id);
  
                  })
  
  
              })
          }
      })
  
  }
  
  
function saveInfo(formId){

const home = document.querySelector('.home');
console.log(home.dataset.idbutton);
const option = document.querySelector(`#${home.dataset.idbutton}`);

const toastLiveExample = document.getElementById('liveToast'),
      toast_header = toastLiveExample.querySelector('.toast-header'),
      toast_warning = toastLiveExample.querySelector('.bx'),
      toast_messageup = toastLiveExample.querySelector('strong'),
      toast_body = toastLiveExample.querySelector('.toast-body');

      
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
            const fechaActualUTC = new Date().toUTCString();
            formData.append('createIn', `${fechaActualUTC} Time Zone`);

            if(formId === 'addServices'){     
            setCollection('Services',formData)
                  .then((docId)=>{
                        console.log("Documento guardado con ID:", docId);

                        button.classList.remove('disabled');
                        btn_close.classList.remove('disabled');
                        loadingform.style.display='none';
                        iconform.style.display='flex';

                        btn_close.click();

                        toast_body.innerHTML = `Component created successfully <br> id: ${docId} `;
                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                        toastBootstrap.show();
                        option.click(); 
                  })
                  .catch(error=>{
                        // console.error("Error al guardar el documento:", error);

                        toast_warning.classList.remove('bx-check');
                        toast_warning.classList.add('bxs-error');
                        toast_warning.style.color = 'red';
                        toast_messageup.innerHTML = `¡Ups! something went wrong`;
                        toast_body.innerHTML= `Component could not be created su <br> error: ${error} `;
                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                        toastBootstrap.show();
                  })
            }
            if(formId === 'addDoctors'){
                  const email = document.querySelector('#Email-Address');
                  const password = document.querySelector('#Password');
                  let tokenAutentication;
                  createUserWithEmailAndPassword(auth, email.value, password.value)
                  .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        const uid = user.uid;
                        user.getIdToken()
                              .then((idToken)=>{
                                    // console.log("Token de autenticación:", idToken);
                                    setCollection('Doctors',formData,idToken,uid)
                                    .then((docId)=>{
                                          console.log("Documento guardado con ID:", docId);
                        
                                          button.classList.remove('disabled');
                                          btn_close.classList.remove('disabled');
                                          loadingform.style.display='none';
                                          iconform.style.display='flex';
                        
                                          btn_close.click();
            
                                          toast_warning.classList.add('bx-check');
                                          toast_warning.classList.remove('bxs-error');
                                          toast_warning.style.color = 'green';
                                          toast_messageup.innerHTML = `¡Success!`;
                        
                                          toast_body.innerHTML = `Component created successfully <br> id: ${docId} `;
                                          const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                                          toastBootstrap.show();
                        
                                          option.click();
                                    })
                                    .catch(error=>{
                                          // console.error("Error al guardar el documento:", error);
                        
                                          toast_warning.classList.remove('bx-check');
                                          toast_warning.classList.add('bxs-error');
                                          toast_warning.style.color = 'red';
                                          toast_messageup.innerHTML = `¡Ups! something went wrong`;
                                          toast_body.innerHTML= `Component could not be created su <br> error: ${error} `;
                                          const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                                          toastBootstrap.show();
                                    })
                              })
                        // ...
                  })
                  .catch((error) => {
                        let message ='';
                        const errorCode = error.code;
                        // const errorMessage = error.message;

                        if(errorCode == 'auth/invalid-email'){

                              message = 'Email is Invalid';
                        }
                        else if(errorCode == 'auth/user-disabled'){
                              message = 'User is Disabled';
                        }
                        else if(errorCode =='auth/user-not-found'){
                              message = 'User not found';
                        }
                        else if(errorCode == 'auth/user-not-found'){
                              message = 'Incorrect Password';
                        }
                        console.log(message);
                        button.classList.remove('disabled');
                        btn_close.classList.remove('disabled');
                        loadingform.style.display='none';
                        iconform.style.display='flex';

                        toast_warning.classList.remove('bx-check');
                        toast_warning.classList.add('bxs-error');
                        toast_warning.style.color = 'red';
                        toast_messageup.innerHTML = `¡Ups! something went wrong`;
                        toast_body.innerHTML= `Component could not be created su <br> error: ${error.message} `;
                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                        toastBootstrap.show();

                        // ..
                  }); 

            }
            if(formId === 'addMedicines'){
            setCollection('Medicines',formData)
            .then((docId)=>{
                  console.log("Documento guardado con ID:", docId);

                  button.classList.remove('disabled');
                  btn_close.classList.remove('disabled');
                  loadingform.style.display='none';
                  iconform.style.display='flex';

                  btn_close.click();

                  toast_body.innerHTML = `Component created successfully <br> id: ${docId} `;
                  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                  toastBootstrap.show()

                  option.click();
            })
            .catch(error=>{
                  // console.error("Error al guardar el documento:", error);

                  toast_warning.classList.remove('bx-check');
                  toast_warning.classList.add('bxs-error');
                  toast_warning.style.color = 'red';
                  toast_messageup.innerHTML = `¡Ups! something went wrong`;
                  toast_body.innerHTML= `Component could not be created su <br> error: ${error} `;
                  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                  toastBootstrap.show();
            })
            }

      }  
      
      form.classList.add('was-validated');
},false);
}
  
  
function  ModyfyAndDelete(){
const rows = document.querySelectorAll('tr');
const loading = document.querySelector('.home > .spinner');
const home = document.querySelector('.home');
const toastLiveExample = document.getElementById('liveToast'),
      toast_header = toastLiveExample.querySelector('.toast-header'),
      toast_warning = toastLiveExample.querySelector('.bx'),
      toast_messageup = toastLiveExample.querySelector('strong'),
      toast_body = toastLiveExample.querySelector('.toast-body');

const option = document.querySelector(`#${home.dataset.idbutton}`);
if(rows){
      rows.forEach(row =>{
            row.addEventListener('click', function(event){
            if(event.target.classList.contains('btn-danger')){
                  console.log(row.id,'->','click en delete');

                  // console.log(row.querySelector('td').textContent);
                  loading.style.display = 'flex';
                  fetch('/public/assets/pages/delete/delete.php',{
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' // Tipo de contenido específico
                        },
                        body:"id="+row.id + "&name=" + row.querySelector('td').textContent + '&category=' + home.dataset.idbutton 

                  })
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

            
                        // const home = document.querySelector('.home');
                        const added =document.createElement('div');
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

                        const btn_delete = document.querySelector('.btn-delete'),
                              spinner_border = btn_delete.querySelector('.spinner-border'),
                              icon_border = btn_delete.querySelector('i.bi');
                        const btn_close = document.querySelector('.button-close');
                        const btn_no = document.querySelector('.btn-no');

                        btn_delete.addEventListener('click', function(e){
                              console.log('click en eliminar');
                              btn_delete.classList.add('disabled');
                              btn_close.classList.add('disabled');
                              btn_no.classList.add('disabled');
                              spinner_border.style.display = 'block';
                              icon_border.style.display = 'none';

                              

                              deleteDocument(home.dataset.idbutton,row.id)
                                    .then((docId)=>{

                                          btn_delete.classList.remove('disabled');
                                          btn_close.classList.remove('disabled');
                                          btn_no.classList.remove('disabled');
                                          spinner_border.style.display = 'none';
                                          icon_border.style.display = 'block';

                                          btn_close.click();

                                          toast_body.innerHTML = `Component Deleted successfully <br> id: ${docId} `;
                                          const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                                          toastBootstrap.show();
                        
                                          option.click();
                                    })
                                    .catch(error=>{
                                          btn_delete.classList.remove('disabled');
                                          btn_close.classList.remove('disabled');
                                          btn_no.classList.remove('disabled');
                                          spinner_border.style.display = 'none';
                                          icon_border.style.display = 'block';

                                          toast_warning.classList.remove('bx-check');
                                          toast_warning.classList.add('bxs-error');
                                          toast_warning.style.color = 'red';
                                          toast_messageup.innerHTML = `¡Ups! something went wrong`;
                                          toast_body.innerHTML= `Component could not be deleted su <br> error: ${error} `;
                                          const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                                          toastBootstrap.show();
                                    })
                        })


                  })

            }
            })
      })
}
}