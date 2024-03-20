<?php 

  if($_SERVER['REQUEST_METHOD']=== 'POST' && isset($_POST['id'])){

    $id = $_POST['id'];
    $name = $_POST['name'];
    $category = $_POST['category'];
  }


?>



<div class="card alert alert-danger p-2 fs-4 alert-dismissible fade show animate__bounceIn shadow" role="alert" style="min-width:25rem">
  <button type="button" class="btn-close button-close" data-bs-dismiss="alert" data-bs-target=".createContainer" aria-label="Close"></button>
  <div class="card-header  bg-danger-subtle">
  <i class="bi bi-exclamation-circle"></i> <?php echo $category;?>
  </div>
  <strong class="mx-auto d-block text-center fs-2 text-decoration-underline">¿Are you sure?</strong>
  <p class="mx-auto mt-3 text-center">you want to delete this</p> 

  <p class="mx-auto mt-4 text-center fst-italic"><?php echo $name;?></p>
  <hr>
  <p class="mx-auto mt-2 text-center fw-bold">ID: <?php echo $id;?></p>
  <hr>
  <div class="col-12">
    <div class="m-3  d-flex gap-2 align-items-center justify-content-evenly">
      <button type="button" class="btn-delete btn btn-danger col-5 d-flex gap-3 justify-content-center btn-lg">
        <div class="spinner-border text-light col-auto" role="status" style="display:none;">
          <span class="visually-hidden">Loading...</span>
        </div>  
          <i class="bi bi-trash col-3" style="display:block;"></i> Yes
      </button>
      <button type="button" data-bs-dismiss="alert" data-bs-target=".createContainer" aria-label="Close" class="btn-no btn btn-primary col-5 d-flex gap-3 justify-content-center btn-lg"><i class="bi bi-x-lg col-3"></i> No</button>
    </div>
  </div>


</div>