<?php

function stdToArray($obj){

    $reaged = (array)$obj;
    
    foreach($reaged as $key => &$field){
        if(is_object($field))$field = stdToArray($field);
    }
    return $reaged;
}

require("../database.php");

if ($_SERVER['REQUEST_METHOD'] === "DELETE"){

    $idArray = json_decode(file_get_contents("php://input"));
    $id = stdToArray($idArray)[0];

    echo($id);
    
    $query = $db->prepare("DELETE FROM clients WHERE client_id = :id");
    $response = $query->execute(array(":id" => $id));

    if($response){
        echo "CLIENT DELETED";
    }else{
        echo "FAIL";
    }
}

?>