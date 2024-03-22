<div class="home-container ">
      <h1 class="font-color">Dashboard Arucare</h1>
      <hr class="font-color">

      <div class="container-graphs">
        <div class="card contain-graph patients-container p-2 rounded shadow position-relative">
          <div class="card-header">
            Total Amounth Of Users
          </div>
          <canvas id="myChart" class="graph-data p-4"></canvas>
          <div class="loading align-items-center justify-content-center position-absolute top-0 w-100 h-100" style="display:flex;">
            <div class="spinner-grow text-primary w-50 h-50" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>

        <div class="card contain-graph patients-container p-2 rounded shadow position-relative">
          <div class="card-header">
            Total Amounth Of Appointments Per Month
          </div>
          <canvas id="myChartApp" class="graph-data p-4"></canvas>
          <div class="loading2 align-items-center justify-content-center position-absolute top-0 w-100 h-100" style="display:none;">
            <div class="spinner-grow text-primary w-50 h-50" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
</div>
