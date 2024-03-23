<?php

if(!isset($_COOKIE['token'])){

    header('Location: /');
    exit;

  }

?>


<form id="form" action="POST" class="alert  alert-dismissible fade show animate__bounceIn shadow needs-validation" role="alert" novalidate>
  <button type="button" class="button-close btn-close" data-bs-dismiss="alert" data-bs-target=".createContainer" aria-label="Close"></button>
  <strong class="fs-2">Service Creation</strong>


    <div class="container container-services">
        <div class="mb-3 w-100">
            <div class="col-12 position-relative">
                <label for="exampleFormControlExperience" class="form-label">Name</label>
                <input name="name" type="text" class="form-control" id="exampleFormControlExperience" placeholder="Service Name" required>
                <div class="valid-tooltip">
                Looks good!
                </div>
                <div class="invalid-tooltip">
                    Please Enter a Name.
                </div>
            </div>
        </div>

        <div class="mb-3 w-100">
            <div class="col-12 position-relative">
                <label for="selectStatus" class="form-label">Status</label>
                <select name="available" id="selectStatus"class="form-select" aria-label="Default select example" required>
                    <option selected disabled value="">Status</option>
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                </select>
                <div class="valid-tooltip">
                    Looks good!
                </div>
                <div class="invalid-tooltip">
                    Please Select a Status.
                </div>
            </div>
        </div>
    </div>
  
    <!-- <input type="hidden" value="true" name="Services">   -->
    <button type="submit" class="btn btn-primary fs-3 d-flex align-items-center gap-2">
      <span class="spinner-border" aria-hidden="true" style="display:none;"></span>
      <i class='bx bxs-save' style="display:flex;"></i>
      <span role="status">Save Service</i></span>
    <!-- Save Doctor <i class='bx bxs-save' ></i> -->
  </button>
</form>
