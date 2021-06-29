<?php

require("../database.php");

$query = $db->query("SELECT * FROM `products` WHERE 1")->fetchAll(PDO::FETCH_ASSOC);

if($query){

    echo json_encode($query);
}else{

    echo "No hay resultados";
}


?>