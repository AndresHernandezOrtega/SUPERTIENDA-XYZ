<?php

require("../database.php");

function stdToArray($obj){

    $reaged = (array)$obj;
    
    foreach($reaged as $key => &$field){
        if(is_object($field))$field = stdToArray($field);
    }
    return $reaged;
}


if($_SERVER['REQUEST_METHOD'] === "PUT"){

    $datosArray = json_decode(file_get_contents("php://input"));
    $datos = stdToArray($datosArray);
    

    $stockActual = $db->query("SELECT product_stock FROM products WHERE product_id = $datos[id] ")->fetch(PDO::FETCH_ASSOC);
    $nuevoStock = ((int) $stockActual["product_stock"]) - ((int) $datos["amount"]);


    $query = $db->prepare("UPDATE products SET product_stock = :nuevoStock WHERE product_id = $datos[id]");
    $result = $query->execute(
        
        array( ":nuevoStock" => $nuevoStock)
    );

    if($result){
        echo "GOOD";
    }else{
        echo "FAIL";
    }

}

?>