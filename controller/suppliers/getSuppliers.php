<?php

require("../database.php");

// DEVUELVE LAS SUGERENCIAS DE PRODUCTOS REGISTRADOS
if(isset($_GET)){


    $query = $db->query("SELECT * FROM suppliers")->fetchAll(PDO::FETCH_ASSOC);

    if($query){

        echo json_encode($query);
    }else{

        echo "";
    }
}

?>