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
                <th class="">name</th>
                <th class="">email</th>
                <th class="">mobile</th>
                <th class="">gender</th>
                <th class="">created</th>
                <th class="">action</th>
            </tr>
        </thead>

        <tbody id="tbody_patients">

        </tbody>
    </table>
</div>

