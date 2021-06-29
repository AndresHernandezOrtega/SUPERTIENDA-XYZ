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

$query = $db->prepare("INSERT INTO product_detail (product_id, order_id, product_amount) VALUES (:product_id, :order_id, :product_amount) ");

$result = $query->execute(

    array(":product_id"=> $datos["product_id"],":order_id" => $datos["order_id"], ":product_amount" => $datos["product_amount"])

);

if($result){

    $secondQuery = $db->query("SELECT * FROM product_detail WHERE order_id = $datos[order_id]")->fetch(PDO::FETCH_ASSOC);

    echo json_encode($secondQuery);
}else{
    echo "fail";
}



}
?>