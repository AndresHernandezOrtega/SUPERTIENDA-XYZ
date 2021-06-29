<?php

require("../database.php");

// DEVUELVE LAS SUGERENCIAS DE PRODUCTOS REGISTRADOS
if(isset($_GET)){

    $product = $_GET["product"];

    $query = $db->query("SELECT * FROM products WHERE product_name LIKE '$product%'")->fetchAll(PDO::FETCH_ASSOC);

    if($query){

        echo json_encode($query);
    }else{

        echo "No hay resultados";
    }
}

?>