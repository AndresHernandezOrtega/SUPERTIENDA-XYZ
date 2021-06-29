<?php

require("../database.php");

// DEVUELVE LAS SUGERENCIAS DE CLIENTES REGISTRADOS
if(isset($_GET)){

    $product = $_GET["client_id"];

    $query = $db->query("SELECT * FROM clients WHERE client_id LIKE '$product%'")->fetchAll(PDO::FETCH_ASSOC);

    if($query){

        echo json_encode($query);
    }else{

        echo "No hay resultados";
    }
}

?>