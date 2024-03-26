<form id="form" action='POST' class="alert  position-relative alert-dismissible fade show animate__bounceIn shadow needs-validation" novalidate>
  <button type="button" class="button-close btn-close" data-bs-dismiss="alert" data-bs-target=".createContainer" aria-label="Close"></button>
  <strong class="fs-2">Doctor Modification</strong>

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
          <label for="lastname" class="form-label">Last Name</label>
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
        <label for="Email_address" class="form-label">Email address</label>
        <input name="Email" type="email" class="form-control" id="Email_address" placeholder="name@example.com" required disabled>
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
        <label for="Password" class="form-label">Password</label>
        <div class="input-group m-0">
          <input  type="password" class="form-control" id="Password" placeholder="Password" aria-label="Username" aria-describedby="basic-addon2" value="&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;&#11044;" disabled>
          <span class="input-group-text rounded-end fs-5" id="basic-addon2"><i class="bi bi-eye-slash-fill"></i></span>
          <div class="valid-tooltip">
            Looks good!
          </div>
          <div class="invalid-tooltip">
            Please Set a Password.
          </div>
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
        <label for="Experience" class="form-label">Experience (in Year)</label>
        <input name="Experience" type="number" class="form-control" id="Experience" placeholder="Experience" required>
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
        <label for="select-Gender" class="form-label">Gender</label>
        <select name="Gender" id="select-Gender"class="form-select" aria-label="Default select example" required>
          <option selected disabled value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
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
        <select name="Status" id="select-Status"class="form-select" aria-label="Default select example" required>
          <option selected disabled value="">-- Select --</option>
          <option value="2">Active</option>
          <option value="1">Inactive</option>
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
  <div class="container">
    <div class="mb-3 w-100">
      <div id="contenedor_node"class="col-12">
        <label for="Specializations" class="form-label fw-bold fs-2">Specializations  <button type="button" class="btn-add-new-node btn fs-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add Specialization"><i class="bi bi-plus-lg font-color"></i></button></label>
        <div data-clone="0" class="clase-clone card input-group mb-3 animate__bounceIn bg-transparent border border-3">

          <div class="card-header field_specialization p-2 d-flex justify-content-between align-items-center">
            <div>
              <i class="bi bi-journal-bookmark-fill me-2"></i>
              Specialization 1
            </div>
          </div>
          <div class="input-group-text  specialization w-100 gap-3">
            <div class="col-12-md w-100 d-flex align-items-baseline">
              <div class="position-relative col-6">
                <div class="w-100 text-start">
                  <label for="specialization">Name:</label>
                  <input  type="text" id="specialization"class="form-control specialization-name" aria-label="Text input with checkbox" value="Doctor" required readonly>
                  <div class="valid-feedback bg-white">
                    Looks good!
                  </div>
                  <div class="invalid-feedback bg-white">
                    Please type Specialization
                  </div>
                </div>
              </div>
               <div class="position-relative col-6">
                <div class="w-100 text-start">
                  <label for="StatusSpecialization">Status:</label>
                  <select  id="StatusSpecialization" class="form-select select-Status-specialization" aria-label="Default select example" required>
                     <option selected disabled value="">-- Select --</option>
                     <option value="1">Available<i class="bi bi-check-lg ms-2"></i></option>
                     <option value="2">Unavailable<i class="bi bi-x-lg ms-2"></i></option>
                   </select>
                   <div class="valid-feedback bg-white">
                    Looks good!
                  </div>
                    <div class="invalid-feedback bg-white">
                      Please choose a Status.
                  </div>
                </div>
               </div> 
            </div>
             <div class="col-4-md">
                <div class="w-100 text-start position-relative">
                  <label for="fee_target">Fee:</label>
                  <i  class="bi bi-currency-dollar fs-3 position-absolute" style="top: 15px;left: 4px;"></i>
                  <input  type="number"  placeholder="How much (In Dollars)"class="form-control ps-5 pe-1 w-100 price-specialization" id="howMuch" aria-label="Dollar amount (with dot and two decimal places)" required>
                  <div class="valid-feedback end-0 bg-white">
                     Looks good!
                  </div>
                  <div class="invalid-feedback end-0 bg-white">
                       Please Enter a value
                  </div>
                </div>
              </div> 
          </div>
        </div>
      </div>
    </div>
  </div>

  
  <button type="submit" class="btn btn-primary fs-3 d-flex align-items-center gap-2">
      <span class="spinner-border" aria-hidden="true" style="display:none;"></span>
      <i class='bi bi-floppy2-fill' style="display:flex;"></i>
      <span role="status">Update Doctor</i></span>

  </button>
</form>
