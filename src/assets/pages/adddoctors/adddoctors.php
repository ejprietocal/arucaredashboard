<form id="form" class="alert  alert-dismissible fade show animate__bounceIn shadow" role="alert">
  <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target=".createContainer" aria-label="Close"></button>
  <strong class="fs-2">Doctor Creation</strong>

  <div class="container">
    <div class="mb-3 w-100">
        <label for="FormControlInputName" class="form-label">First Name</label>
        <input type="text" class="form-control" id="FormControlInputName" placeholder="Type your first Name">
     </div>
    <div class="mb-3 w-100">
      <label for="FormControlInputLastName" class="form-label">Last Name</label>
      <input type="text" class="form-control" id="FormControlInputLastName" placeholder="Type your Last Name">
    </div>

    <div class="mb-3 w-100">
      <label for="FormControlInputDocument" class="form-label">Document Id</label>
      <input type="number" class="form-control" id="FormControlInputDocument" placeholder="Type your ID here">
    </div>
  </div>

  <div class="container">
    <div class="mb-3 w-100">
      <label for="exampleFormControlInput1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
    </div>
    <div class="mb-3 w-100">
      <label for="exampleFormControlContact" class="form-label">Contact</label>
      <input type="text" class="form-control" id="exampleFormControlContact" placeholder="Contact">
    </div>
      
    <div class="mb-3 w-100">
      <label for="exampleFormControlDOB" class="form-label">Date of Birth </label>
      <input type="date" class="form-control" id="exampleFormControlDOB" placeholder="">
    </div>
  </div>

  <div class="container">
    <div class="mb-3 w-100">
      <label for="exampleFormControlExperience" class="form-label">Experience</label>
      <input type="text" class="form-control" id="exampleFormControlExperience" placeholder="Experience">
    </div>
    <div class="mb-3 w-100">
      <label for="exampleFormControlAddress" class="form-label">Address</label>
      <input type="text" class="form-control" id="exampleFormControlAddress" placeholder="Address">
    </div>
  </div>


  <div class="container">
    <div class="mb-3 w-100">
      <label for="exampleFormControlPassword" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleFormControlPassword" placeholder="Password">
    </div>
    <div class="mb-3 w-100">
      <label for="selectGender" class="form-label">Gender</label>
      <select id="selectGender"class="form-select" aria-label="Default select example">
        <option selected disabled>Gender</option>
        <option value="1">Male</option>
        <option value="2">Female</option>
        <option value="3">Other</option>
      </select>
      </div>
    <div class="mb-3 w-100">
      <label for="selectStatus" class="form-label">Status</label>
      <select id="selectStatus"class="form-select" aria-label="Default select example">
        <option selected disabled>Status</option>
        <option value="1">Active</option>
        <option value="2">Inactive</option>
        <!-- <option value="3">Other</option> -->
      </select>
    </div>
  </div>

  
  
  <button type="submit" class="btn btn-primary disabled">Save Doctor <i class='bx bxs-save' ></i></button>
</form>
