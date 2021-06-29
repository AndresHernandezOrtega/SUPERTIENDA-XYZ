<?php

require("../database.php");

// DEVUELVE UN USUARIO PARA EL LOGIN
if(isset($_GET)){

    $id = $_GET["id"];


    $query = $db->query("SELECT * FROM products WHERE product_id = '$id'")->fetch(PDO::FETCH_ASSOC);

    if ($query) {


        echo json_encode($query);

    }else{
        echo "FAIL";
    }
}

?>