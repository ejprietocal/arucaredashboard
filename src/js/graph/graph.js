import { getAmountOf } from "../../../database/firebase/conexion.js";


export function initializateGraph(mychart) {
    const ctx = document.getElementById(`${mychart}`);

    // Promesas para obtener la cantidad de pacientes, doctores y citas
    const patientsPromise = getAmountOf('Patients');
    const doctorsPromise = getAmountOf('Doctors');
    const appointmentsPromise = getAmountOf('Appointments');
    const loadingPatient = document.querySelector('.patients-container > .loading')

    // Esperar que todas las promesas se resuelvan
    Promise.all([patientsPromise, doctorsPromise, appointmentsPromise])
        .then(([patients, doctors, appointments]) => {
            console.log(patients, doctors, appointments);

            // Crear el gráfico una vez que todas las asignaciones se hayan completado
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Patients', 'Doctors', 'Appointments'],
                    datasets: [{
                        label: '# of Elements',
                        data: [patients, doctors, appointments],
                        borderWidth: 1,
                        backgroundColor:[
                            'rgba(32, 176, 46, 0.39)',
                            'rgba(32, 176, 255, 0.39)',
                            'rgba(255, 0, 0, 0.39)',
                            // 'rgba(32, 176, 46, 0.39)',
                        ]
                            


                    }]
                },
                options: {
                    responsive:true,
                    scales: {
                        x: {
                           display:false
                        },
                        y:{
                            display:false
                        }
                    },
                    plugins: {
                        legend:{
                            labels:{
                                color: 'black'
                            },
                        },
                    },
                },


            });

            loadingPatient.style.display='none';
        })
        .catch(error => {
            console.log(error);
        });
}


export function initializateGraphApp(mychart){

    const ctx = document.getElementById(`${mychart}`);


}