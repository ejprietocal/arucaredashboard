<?php

if(!isset($_COOKIE['token'])){

    header('Location: /');
    exit;

  }

?>


<div class="home-container ">
      <h1 class="font-color">Dashboard Arucare</h1>
      <hr class="font-color">

      <div class="container-graphs">
        <div class="card contain-graph patients-container p-2 rounded shadow position-relative">
          <div class="card-header d-flex align-items-center justify-content-between fs-2" style="height:5rem">
            ShortCuts
          </div>
          <div class="card-body d-flex flex-column gap-5 justify-content-evenly">
            <span id="addDoctors" type="button" class="add-button col-12 text-center h-25 fs-3 back-color-inverse p-3 rounded-4 d-flex align-items-center justify-content-center"><i class="bi bi-file-person text-white fs-2 me-3"></i><span class="text-white">Add Doctor</span></span>
            <span id="addServices" type="button" class="add-button col-12 text-center h-25 fs-3 back-color-inverse p-3 rounded-4 d-flex align-items-center justify-content-center"><i class="bi bi-hospital-fill text-white fs-2 me-3"></i><span class="text-white">Add Service</span></span>
            <span id="addMedicines" type="button" class="add-button col-12 text-center h-25 fs-3 back-color-inverse p-3 rounded-4 d-flex align-items-center justify-content-center"><i class="bi bi-capsule text-white fs-2 me-3"></i><span class="text-white">Add Medicine</span></span>
          </div>
        </div>
        <div class="card contain-graph patients-container p-2 rounded shadow position-relative">
          <div class="card-header d-flex align-items-center justify-content-between fs-2" style="height:5rem">
            <span>Total Amounth Of Users</span>
            <i class="icono_refresh bi bi-arrow-repeat"></i>
          </div>
          <canvas id="myChart" class="graph-data p-4"></canvas>
          <div class="cargando loading align-items-center justify-content-center position-absolute top-50 start-50 translate-middle" style="display:flex;width:10rem;height:10rem;">
            <div class="spinner-border text-primary w-75 h-75" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div class="card contain-graph patients-container p-2 rounded shadow position-relative">
          <div class="card-header d-flex align-items-center justify-content-between fs-4" style="height:5rem">

            <span>Amounth Of Appointments Per Month (Last two years)</span>
            <i class="icono_refresh bi bi-arrow-repeat fs-2"></i>
          </div>
          <canvas id="myChartApp" class="graph-data p-4"></canvas>
          <div class="cargando loading2 align-items-center justify-content-center position-absolute top-50 start-50 translate-middle" style="display:flex;width:10rem;height:10rem;">
            <div class="spinner-border text-primary w-75 h-75" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div class="card contain-graph patients-container p-2 rounded shadow position-relative">
          <div class="card-header d-flex align-items-center justify-content-between fs-2" style="height:5rem">
           <span>Appointment's status</span>   
            <i class="icono_refresh bi bi-arrow-repeat"></i>
          </div>
          <canvas id="myChartAppointments" class="graph-data p-4"></canvas>
          <div class="cargando loading3 align-items-center justify-content-center position-absolute top-50 start-50 translate-middle" style="display:flex;width:10rem;height:10rem;">
            <div class="spinner-border text-primary w-75 h-75" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div class="card contain-graph patients-container p-2 rounded shadow position-relative">
          <div class="card-header d-flex align-items-center justify-content-between fs-2" style="height:5rem">
            <span>Bills status</span>
            <i class="icono_refresh bi bi-arrow-repeat"></i>
          </div>
          <canvas id="myChartBills" class="graph-data p-4"></canvas>
          <div class="cargando loading4 align-items-center justify-content-center position-absolute top-50 start-50 translate-middle" style="display:flex;width:10rem;height:10rem;">
            <div class="spinner-border text-primary w-75 h-75" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
</div>
