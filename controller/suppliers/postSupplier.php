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


$query = $db->prepare("INSERT INTO suppliers (supplier_name , supplier_nit, supplier_phone, supplier_addres) VALUES (:supplier_name, :supplier_nit, :supplier_phone, :supplier_addres) ");

$result = $query->execute(

    array(":supplier_name"=> $datos["supplier_name"],":supplier_nit" => $datos["supplier_nit"],":supplier_phone" => $datos["supplier_phone"],":supplier_addres" => $datos["supplier_addres"])

);

if($result){
    echo "succesfully";
}else{
    echo "fail";
}



}
?>