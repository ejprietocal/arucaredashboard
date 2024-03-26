<form id="form" action="POST" class="alert  alert-dismissible fade show animate__bounceIn needs-validation shadow" role="alert" novalidate>
  <button type="button" class="button-close btn-close" data-bs-dismiss="alert" data-bs-target=".createContainer" aria-label="Close"></button>
  <strong class="fs-2">Medicine Creation</strong>


    <div class="container container-medicines">
        <div class="mb-3 w-100">
            <div class="col-12 position-relative">
                <label for="medicine_id" class="form-label">Name</label>
                <input name="Name" type="text" class="form-control" id="medicine_id" placeholder="Medicine Name" required>
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
                <label for="price_id" class="form-label">Price</label>
                <input name="Price" type="number" min="0" step="any" class="form-control" id="price_id" placeholder="Price" required>
                <div class="valid-tooltip">
                    Looks good!
                </div>
                <div class="invalid-tooltip">
                    Please Enter a price in Dollars USD
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="mb-3 w-100">
            <div class="col-12 position-relative">
                <label for="composition_id" class="form-label">Composition</label>
                <input name="Composition" type="text" class="form-control" id="composition_id" placeholder="Composition" required>
                <div class="valid-tooltip">
                Looks good!
                </div>
                <div class="invalid-tooltip">
                Please Enter a Composition.
                </div>
            </div>
        </div>
        <div class="mb-3 w-100">
            <div class="col-12 position-relative">
                <label for="quantity_id" class="form-label">Quantity</label>
                <input name="Quantity" type="number" class="form-control" id="quantity_id" placeholder="Quantity" required>
                <div class="valid-tooltip">
                Looks good!
                </div>
                <div class="invalid-tooltip">
                Please Enter a Quantity.
                </div>
            </div>
        </div>
        <div class="mb-3 w-100">
            <div class="col-12 position-relative">
                <label for="delivery_id" class="form-label">Delivery</label>
                <input name="Delivery" type="text" class="form-control" id="delivery_id" placeholder="Delivery" required>
                <div class="valid-tooltip">
                Looks good!
                </div>
                <div class="invalid-tooltip">
                Please Enter Delivery.
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="mb-3 w-100">
        <div class="col-12 position-relative">
                <label for="selectStatus" class="form-label">Status</label>
                <select name="Available" id="selectStatus"class="form-select" aria-label="Default select example" required>
                    <option selected disabled value="">Status</option>
                    <option value="1">Available</option>
                    <option value="2">Unavailable</option>
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
      <i class='bi bi-floppy2-fill' style="display:flex;"></i>
      <span role="status">Save Medicine</i></span>
    <!-- Save Doctor <i class='bx bxs-save' ></i> -->
  </button>
</form>