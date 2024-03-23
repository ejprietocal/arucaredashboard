import { getAmountOf ,getAmountAppointmentsUserPerMonth} from "../../../database/firebase/conexion.js";


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
            // console.log(patients, doctors, appointments);

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
                            '#707070',
                            'rgba(32, 176, 255, 0.39)',
                            '#36187d',
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

    const loadingAppointments = document.querySelector('div.loading2');

    getAmountAppointmentsUserPerMonth()
    .then(dataInfo => {
        const labels = []; // Para almacenar las etiquetas de los meses
        const chartData = [];

        function getMonthName(month) {
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            return monthNames[parseInt(month, 10) - 1];
        }

        // Generar todas las etiquetas de los meses
        for (let month = 1; month <= 12; month++) {
            const monthString = month.toString().padStart(2, '0');
            const monthName = getMonthName(monthString);
            labels.push(monthName); // Añadir la etiqueta del mes
        }

        for (let year in dataInfo) {
            const data = [];

            // Inicializar todos los meses con un valor de 0
            const initialData = Array(12).fill(0);

            // Actualizar los meses con los datos reales si están disponibles
            for (let month = 1; month <= 12; month++) {
                const monthString = month.toString().padStart(2, '0');
                if (dataInfo[year][monthString]) {
                    initialData[month - 1] = dataInfo[year][monthString];
                }
            }
            chartData.push({
                label: year,
                backgroundColor: year === Object.keys(dataInfo)[0] ? '#36187d' : '#0196e3', // Color azul para el primer año y rojo para el segundo año
                borderColor: year === Object.keys(dataInfo)[0] ? '#36187d' : '#0196e3',
                borderWidth: 1,
                data: initialData
            });
        }

        const options = {
            aspectRatio: 1,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: chartData
            },
            options: options
        });
            loadingAppointments.style.display = "none";
        

        })
        .catch(error=>{
            throw error;
        })
        

}