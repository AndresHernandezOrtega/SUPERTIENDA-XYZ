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

$query = $db->prepare("INSERT INTO orders (order_cliente_id, total_price, seller_name) VALUES (:order_cliente_id, :total_price, :seller_name) ");

$result = $query->execute(

    array(":order_cliente_id"=> $datos["order_cliente_id"],":total_price" => $datos["total_price"] , ":seller_name" => $datos["seller_name"])

);

if($result){

    $secondQuery = $db->query("SELECT * FROM orders ORDER BY order_id DESC LIMIT 1")->fetch(PDO::FETCH_ASSOC);

    echo json_encode($secondQuery);
}else{
    echo "fail";
}



}
?>