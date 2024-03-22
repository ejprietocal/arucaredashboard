<?php require 'public/assets/pages/header/header.php'?>

<body>


<div class="container-fluid d-flex justify-content-center align-items-center p-0">
<div class="container-fluid p-0">


  <nav class="side-bar close shadow">
      <header>
        <div class="image-text">
          <span class="image">
            <picture>
              <source srcset="/public/images/logo-arucare.avif" type="image/avif">
              <source srcset="/public/images/logo-arucare.webp" type="image/webp">
            
              <img src="/public/images/logo-arucare.png" alt="logo">
            </picture>
          </span>

          <div class="text header-text">
            <span class="name">Arucare</span>
            <span class="profession">Health Care</span>
          </div>
        </div>
        
        
        <i class='bx bx-chevron-right toogle'></i>
      </header>

      <div class="menu-bar">
        <div class="menu">
            <li class="search-box" id="search"  data-bs-toggle="tooltip" data-bs-placement="right" title="Search">
              <i class='bx bx-search icono'></i>
              <input type="search" placeholder="Search...">
            </li>
            <ul class="menu-links p-0">
              <li class="nav-link">
                <a href="#" id="Dashboard" class="link" data-bs-toggle="tooltip" data-bs-placement="right" title="Dashboard">
                  <i  type="button" class='bx bxs-home icono'></i>
                  <span class="text nav-text">Dashboard</span>
                </a>
              </li>
              <li class="nav-link">
                <a href="#" id="Doctors" class="link"  data-bs-toggle="tooltip" data-bs-placement="right" title="Doctors">
                <i class='bx bxs-shield-plus icono'></i>
                  <span class="text nav-text">Doctors</span>
                </a>
              </li>
              <li class="nav-link">
                <a href="#" id="Patients" class="link"  data-bs-toggle="tooltip" data-bs-placement="right" title="Patients">
                <i class='bx bx-user-check icono'></i>
                  <span class="text nav-text">Patients</span>
                </a>
              </li>
              <li class="nav-link">
                <a href="#"  id="Appointments" class="link"  data-bs-toggle="tooltip" data-bs-placement="right" title="Appointments">
                <i class='bx bx-plus-medical icono'></i>
                  <span class="text nav-text">Apointment</span>
                </a>
              </li>
              <li class="nav-link">
                <a href="#"  id="Medicines" class="link"  data-bs-toggle="tooltip" data-bs-placement="right" title="Medicines">
                   <i class='bx bxs-capsule icono'></i>
                  <span class="text nav-text">Medicines</span>
                </a>
              </li>
              <li class="nav-link" >
                <a href="#"id="Services" class="link"  data-bs-toggle="tooltip" data-bs-placement="right" title="Services">
                <i class="bi bi-hospital-fill icono"></i>
                  <span class="text nav-text">Services</span>
                </a>
              </li>
            </ul>
          </div>


          <div class="bottom-content">
            <li class="">
                <a href="#" id="Logout" class="link"  data-bs-toggle="tooltip" data-bs-placement="right" title="Logout">
                <i class="bx bx-log-out icono"></i>
                  <span class="text nav-text">Logout</span>
                </a>
            </li>
            <li class="mode"  data-bs-toggle="tooltip" data-bs-placement="right" title="Dark/Light Mode">
                <div class="moon-sun">
                  <i class="bx bx-moon icono moon"></i>
                  <i class="bx bx-sun icono sun"></i>
                </div>
    
                <span class="mode-text text">Dark mode</span>
    
    
                <div class="toogle-switch ">
                    <span class="switch">
    
                    </span>
                </div>
            </li>
          </div>
      </div>
  </nav>


  <section class="home">
        <!-- <div class="home-container ">
              <h1 class="font-color">Dashboard Arucare</h1>
              <hr class="font-color">

              <div class="container-graphs">
                <div class="contain-graph patients-container p-2 rounded shadow position-relative">
                  <canvas id="myChart" class="graph-data p-4"></canvas>
                  <div class="loading align-items-center justify-content-center position-absolute top-0 w-100 h-100" style="display:flex;">
                    <div class="spinner-grow text-primary w-50 h-50" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
        </div> -->
        


        <div class="spinner position-absolute top-0 w-100 justify-content-center align-items-center" style="display:none">
        <div class="loadingio-spinner-spinner-a1cop02ybag"><div class="ldio-caqhl4ym1gi">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div></div>
        </div>


        <div class="toast-container position-fixed top-0 end-0 p-3">
          <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header fs-2">
                <i class='bx bx-check rounded me-2 fs-1 fw-bolder' style="color:green;"></i>
              <strong class="me-auto">¡Success!</strong>
              <small>Now</small>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body fs-3" style="height:fit-content">
                Component created successfully
            </div>
          </div>
        </div>

  </section>

</div>



</div>            

<div class="spinner spinner_extern position-fixed top-0 w-100 justify-content-center align-items-center" style="display:none">
<div class="loadingio-spinner-spinner-a1cop02ybag"><div class="ldio-caqhl4ym1gi">
<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
</div></div>
</div>

    
</body>
<?php require 'public/assets/pages/footer/footerdash.php'?>
</html>