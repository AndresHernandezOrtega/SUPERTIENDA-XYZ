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
    $query = $db->query("SELECT * FROM clients WHERE client_id = $id")->fetch(PDO::FETCH_ASSOC);

    if($query){
        echo json_encode($query);
    }

}

if($_SERVER['REQUEST_METHOD'] === "PUT"){

    $datosArray = json_decode(file_get_contents("php://input"));
    $datos = stdToArray($datosArray);


    $query = $db->prepare("UPDATE clients SET client_name = :client_name, client_lastName = :client_lastName, client_phone_number = :client_phone_number, client_addres = :client_addres WHERE client_id = :client_id");

    $result = $query->execute(
        
        array( ":client_name" => $datos["client_name"],  ":client_lastName" => $datos["client_lastName"], ":client_phone_number" => $datos["client_phone_number"], ":client_addres" => $datos["client_addres"], ":client_id" => $datos["id"] )
    );

    if($result){
        echo "GOOD";
    }else{
        echo "FAIL";
    }

}

?>