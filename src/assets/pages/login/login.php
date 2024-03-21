<form  method="POST" class="form_container animate__bounceIn needs-validation" novalidate>
  <div class="logo_container">
    <picture>
        <source srcset="/public/images/logo-arucare.avif" type="image/avif">
        <source srcset="/public/images/logo-arucare.webp" type="image/webp">
    
        <img width="100%" src="/public/images/logo-arucare.png" alt="">
    </picture>
  </div>
  <div class="title_container">
    <p class="title">Login to Dashboard</p>
    <span class="subtitle">Get started with our Dashboard, where you can set appointments</span>
  </div>
  <br>
  <div class="input_container input-group">
    <div class="col-12">
      <label for="validationCustomUsername" class="input_label form-label">User</label>
      <div class="input-group position-relative border border-2 rounded">
        <span class="input-group-text rounded-0" id="basic-addon1"><i class="bi bi-person-workspace fs-3"></i></span>
        <input placeholder="Username" title="Inpit title" name="input-name" type="text" class="input_field form-control" id="validationCustomUsername" required>
        <!-- <div class="valid-tooltip end-0">
          Looks good!
        </div> -->
        <div class="invalid-tooltip end-0">
          Please Enter an Username.
        </div>
      </div>

    </div>
  </div>
  <div class="input_container input-group position-relative">
    <div class="col-12 ">
      <label class="input_label form-label" for="password_field">Password</label>
        <div class="input-group mb-3 position-relative border border-2 rounded">
          <span class="input-group-text rounded-0" id="basic-addon1"><i class="bi bi-key-fill fs-3"></i></span>
          <input placeholder="Password" title="Inpit title" name="input-password" type="password" class="input_field form-control input-login-password" id="password_field" required>
          <span class="input-group-text password-input-text border rounded-0" id="basic-addon2" role="button"><i class="bi bi-eye-slash fs-3"></i></span>
          <!-- <div class="valid-tooltip end-0">
          Looks good!
          </div> -->
          <div class="invalid-tooltip end-0">
              Please Enter a Password.
          </div>
      </div>
        </div>

  </div>
  <button title="Sign In" type="submit" class="sign-in_btn">
    <span>Sign In</span>
  </button>

  <a class="click-forgot link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">¿Forgot your password?</a>
  <p class="note">Terms of use &amp; Conditions</p>


  <div class="mode">
    <div class="moon-sun">
        <i class="bx bx-moon icono moon"></i>
        <i class="bx bx-sun icono sun"></i>
    </div>
  
    <div class="toogle-switch">
          <div class="switch">
            
          </div>
    </div>
  </div>
</form>


