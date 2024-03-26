<?php  
  if(!isset($_COOKIE['token'])){

    header('Location: /');
    exit;

  }


?>



<?php require 'public/assets/pages/header/header.php'?>

<body>


<div class="container-fluid d-flex justify-content-center align-items-center p-0">
<div class="container-fluid p-0">


  <nav class="side-bar close shadow">
      <header>
        <div class="image-text">
          <span class="image">
            <picture>
              <source srcset="public/images/logo-arucare.avif" type="image/avif">
              <source srcset="public/images/logo-arucare.webp" type="image/webp">
            
              <img src="public/images/logo-arucare.png" alt="logo">
            </picture>
          </span>

          <div class="text header-text">
            <span class="name">Arucare</span>
            <span class="profession">Health Care</span>
          </div>
        </div>
        
        
        <i class="bi bi-arrow-right-short toogle"></i>
      </header>

      <div class="menu-bar">
        <div class="menu">
            <!-- <li class="search-box" id="search"  data-bs-toggle="tooltip" data-bs-placement="right" title="Search">
              <i class="bi bi-search icono"></i>
              <input type="search" placeholder="Search...">
            </li> -->
            <ul class="menu-links p-0">
              <li class="nav-link">
                <button  type="button" id="Dashboard" class="btn link" data-bs-toggle="tooltip" data-bs-placement="right" title="Dashboard">
                  <i class="bi bi-house-door-fill icono "></i>
                  <span class="text nav-text">Dashboard</span>
                </button>
              </li>
              <li class="nav-link">
                <button  type="button" id="Doctors" class="btn link"  data-bs-toggle="tooltip" data-bs-placement="right" title="Doctors">
                  <i class="bi bi-file-person icono "></i>
                  <span class="text nav-text">Doctors</span>
                </button>
              </li>
              <li class="nav-link">
                <button type="button" id="Patients" class="btn link"  data-bs-toggle="tooltip" data-bs-placement="right" title="Patients">
                <i class="bi bi-person-lines-fill icono"></i>
                  <span class="text nav-text">Patients</span>
                </button>
              </li>
              <li class="nav-link">
                <button id="Appointments" class="btn link"  data-bs-toggle="tooltip" data-bs-placement="right" title="Appointments">
                <i class="bi bi-file-earmark-medical-fill icono"></i>
                  <span class="text nav-text">Apointment</span>
                </button>
              </li>
              <li class="nav-link">
                <button id="Medicines" class="btn link"  data-bs-toggle="tooltip" data-bs-placement="right" title="Medicines">
                  <i class="bi bi-capsule icono"></i>
                  <span class="text nav-text">Medicines</span>
                </button>
              </li>
              <li class="nav-link" >
                <button id="Services" class="btn link"  data-bs-toggle="tooltip" data-bs-placement="right" title="Services">
                <i class="bi bi-hospital-fill icono"></i>
                  <span class="text nav-text">Services</span>
                </button>
              </li>
            </ul>
          </div>


          <div class="bottom-content">
            <li class="">
                <a  id="Logout" class="btn link"  data-bs-toggle="tooltip" data-bs-placement="right" title="Logout">
                <i class="bi bi-box-arrow-left icono"></i>
                  <span class="text nav-text">Logout</span>
                </a>
            </li>
            <li class="mode"  data-bs-toggle="tooltip" data-bs-placement="right" title="Dark/Light Mode">
                <div class="moon-sun">
                  <i class="bi bi-moon-stars-fill icono moon"></i>
                  <i class="bi bi-sun-fill icono sun"></i>
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


        <div class="toast-container position-fixed bottom-0 start-50 translate-middle-x p-5">
          <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header fs-2">
                <i class='bi bi-check2 rounded me-2 fs-1 fw-bolder' style="color:green;"></i>
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