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
    $query = $db->query("SELECT * FROM suppliers WHERE supplier_id = $id")->fetch(PDO::FETCH_ASSOC);

    if($query){
        echo json_encode($query);
    }

}

if($_SERVER['REQUEST_METHOD'] === "PUT"){

    $datosArray = json_decode(file_get_contents("php://input"));
    $datos = stdToArray($datosArray);



    $query = $db->prepare("UPDATE suppliers SET supplier_name = :Usupplier_name, supplier_nit = :Usupplier_nit, supplier_phone = :Usupplier_phone, supplier_addres = :Usupplier_addres WHERE supplier_id = :id");

    $result = $query->execute(
        
        array( ":Usupplier_name" => $datos["Usupplier_name"],  ":Usupplier_nit" => $datos["Usupplier_nit"], ":Usupplier_phone" => $datos["Usupplier_phone"], ":Usupplier_addres" => $datos["Usupplier_addres"], ":id" => $datos["id"] )
    );

    if($result){
        echo "GOOD";
    }else{
        echo "FAIL";
    }

}

?>