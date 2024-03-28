import { getData,setCollection,deleteDocument,getDocToupdate, updateDocument} from "../../../database/firebase/conexion.js";
import {createUserWithEmailAndPassword,getAuth,signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { firebaseApp } from "../../../database/firebase/conexion.js";
import { initializateGraph,initializateGraphApp,initializateGraphStatus,initializateGraphBills} from "../graph/graph.min.js";




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
      const buttonsOptions = document.querySelectorAll('.menu button');
      datos.classList.add('data_from_db');
      const heightContent = "55vh";
      let e;
      items.forEach(item =>{
          item.addEventListener('click', function(e){

               buttonsOptions.forEach(button =>{
                    button.disabled = true;
                    button.style.pointerEvents = 'none';
               }) 
              while(e = document.querySelector('.data_from_db')){
                      e.remove();
              }
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
                  fetch(`public/assets/pages/${item.id.toLowerCase()}/${item.id.toLowerCase()}.php`,{
                    method: 'GET',
                    credentials: 'include'
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
                      let available;  
                      datos.innerHTML = data;
                      home.appendChild(datos);    
                      getData(item.id).then(doc =>{
                          doc.forEach(service =>{
                              content+=`
                              <tr id="${service.id}">
                                  <td class="pt-3 pb-3">${service.name}</td>
                                  <td class="d-flex align-items-center justify-content-center" >
                                  ${available = service.available === '1' ? '<span class="p-3 border bg-success-subtle text-success-emphasis border-success border-3 rounded-3">Available <i class="bi bi-bookmark-check-fill"></i></span>':
                                                 '<span class="p-3 border  bg-warning-subtle text-warning-emphasis border-warning border-3 rounded-3">Not Available <i class="bi bi-bookmark-x-fill"></i></span>'
                                            }
                                  </td>
                                  <td class="pt-3 pb-3 text-center">
                                      <button class="btn btn-sm p-3 btn-primary"><i class="fa-solid fa-pencil"></i></button>
                                      <button class="btn btn-sm p-3 btn-danger"><i class="fa-solid fa-trash"></i></button>
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
                          
                        buttonsOptions.forEach(button =>{
                                button.disabled = false;
                                button.style.pointerEvents = 'auto';
                        }) 
                      })
                  })
              }
              if(item.id === 'Appointments'){
                  fetch(`public/assets/pages/${item.id.toLowerCase()}/${item.id.toLowerCase()}.php`,{
                    method: 'GET',
                    credentials: 'include'
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
  
                      datos.innerHTML = data;
                      home.appendChild(datos);
      
                      // initDatatable(item);
                      let statusAppointment;
                      let statusBill;
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
                                  <td class="pt-3 pb-3">${appointment.doctorEmail.toLowerCase()}</td>
                                  <td class="pt-3 pb-3 text-center">
                                  ${statusBill = appointment.status === '0' ? '<span class="btn bg-danger text-white fw-bold p-2 pt-3 pb-3" data-bs-html="true" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="<em>there is no Invoice</em><br><strong>Appointment cancelled<strong>">Cancelled <i class="bi bi-ban"></i></span>':
                                                 appointment.billsEntity?.[0]?.Status === 'Unpaid' ? '<span class="btn bg-warning text-dark fw-bold p-3 ps-4 pe-4" data-bs-toggle="tooltip" data-bs-placement="top"  data-bs-html="true" data-bs-title="<em>Invoice Generated</em><br><strong>not paid yet<strong>">Unpaid <i class="bi bi-receipt"></i></span>':
                                                 appointment.billsEntity?.[0]?.Status === 'Paid'   ? '<span class="btn bg-success-subtle text-success-emphasis fw-bold p-3 ps-5 pe-5" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" data-bs-title="<em>Invoice Paid</em><br><strong>check the transaction<strong>">Paid <i class="bi bi-cash"></i></span>':
                                                   '<span class="btn bg-warning-subtle text-warning-emphasis fw-bold p-3"data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" data-bs-title="<em>Invoice not generated yet</em><br><strong>check with Doctor to see status<strong>">Pending <i class="bi bi-clock-fill"></i></span>'}
                                  </td>
                                  <td class="pt-3 pb-3 text-center">
                                    ${statusAppointment = appointment.status === '0' ? "<span class='btn btn-danger fw-bold  h-100 w-100 text-center p-3' data-bs-html='true' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-title='<em>there is no Invoice</em><br><strong>Appointment cancelled<strong>' >Cancelled <i class='bi bi-ban'></i></span>" :
                                                          appointment.status === '1' ? "<span class='btn btn-primary fw-bold  h-100 w-100 text-center p-3'data-bs-html='true' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-title='<em>Patient request Appointment</em><br><strong>None of Doctors has taken it yet<strong>'>Check-in <i class='bi bi-door-open-fill'></i></span>" :
                                                          appointment.status === '3' ? "<span class='btn bg-success-subtle text-success-emphasis fw-bold  h-100 w-100 text-center p-3' data-bs-html='true'  data-bs-toggle='tooltip' data-bs-placement='top' data-bs-title='<em>Appointment sesion</em><br><strong>Appointment sesion was done <strong>'>Check-out <i class='bi bi-box-arrow-right'></i></span>" :
                                                          "<span class='btn btn-warning fw-bold   h-100 w-100 text-center p-3' data-bs-html='true' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-title='<em>Appointment Booked</em><br><strong>A Doctor is taking care of it already<strong>'>Booked <i class='bi bi-journal-check'></i></span>" 
                                   }</td>
                                   
                                  <td class="pt-3 pb-3 text-center">
                                      <button class="btn btn-sm btn-danger p-3 pe-4 ps-4" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete"><i class="fa-solid fa-trash fs-4"></i></button>
                                  </td>
                              </tr>
                              `

                            //   
                          })
                          return content;
      
                      }).then(data=>{
                          tbody_patients.innerHTML = data;
                          const  table = new DataTable('#myTable',{
  
                              responsive:true,
                              scrollCollapse: true,
                              columnDefs: [{className:"text-centered",targets:[0,1,2,3,4,5]},
                                          {orderable:false,targets:[9]},
                                            { responsivePriority: 1, targets: 0 },
                                            { responsivePriority: 4, targets: 8 },
                                            { responsivePriority: 3, targets: 7 },
                                            { responsivePriority: 2, targets: 9 },
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
                          ModyfyAndDelete();
                          buttonsOptions.forEach(button =>{
                            button.disabled = false;
                            button.style.pointerEvents = 'auto';

                        }) 
                          loading.style.display = "none";
      
                      })
                  })
              }
              if(item.id === 'Doctors'){
                  fetch(`public/assets/pages/${item.id.toLowerCase()}/${item.id.toLowerCase()}.php`,{
                    method: 'GET',
                    credentials: 'include'
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
  
                      datos.innerHTML = data;
                      home.appendChild(datos);
      
                      // initDatatable(item);
                      let resultedted;  
                      getData(item.id).then(doc =>{
                          doc.forEach(doctor =>{
                            if(doctor.id != 'A4eWQX89sPNGVe4kBKArcfDrKed2' & doctor.id != 'MAvOH7gXTFQ19jOVomUBPuzu7OK2'){                                
                                content+=`
                                <tr id="${doctor.id}">
                                    <td class="pt-3 pb-3">${doctor.FirstName}</td>
                                    <td class="pt-3 pb-3">${doctor.LastName}</td>
                                    <td class="pt-3 pb-3 text-center">${doctor.DocumentID}</td>
                                    <td id="email-doctor-table" class="pt-3 pb-3">${doctor.Email}</td>
                                    <td class="pt-3 pb-3 text-center">${doctor.Contact}</td>
                                    <td class="pt-3 pb-3"></td>
                                    <td class="pt-3 pb-3 text-center">${doctor.Experience}</td>
                                    <td class="pt-3 pb-3">${doctor.Dob}</td>
                                    <td class="pt-3 pb-3">
                                    ${ resultedted = doctor.Gender === 'Male' ? doctor.Gender + "<i class='bi bi-gender-male fw-bold fs-3 ms-3' style='color:#0196e3'></i>" :
                                                   doctor.Gender === 'Female' ? doctor.Gender + "<i class='bi bi-gender-female fw-bold fs-3 ms-3' style='color:pink'></i>":
                                                   doctor.Gender+"<i class='bi bi-gender-neuter ms-3 fw-bold fs-3' style='color:purple'></i>"
                                    }
                                    </td>
                                    <td class="d-flex justify-content-center align-items-center">
                                    ${doctor.Status === '2' ? '<span type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Available"><i class="bi bi-person-fill-check fs-1" style="color:green"></i></span>' : '<span type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Not Available"><i class="bi bi-person-fill-x fs-1" style="color:red"></i></span>'}
                                    </td>
                                    <td class="pt-3 pb-3 text-center">
                                        <button class="btn btn-sm btn-primary p-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Modify"><i class="fa-solid fa-pencil fs-4"></i></button>
                                        <button class="btn btn-sm btn-danger p-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete"><i class="fa-solid fa-trash fs-4"></i></button>
                                    </td>
                                </tr>
                                `
                            }
                          })
                          return content;
      
                      }).then(data=>{
                          tbody_patients.innerHTML = data;
                          const  table = new DataTable('#myTable',{
  
                              responsive:true,
                              scrollCollapse: true,
                              columnDefs: [{className:"text-centered",targets:[0,1,2,3,4,5]},
                                          {orderable:false,targets:[10]},
                                          { responsivePriority: 1, targets: 0 },
                                          { responsivePriority: 2, targets: 10 },
                                          { responsivePriority: 3, targets: 9 }
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
                          buttonsOptions.forEach(button =>{
                            button.disabled = false;
                            button.style.pointerEvents = 'auto';

                            }) 
                          activateTooltips();
                          clickAdd();
                          ModyfyAndDelete();
                      })
                  })
              }
              if(item.id === 'Patients'){
                  fetch(`public/assets/pages/${item.id.toLowerCase()}/${item.id.toLowerCase()}.php`,{
                    method: 'GET',
                    credentials: 'include'
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
  
                      datos.innerHTML = data;
                      home.appendChild(datos);
  
                      // initDatatable(item);
                      let resultedted;                      
                      getData(item.id).then(doc =>{
                          doc.forEach(paciente =>{
                              content+=`
                              <tr id="${paciente.id}">
                                  <td class="pt-3 pb-3" data-title="name">${paciente.FirstName}</td>
                                  <td class="pt-3 pb-3" data-title="email">${paciente.Email}</td>
                                  <td class="pt-3 pb-3" data-title="mobile">${paciente.MobileNumber}</td>
                                  <td class="pt-3 pb-3 text-center">
                                  ${ resultedted = paciente.Gender === 'male' ? paciente.Gender + "<i class='bi bi-gender-male fw-bold fs-3 ms-3' style='color:#0196e3'></i>" :
                                                 paciente.Gender === 'female' ? paciente.Gender + "<i class='bi bi-gender-female fw-bold fs-3 ms-3' style='color:pink'></i>":
                                                 paciente.Gender+"<i class='bi bi-gender-neuter ms-3 fw-bold fs-3' style='color:purple'></i>"
                                  }
                                  </td>
                                  <td class="pt-3 pb-3 text-center" data-title="created">${paciente.CreateIn.split('.')[0]}</td>
                                  <td class="text-center d-flex align-items-center justify-content-center gap-1">
                                      <button class="p-3 btn btn-sm btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete"><i class="fa-solid fa-trash"></i></button>
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
                                          {searchable:false,targets:[5]},
                                          { responsivePriority: 1, targets: 0 },
                                          { responsivePriority: 2, targets: 5 },
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
                          ModyfyAndDelete();
                          buttonsOptions.forEach(button =>{
                            button.disabled = false;
                            button.style.pointerEvents = 'auto';

                            }) 
                          loading.style.display = "none";
                      })
                  })
              }
              if(item.id === 'Medicines'){
                  fetch(`public/assets/pages/${item.id.toLowerCase()}/${item.id.toLowerCase()}.php`,{
                    method: 'GET',
                    credentials: 'include'
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
  
                      datos.innerHTML = data;
                      home.appendChild(datos);
  
                      // initDatatable(item);
                      let available;   
                      getData(item.id).then(doc =>{
                          doc.forEach(medicines =>{
                              content+=`
                              <tr id="${medicines.id}">
                                  <td class="pt-3 pb-3 text-center" >${medicines.Name}</td>
                                  <td class="pt-3 pb-3 text-center" >${medicines.Price}</td>
                                  <td class="pt-3 pb-3 text-center" >${medicines.Composition}</td>
                                  <td class="pt-3 pb-3 text-center" >${medicines.Quantity}</td>
                                  <td class="d-flex align-items-center justify-content-center" >
                                  ${available = medicines.Available === '1' ? '<span class="p-3 border bg-success-subtle text-success-emphasis border-success border-3 rounded-3">Available <i class="bi bi-bookmark-check-fill"></i></span>':
                                                 '<span class="p-3 border  bg-warning-subtle text-warning-emphasis border-warning border-3 rounded-3">Not Available <i class="bi bi-bookmark-x-fill"></i></span>'
                                            }
                                  </td>
                                  <td class="pt-3 pb-3 text-center" >${medicines.Delivery}</td>
                                  <td class="d-flex align-items-center p-4 justify-content-center gap-2">
                                      <button class="btn p-4 btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Modify"><i class="fa-solid fa-pencil"></i></button>
                                      <button class="btn p-4 btn-sm btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete"><i class="fa-solid fa-trash"></i></button>
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
                          buttonsOptions.forEach(button =>{
                            button.disabled = false;
                            button.style.pointerEvents = 'auto';
                            }) 
                          activateTooltips();
                          clickAdd();
                          ModyfyAndDelete();
      
                      })
                  })
              }
              if(item.id==='Dashboard'){
                  loading.style.display = "none";
                  fetch(`public/assets/pages/${item.id.toLowerCase()}/${item.id.toLowerCase()}.php`,{
                    method: 'GET',
                    credentials: 'include'
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
                    datos.innerHTML = data;
                    home.appendChild(datos);
                    initializateGraph('myChart');
                    initializateGraphApp('myChartApp');
                    initializateGraphStatus('myChartAppointments');
                    initializateGraphBills('myChartBills')
                    activateTooltips();
                    clickAdd();
                  })
                  .catch(error=>{
                    console.log(error);
                  })


                  activateTooltips();

                  buttonsOptions.forEach(button =>{
                    button.disabled = false;
                    button.style.pointerEvents = 'auto';
                    }) 
              }
              if(item.id ==='Logout'){
                  loading.style.display = "none";
                  spinner.style.display = "flex";
                  signOut(auth)
                        .then(() => {
                        // La sesión se ha cerrado correctamente
                        buttonsOptions.forEach(button =>{
                            button.disabled = false;
                        }) 
                        document.cookie = 'token' + '=; max-age=-99999999';
                        console.log("Sesión cerrada correctamente.");
                        window.location.href = "/dashboard";
                        })
                        .catch((error) => {
                        // Manejar errores al cerrar sesión
                        console.error("Error al cerrar sesión:", error);
                        });
                  // activateTooltips();

                  // destroyTooltips();
              }
          
         })
      })
  
  }
export function activateTooltips(){
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


  
export function clickAdd(){
      const buttonadd = document.querySelectorAll('.add-button');
      const loading = document.querySelector('.home > .spinner');
      buttonadd.forEach(button =>{
          if(button){
              button.addEventListener('click', function(event){
                  loading.style.display = 'flex';
                  fetch(`public/assets/pages/${button.id.toLowerCase()}/${button.id.toLowerCase()}.php`,{
                    method: 'GET',
                    credentials: 'include'
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




                      if(button.id === "addDoctors"){

                      const password = document.querySelector('#Password');
                      const eyepassword = document.querySelector('.input-group-text'),
                            eyeicon = eyepassword.querySelector('i.bi');


                        let aux = 1;
                        const addNode = document.querySelector('.btn-add-new-node');
                        const container_node = document.querySelector('#contenedor_node');
                        addNode.addEventListener('click',function(e){
                            e.preventDefault();

                            let clone = document.querySelector('.clase-clone');
                            let clon = clone.cloneNode(true);
                            clon.setAttribute('data-clone',`${aux++}`);
                            clon.querySelector('.card-header').innerHTML =`<div><i class="bi bi-journal-bookmark-fill me-2"></i> Specialization ${aux}</div> <button type="button"class="button-cerrar btn fs-4"><i class="bi bi-x-lg font-color"></i></button>`;
                            clon.querySelector('.specialization-name').removeAttribute('readonly');
                            clon.querySelector('.specialization-name').removeAttribute('value');
                            container_node.appendChild(clon);
                

                        }) 

                      container_node.addEventListener('click',function(e){
                        e.preventDefault();
                        if(e.target.classList.contains('button-cerrar')){
                            aux--;
                            let contenedor = e.target.parentNode.parentNode;
                            contenedor.parentNode.removeChild(contenedor);
                        }
                      });      
                      eyepassword.addEventListener('click',function(e){
                          if(password.type === 'password'){
                            password.type = 'text'
                            eyeicon.classList.remove('bi-eye-slash-fill');
                            eyeicon.classList.add('bi-eye-fill');
                          }else{
                            password.type= 'password';
                            eyeicon.classList.add('bi-eye-slash-fill');
                            eyeicon.classList.remove('bi-eye-fill');
                          }

                      })  
                      }  

  
                      loading.style.display = 'none';




                      saveInfo(button.id);
  
                  })
  
  
              })
          }
      })
  
  }
  
  
function saveInfo(formId){

const home = document.querySelector('.home');
const option = document.querySelector(`#${home.dataset.idbutton}`);

const toastLiveExample = document.getElementById('liveToast'),
      toast_header = toastLiveExample.querySelector('.toast-header'),
      toast_warning = toastLiveExample.querySelector('.bi'),
      toast_messageup = toastLiveExample.querySelector('strong'),
      toast_body = toastLiveExample.querySelector('.toast-body');

      
const form = document.getElementById('form'),
      loadingform = form.querySelector('.spinner-border'),
      button = form.querySelectorAll('.btn'), 
      btn_close = form.querySelector('.button-close'),
      iconform = form.querySelector('.bi-floppy2-fill');  


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
            button.forEach(boton=>{
                boton.classList.add('disabled');
            })
            btn_close.classList.add('disabled');
            const formData = new FormData(this);

            let Specializations = new Map();
            let count = 0;



            const selectDataClone = document.querySelectorAll('div[data-clone]');

            selectDataClone.forEach(clone =>{
                const nameClone = clone.querySelector('.specialization-name');
                const priceClone = clone.querySelector('.price-specialization');
                const statusClone = clone.querySelector('.select-Status-specialization');

                let Specialization = new Map();

                Specialization.set('Price',priceClone.value);
                Specialization.set('Specialization',nameClone.value);
                Specialization.set('Status',statusClone.value);
                Specializations.set(count,Specialization);
                count++;
            })

            if(formId === 'addServices'){     
            setCollection('Services',formData)
                  .then((docId)=>{
                        // console.log("Documento guardado con ID:", docId);

                        button.forEach(boton=>{
                            boton.classList.remove('disabled');
                        })
                        btn_close.classList.remove('disabled');
                        loadingform.style.display='none';
                        iconform.style.display='flex';

                        btn_close.click();

                        toast_body.innerHTML = `Component created successfully`;
                        toast_messageup.innerHTML = `¡Success!`;
                        toast_warning.classList.add('bi-check2');
                        toast_warning.classList.remove('bi-cone-striped');
                        toast_warning.style.color = 'green';

                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                        toastBootstrap.show();
                        if(option){
                            option.click(); 
                        }
                  })
                  .catch(error=>{
                        // console.error("Error al guardar el documento:", error);

                        toast_warning.classList.remove('bi-check2');
                        toast_warning.classList.add('bi-cone-striped');
                        toast_warning.style.color = 'red';
                        toast_messageup.innerHTML = `¡Ups! something went wrong`;
                        toast_body.innerHTML= `Component could not be created su <br> error: ${error} `;
                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                        toastBootstrap.show();
                  })
            }
            if(formId === 'addDoctors'){
                  const email = document.querySelector('#Email_address');
                  const password = document.querySelector('#Password');

                  createUserWithEmailAndPassword(auth, email.value, password.value)
                  .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        const uid = user.uid;
                        user.getIdToken()
                              .then((idToken)=>{
                                    // console.log("Token de autenticación:", idToken);
                                    setCollection('Doctors',formData,idToken,uid,Specializations)
                                    .then((docId)=>{
                                        //   console.log("Documento guardado con ID:", docId);
                                            button.forEach(boton=>{
                                                boton.classList.remove('disabled');
                                            })
                                          btn_close.classList.remove('disabled');
                                          loadingform.style.display='none';
                                          iconform.style.display='flex';
                        
                                          btn_close.click();

                        
                                          toast_body.innerHTML = `Component created successfully`;
                                          toast_messageup.innerHTML = `¡Success!`;
                                          toast_warning.classList.add('bi-check2');
                                          toast_warning.classList.remove('bi-cone-striped');
                                          toast_warning.style.color = 'green';
                                          const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                                          toastBootstrap.show();
                                          if(option){
                                              option.click();
                                          }  
                                    })
                                    .catch(error=>{
                                          // console.error("Error al guardar el documento:", error);
                        
                                          toast_warning.classList.remove('bi-check2');
                                          toast_warning.classList.add('bi-cone-striped');
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
                        if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
                            message = 'Email is already used'
                        }
                        else if(error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
                            message = '(Weak Password). Password should have at Least 6 characters'
                        }

                        button.forEach(boton=>{
                            boton.classList.remove('disabled');
                        })
                        btn_close.classList.remove('disabled');
                        loadingform.style.display='none';
                        iconform.style.display='flex';

                        toast_warning.classList.remove('bi-check2');
                        toast_warning.classList.add('bi-cone-striped');
                        toast_warning.style.color = 'red';
                        toast_messageup.innerHTML = `¡Ups! something went wrong`;
                        toast_body.innerHTML= `Component could not be created su error:<br>${message} `;
                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                        toastBootstrap.show();
                  }); 

            }
            if(formId === 'addMedicines'){
            setCollection('Medicines',formData)
            .then((docId)=>{
                //   console.log("Documento guardado con ID:", docId);

                    button.forEach(boton=>{
                        boton.classList.remove('disabled');
                    })
                  btn_close.classList.remove('disabled');
                  loadingform.style.display='none';
                  iconform.style.display='flex';

                  btn_close.click();

                  toast_body.innerHTML = `Component created successfully`;
                  toast_messageup.innerHTML = `¡Success!`;
                  toast_warning.classList.add('bi-check2');
                  toast_warning.classList.remove('bi-cone-striped');
                  toast_warning.style.color = 'green';
                  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                  toastBootstrap.show()
                  if(option){
                      option.click();
                  }  
            })
            .catch(error=>{

                  toast_warning.classList.remove('bi-check2');
                  toast_warning.classList.add('bi-cone-striped');
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
      toast_warning = toastLiveExample.querySelector('i.bi'),
      toast_messageup = toastLiveExample.querySelector('strong'),
      toast_body = toastLiveExample.querySelector('.toast-body');

const option = document.querySelector(`#${home.dataset.idbutton}`);
if(rows){
      rows.forEach(row =>{
            row.addEventListener('click', function(event){
            if(event.target.classList.contains('btn-danger')){

                  loading.style.display = 'flex';
                  fetch('public/assets/pages/delete/delete.php',{
                        method: 'POST',
                        credentials: 'include',
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

                                        //   toast_body.innerHTML = `Component Deleted successfully <br> id: ${docId} `;
                                          toast_body.innerHTML = `Component deleted successfully`;
                                          toast_messageup.innerHTML = `¡Success!`;
                                          toast_warning.classList.add('bi-check2');
                                          toast_warning.classList.remove('bi-cone-striped');
                                          toast_warning.style.color = 'green';
                                          const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                                          toastBootstrap.show();
                                          if(option){
                                              option.click();
                                          }  
                                    })
                                    .catch(error=>{
                                          btn_delete.classList.remove('disabled');
                                          btn_close.classList.remove('disabled');
                                          btn_no.classList.remove('disabled');
                                          spinner_border.style.display = 'none';
                                          icon_border.style.display = 'block';

                                          toast_warning.classList.remove('bi-check2');
                                          toast_warning.classList.add('bi-cone-striped');
                                          toast_warning.style.color = 'red';
                                          toast_messageup.innerHTML = `¡Ups! something went wrong`;
                                          toast_body.innerHTML= `Component could not be deleted su <br> error: ${error} `;
                                          const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                                          toastBootstrap.show();
                                    })
                        })


                  })

            }
            else if(event.target.classList.contains('btn-primary') && home.dataset.idbutton === 'Doctors'){
                console.log('click en modify');
                loading.style.display = 'flex';
                fetch('public/assets/pages/modify/modifydoctors.php')
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
                    
                    getDocToupdate(home.dataset.idbutton,row.id)
                    .then(arrayInfo=>{
                        home.appendChild(added);
                        // console.log(arrayInfo);
                        const container_node = document.querySelector('#contenedor_node');

                        const formulario = document.querySelector('#form'),
                              FirstName = formulario.querySelector('#name'),
                              LastName = formulario.querySelector('#lastName'),
                              documentId = formulario.querySelector('#Document'),
                              emailAddres = formulario.querySelector('#Email_address'),
                              contacto = formulario.querySelector('#Contact'),
                              dateofBirth = formulario.querySelector('#dob'),
                              addressField = formulario.querySelector('#Address'),
                              experiencieYears = formulario.querySelector('#Experience'),
                              statusSelect = formulario.querySelector('#select-Status'),
                              genderSelect = formulario.querySelector('#select-Gender'),
                              addNode = formulario.querySelector('.btn-add-new-node'),
                              loadingform = formulario.querySelector('.spinner-border'),
                              button = formulario.querySelectorAll('.btn'), 
                              btn_close = formulario.querySelector('.button-close'),
                              iconform = formulario.querySelector('.bi-floppy2-fill'); 
                        const clase_clone = document.querySelector('.clase-clone'),
                              status_specialization = clase_clone.querySelector('#StatusSpecialization'),
                              fee_specialization = clase_clone.querySelector('#howMuch');
                        console.log(arrayInfo.Specializations[0].Price);
                        FirstName.value = arrayInfo.FirstName;  
                        LastName.value = arrayInfo.LastName;
                        documentId.value = arrayInfo.DocumentID;
                        emailAddres.value = arrayInfo.Email;
                        contacto.value = arrayInfo.Contact;
                        dateofBirth.value = arrayInfo.Dob;
                        addressField.value = arrayInfo.Address;
                        experiencieYears.value = arrayInfo.Experience;
                        fee_specialization.value = arrayInfo.Specializations[0].Price;                            
                        const statusForSpecialization = arrayInfo.Specializations[0].Status;                            

                        const genderSelected = arrayInfo.Gender;
                        const statusSelected = arrayInfo.Status;
                        const numberOfspecializations = Object.keys(arrayInfo.Specializations).length;
                        let auxSpecializations = numberOfspecializations;

                        for(let h = 0;h<=status_specialization.options.length;h++){
                            if(status_specialization.options[h].value == statusForSpecialization){
                                status_specialization.selectedIndex = h;
                                console.log('entro');
                                break;
                            }
                        }

                        for(let i = 0; i< genderSelect.options.length;i++){
                            if (genderSelect.options[i].value === genderSelected) {
                                genderSelect.selectedIndex = i;
                                break;
                            }
                        }
                        for(let j = 0; j< statusSelect.options.length;j++){
                            if (statusSelect.options[j].value === statusSelected) {
                                statusSelect.selectedIndex = j;
                                break;
                            }
                        }
                        addNode.addEventListener('click',function(e){
                            e.preventDefault();

                            let clon = clase_clone.cloneNode(true);
                            clon.setAttribute('data-clone',`${auxSpecializations++}`);
                            clon.querySelector('.card-header').innerHTML =`<div><i class="bi bi-journal-bookmark-fill me-2"></i> Specialization ${auxSpecializations}</div> <button type="button"class="button-cerrar btn fs-4"><i class="bi bi-x-lg font-color"></i></button>`;
                            clon.querySelector('.specialization-name').removeAttribute('readonly');
                            clon.querySelector('.specialization-name').removeAttribute('value');
                            clon.querySelector('#howMuch').value = "";
                            container_node.appendChild(clon);
                

                        })
                        container_node.addEventListener('click',function(e){
                            e.preventDefault();
                            if(e.target.classList.contains('button-cerrar')){
                                auxSpecializations--;
                                let contenedor = e.target.parentNode.parentNode;
                                contenedor.parentNode.removeChild(contenedor);
                            }
                          });   


                        if (numberOfspecializations > 1) {
                            for (let i = 1; i < numberOfspecializations; i++) {                            
                                let clon = clase_clone.cloneNode(true);
                                clon.setAttribute('data-clone', `${i}`);
                                
                                // Construir la cadena de texto para el .card-header
                                const cardHeaderContent = `<div><i class="bi bi-journal-bookmark-fill me-2"></i> Specialization ${i + 1}</div> <button type="button" class="button-cerrar btn fs-4"><i class="bi bi-x-lg font-color"></i></button>`;
                                
                                clon.querySelector('.card-header').innerHTML = cardHeaderContent;
                                clon.querySelector('.specialization-name').removeAttribute('readonly');
                                clon.querySelector('#specialization').value = arrayInfo.Specializations[i].Specialization;
                                clon.querySelector('#howMuch').value = arrayInfo.Specializations[i].Price;
                                
                                const statusForSpecialization = arrayInfo.Specializations[i].Status;   
                                const status = clon.querySelector('#StatusSpecialization');
                                
                                for (let h = 0; h < status.options.length; h++) {
                                    if (status.options[h].value == statusForSpecialization) {
                                        status.selectedIndex = h;
                                        console.log('entro');
                                        break;
                                    }
                                }
                                container_node.appendChild(clon);
                                
                            }  
                        }
                        

                        loading.style.display = 'none';


                        formulario.addEventListener('submit',function(e){
                            if (!formulario.checkValidity()) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                            else{
                                e.preventDefault();
                                e.stopPropagation();
                                loadingform.style.display='flex';
                                iconform.style.display='none';
                                button.forEach(boton=>{
                                    boton.classList.add('disabled');
                                })
                                // button.classList.add('disabled');
                                btn_close.classList.add('disabled');
                                const formData = new FormData(this);

                                let Specializations = new Map();
                                let count = 0;

                                const selectDataClone = document.querySelectorAll('div[data-clone]');


                                selectDataClone.forEach(clone =>{
                                    const nameClone = clone.querySelector('.specialization-name');
                                    const priceClone = clone.querySelector('.price-specialization');
                                    const statusClone = clone.querySelector('.select-Status-specialization');
                    
                                    let Specialization = new Map();
                    
                                    Specialization.set('Price',priceClone.value);
                                    Specialization.set('Specialization',nameClone.value);
                                    Specialization.set('Status',statusClone.value);
                                    Specializations.set(count,Specialization);
                                    count++;
                                })

                                updateDocument(home.dataset.idbutton,formData,row.id,Specializations)
                                    .then(()=>{
                                        button.forEach(boton=>{
                                            boton.classList.remove('disabled');
                                        })
                                        // button.classList.add('disabled');
                                        btn_close.classList.remove('disabled');
                                        loadingform.style.display='none';
                                        iconform.style.display='flex';

                                        btn_close.click();
                                        if(option){
                                            option.click();
                                        }

                                        toast_body.innerHTML = `Component Modified successfully`;
                                        toast_messageup.innerHTML = `¡Success!`;
                                        toast_warning.classList.add('bi-check2');
                                        toast_warning.classList.remove('bi-cone-striped');
                                        toast_warning.style.color = 'green';
                                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                                        toastBootstrap.show();
                                    })
                                    .catch(error=>{
                                        console.log(error);

                                        toast_warning.classList.remove('bi-check2');
                                        toast_warning.classList.add('bi-cone-striped');
                                        toast_warning.style.color = 'red';
                                        toast_messageup.innerHTML = `¡Ups! something went wrong`;
                                        toast_body.innerHTML= `Component could not be modified su <br> error: ${error} `;
                                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                                        toastBootstrap.show();


                                        loadingform.style.display='none';

                                        btn_close.click();
                                        if(option){
                                            option.click();
                                        }
                                    })
                            }
                          formulario.classList.add('was-validated');
                        },false);
                    })
                    .catch(error=>{

                    })
                })
            }
            else if(event.target.classList.contains('btn-primary') && home.dataset.idbutton === 'Medicines'){
                loading.style.display = 'flex';
                fetch('public/assets/pages/modify/modifymedicines.php',{
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

                    getDocToupdate(home.dataset.idbutton,row.id)
                    .then(data=>{
                        home.appendChild(added);
                        loading.style.display = 'none';

                        const formulario = document.querySelector('#form'),
                              price_medicine= formulario.querySelector('.col-12 #price_id'),
                              name_medicine = formulario.querySelector('#medicine_name'),
                              composition_medicine = formulario.querySelector('#composition_id'),
                              quantity_medicine = formulario.querySelector('#quantity_id'),
                              delivery_medicine = formulario.querySelector('#delivery_id'),
                              status_medicine = formulario.querySelector('#selectStatus'),
                              loadingform = formulario.querySelector('.spinner-border'),
                              button = formulario.querySelectorAll('.btn'), 
                              btn_close = formulario.querySelector('.button-close'),
                              iconform = formulario.querySelector('.bi-floppy2-fill'); 
                        // console.log(data.Price.stringValue);      
                        name_medicine.value = data.Name.stringValue;
                        price_medicine.value = data.Price.stringValue;
                        composition_medicine.value = data.Composition.stringValue;
                        quantity_medicine.value = data.Quantity.stringValue;
                        delivery_medicine.value = data.Delivery.stringValue;
                        
                        const status_medicine_inicial = data.Available.stringValue;
                        
                        for(let i=0; i<=status_medicine.options.length; i++){
                            if(status_medicine.options[i].value === status_medicine_inicial){
                                status_medicine.selectedIndex = i;
                                break;
                            }
                        }
                        formulario.addEventListener('submit',function(e){
                            if (!formulario.checkValidity()) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                            else{
                                e.preventDefault();
                                e.stopPropagation();
                                loadingform.style.display='flex';
                                iconform.style.display='none';
                                button.forEach(boton=>{
                                    boton.classList.add('disabled');
                                })
                                // button.classList.add('disabled');
                                btn_close.classList.add('disabled');
                                const formData = new FormData(this);

                                updateDocument(home.dataset.idbutton,formData,row.id)
                                    .then(()=>{
                                        button.forEach(boton=>{
                                            boton.classList.remove('disabled');
                                        })
                                        // button.classList.add('disabled');
                                        btn_close.classList.remove('disabled');
                                        loadingform.style.display='none';
                                        iconform.style.display='flex';

                                        btn_close.click();
                                        if(option){
                                            option.click();
                                        }

                                        toast_body.innerHTML = `Component Modified successfully`;
                                        toast_messageup.innerHTML = `¡Success!`;
                                        toast_warning.classList.add('bi-check2');
                                        toast_warning.classList.remove('bi-cone-striped');
                                        toast_warning.style.color = 'green';
                                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                                        toastBootstrap.show();

                                    })
                                    .catch(error=>{

                                        toast_warning.classList.remove('bi-check2');
                                        toast_warning.classList.add('bi-cone-striped');
                                        toast_warning.style.color = 'red';
                                        toast_messageup.innerHTML = `¡Ups! something went wrong`;
                                        toast_body.innerHTML= `Component could not be modified su <br> error: ${error} `;
                                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                                        toastBootstrap.show();


                                        loadingform.style.display='none';

                                        btn_close.click();
                                        if(option){
                                            option.click();
                                        }

                                    })

                            }
                            formulario.classList.add('was-validated');
                        },false);   

                    });
                    
                })
            }
            else if(event.target.classList.contains('btn-primary') && home.dataset.idbutton === 'Services'){
                loading.style.display = 'flex';
                fetch('public/assets/pages/modify/modifyservices.php',{
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

                    getDocToupdate(home.dataset.idbutton,row.id)
                    .then(service=>{
                        home.appendChild(added)
                        loading.style.display = 'none';


                        const formulario = document.querySelector('#form'),
                            name_service = formulario.querySelector('#name_service'),
                            status_service = formulario.querySelector('#selectStatus'),
                            loadingform = formulario.querySelector('.spinner-border'),
                            button = formulario.querySelectorAll('.btn'), 
                            btn_close = formulario.querySelector('.button-close'),
                            iconform = formulario.querySelector('.bi-floppy2-fill'); 

                        name_service.value = service.name.stringValue;
                        const status_service_init = service.available.stringValue;

                        for(let i=0; i<=status_service.options.length; i++){
                            if(status_service.options[i].value === status_service_init){
                                status_service.selectedIndex = i;
                                break;
                            }
                        }

                        formulario.addEventListener('submit',function(e){
                            if (!formulario.checkValidity()) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                            else{
                                e.preventDefault();
                                e.stopPropagation();

                                loadingform.style.display='flex';
                                iconform.style.display='none';
                                button.forEach(boton=>{
                                    boton.classList.add('disabled');
                                })
                                // button.classList.add('disabled');
                                btn_close.classList.add('disabled');
                                const formData = new FormData(this);

                                updateDocument(home.dataset.idbutton,formData,row.id)
                                .then(()=>{
                                    button.forEach(boton=>{
                                        boton.classList.remove('disabled');
                                    })
                                    // button.classList.add('disabled');
                                    btn_close.classList.remove('disabled');
                                    loadingform.style.display='none';
                                    iconform.style.display='flex';

                                    btn_close.click();
                                    if(option){
                                        option.click();
                                    }

                                    toast_body.innerHTML = `Component Modified successfully`;
                                    toast_messageup.innerHTML = `¡Success!`;
                                    toast_warning.classList.add('bi-check2');
                                    toast_warning.classList.remove('bi-cone-striped');
                                    toast_warning.style.color = 'green';
                                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                                    toastBootstrap.show();


                                })
                                .catch(error=>{
                                    toast_warning.classList.remove('bi-check2');
                                    toast_warning.classList.add('bi-cone-striped');
                                    toast_warning.style.color = 'red';
                                    toast_messageup.innerHTML = `¡Ups! something went wrong`;
                                    toast_body.innerHTML= `Component could not be modified su <br> error: ${error} `;
                                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
                                    toastBootstrap.show();


                                    loadingform.style.display='none';

                                    btn_close.click();
                                    if(option){
                                        option.click();
                                    }
                                })

                            }


                            formulario.classList.add('was-validated');
                        },false)       
                        
                    })


                })
                .catch(error=>{

                })
            }
            })
      })
}
}


export function validateEmail(email) {
    // Expresión regular para validar un email
    var patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronEmail.test(email);
}

