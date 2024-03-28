import { initializateGraph,initializateGraphApp,initializateGraphStatus,initializateGraphBills } from "../graph/graph.min.js";
import { clickAdd ,activateTooltips} from "../dashboard/dashboard.min.js";
document.addEventListener('DOMContentLoaded',function(e){

loadDash();


})


const home = document.querySelector('.home');
const loading = document.querySelector('.spinner');
const datos = document.createElement('div');
datos.classList.add('data_from_db');
// const heightContent = "55vh";
loading.style.display= "flex";

function loadDash(){
    loading.style.display = "none";
    fetch(`public/assets/pages/dashboard/dashboard.php`)
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
      activateTooltips();
      initializateGraph('myChart');  
      initializateGraphApp('myChartApp');
      initializateGraphStatus('myChartAppointments');
      initializateGraphBills('myChartBills');
      clickAdd();
    })
    .catch(error=>{
      console.log(error);
    })
}