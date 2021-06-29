<?php 

function stdToArray($obj){

    $reaged = (array)$obj;
    
    foreach($reaged as $key => &$field){
        if(is_object($field))$field = stdToArray($field);
    }
    return $reaged;
}

require("../database.php");

if(isset($_POST)){

$datosArray = json_decode(file_get_contents("php://input"));
$datos = stdToArray($datosArray);

print_r($datos);

$query = $db->prepare("INSERT INTO clients (client_id , client_name, client_lastName, client_phone_number, client_addres) VALUES (:client_id, :client_name, :client_lastName, :client_phone_number, :client_addres)");

$result = $query->execute(

    array(":client_id"=> $datos["client_id"],":client_name" => $datos["client_name"],":client_lastName" => $datos["client_lastName"],":client_phone_number" => $datos["client_phone_number"], ":client_addres" => $datos["client_addres"])

);

if($result){
    echo "succesfully";
}else{
    echo "fail";
}



}
?>