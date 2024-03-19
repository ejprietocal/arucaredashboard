<form id="form" action='POST' class="alert  position-relative alert-dismissible fade show animate__bounceIn shadow needs-validation" novalidate>
  <button type="button" class="button-close btn-close" data-bs-dismiss="alert" data-bs-target=".createContainer" aria-label="Close"></button>
  <strong class="fs-2">Doctor Creation</strong>

  <div class="container">
    <div class="mb-3 w-100">
          <div class="col-12 position-relative">
            <label for="name" class="form-label">First Name</label>
            <input name="FirstName"type="text" class="form-control" id="name" placeholder="Type your first Name" required>
            <div class="valid-tooltip">
              Looks good!
            </div>
            <div class="invalid-tooltip">
              Please choose a First Name.
            </div>
          </div>
    </div>
    
    <div class="mb-3 w-100">
        <div class="col-12 position-relative">
          <label for="lastName" class="form-label">Last Name</label>
          <input name="LastName" type="text" class="form-control" id="lastName" placeholder="Type your Last Name" required>
          <div class="valid-tooltip">
              Looks good!
            </div>
            <div class="invalid-tooltip">
              Please choose a Last Name.
          </div>
        </div>
    </div>
    <div class="mb-3 w-100">
      <div class="col-12 position-relative">
        <label for="Document" class="form-label">Document Id</label>
        <input name="DocumentID" type="number" class="form-control" id="Document" placeholder="Type your ID here" required>
        <div class="valid-tooltip">
          Looks good!
        </div>
        <div class="invalid-tooltip">
          Please Enter a Document ID.
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="mb-3 w-100">
      <div class="col-12 position-relative">
        <label for="Email-Address" class="form-label">Email address</label>
        <input name="Email" type="email" class="form-control" id="Email-Address" placeholder="name@example.com" required>
        <div class="valid-tooltip">
          Looks good!
        </div>
        <div class="invalid-tooltip">
          Please Enter an Email.
        </div>
      </div>
    </div>
    <div class="mb-3 w-100">
      <div class="col-12 position-relative">
        <label for="Contact" class="form-label">Contact</label>
        <input name="Contact" type="text" class="form-control" id="Contact" placeholder="Contact" required>
        <div class="valid-tooltip">
          Looks good!
        </div>
        <div class="invalid-tooltip">
          Please Enter a Contact Number.
        </div>
      </div>
    </div>
      
    <div class="mb-3 w-100">
      <div class="col-12 position-relative">
        <label for="dob" class="form-label">Date of Birth </label>
        <input name="Dob" type="date" class="form-control" id="dob" placeholder="" required>
        <div class="valid-tooltip">
          Looks good!
        </div>
        <div class="invalid-tooltip">
          Please choose a DOB.
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="mb-3 w-100">
      <div class="col-12 position-relative">
        <label for="Experience" class="form-label">Experience</label>
        <input name="Experience" type="text" class="form-control" id="Experience" placeholder="Experience" required>
            <div class="valid-tooltip">
              Looks good!
            </div>
            <div class="invalid-tooltip">
              Please Enter the yeards of experiencie.
            </div>
      </div>
    </div>
    <div class="mb-3 w-100">
      <div class="col-12 position-relative">
        <label for="Address" class="form-label">Address</label>
        <input name="Address" type="text" class="form-control" id="Address" placeholder="Address" required>
        <div class="valid-tooltip">
          Looks good!
        </div>
        <div class="invalid-tooltip">
          Please Enter an Address.
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="mb-3 w-100">
      <div class="col-12 position-relative">
        <label for="Password" class="form-label">Password</label>
        <input name="Password" type="password" class="form-control" id="Password" placeholder="Password" required>
        <div class="valid-tooltip">
          Looks good!
        </div>
        <div class="invalid-tooltip">
          Please Set a Password.
        </div>
      </div>
    </div>
    <div class="mb-3 w-100">
      <div class="col-12 position-relative">
        <label for="select-Gender" class="form-label">Gender</label>
        <select name="Gender" id="select-Gender"class="form-select" aria-label="Default select example" required>
          <option selected disabled value="">Gender</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Other</option>
        </select>
        <div class="valid-tooltip">
          Looks good!
        </div>
        <div class="invalid-tooltip">
          Please choose a Gender.
        </div>
      </div>
    </div>
    <div class="mb-3 w-100">
      <div class="col-12 position-relative">
        <label for="select-Status" class="form-label">Status</label>
        <select name="Status" id="selec-tStatus"class="form-select" aria-label="Default select example" required>
          <option selected disabled value="">Status</option>
          <option value="1">Active</option>
          <option value="2">Inactive</option>
          <!-- <option value="3">Other</option> -->
        </select>
        <div class="valid-tooltip">
              Looks good!
            </div>
            <div class="invalid-tooltip">
              Please choose a Status.
        </div>
      </div>
    </div>
  </div>

  <input type="hidden" value="true" name="CreateIn">  
  
  <button type="submit" class="btn btn-primary fs-3 d-flex align-items-center gap-2">
      <span class="spinner-border" aria-hidden="true" style="display:none;"></span>
      <i class='bx bxs-save' style="display:flex;"></i>
      <span role="status">Save Doctor</i></span>
    <!-- Save Doctor <i class='bx bxs-save' ></i> -->
  </button>
</form>
