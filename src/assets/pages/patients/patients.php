<?php

if(!isset($_COOKIE['token'])){

    header('Location: /');
    exit;

  }

?>

<div class="table-responsive" id="no-more-tables">

    <table class="table table-striped caption-top display responsive nowrap"style="width:100%" id="myTable">
        <caption class="fs-3">List of patients</caption>
        <thead class="text-light" >
            <tr>
                <th class="">Name</th>
                <th class="">Email</th>
                <th class="">Mobile</th>
                <th class="text-center">Gender</th>
                <th class="text-center">Created</th>
                <th class="text-center">Action</th>
            </tr>
        </thead>

        <tbody id="tbody_patients">

        </tbody>
    </table>
</div>

