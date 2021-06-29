<?php

require("../database.php");

function stdToArray($obj){

    $reaged = (array)$obj;
    
    foreach($reaged as $key => &$field){
        if(is_object($field))$field = stdToArray($field);
    }
    return $reaged;
}

if($_SERVER['REQUEST_METHOD'] === "GET"){

    $id = $_GET["id"];
    $query = $db->query("SELECT * FROM products WHERE product_id = $id")->fetch(PDO::FETCH_ASSOC);

    if($query){
        echo json_encode($query);
    }

}

if($_SERVER['REQUEST_METHOD'] === "PUT"){

    $datosArray = json_decode(file_get_contents("php://input"));
    $datos = stdToArray($datosArray);


    $query = $db->prepare("UPDATE products SET product_name = :product_name, product_price = :product_price, product_stock = :product_stock WHERE product_id = $datos[id]");

    $result = $query->execute(
        
        array( ":product_name" => $datos["product_name"],  ":product_price" => $datos["product_price"], ":product_stock" => $datos["product_stock"])
    );

    if($result){
        echo "GOOD";
    }else{
        echo "FAIL";
    }

}

?>