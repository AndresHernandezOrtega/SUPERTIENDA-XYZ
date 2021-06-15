<?php 

function stdToArray($obj){

    $reaged = (array)$obj;
    
    foreach($reaged as $key => &$field){
        if(is_object($field))$field = stdToArray($field);
    }
    return $reaged;
}

require("database.php");

if(isset($_POST)){

$datosArray = json_decode(file_get_contents("php://input"));
$datos = stdToArray($datosArray);

$crypted_password = password_hash($datos["password"], PASSWORD_BCRYPT);
$query = $db->prepare("INSERT INTO users (email, name, lastName, password, role) VALUES (:email, :name, :lastName, :password, :role) ");

$result = $query->execute(

    array(":email"=> $datos["email"],":name" => $datos["name"],":lastName" => $datos["lastName"],":password" => $crypted_password,":role" => $datos["role"])

);

if($result){
    echo "succesfully";
}else{
    echo "fail";
}



}
?>