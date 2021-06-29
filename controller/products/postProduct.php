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
$query = $db->prepare("INSERT INTO products (supplier_name, product_name, product_stock, product_price ) VALUES (:supplier_name, :product_name, :product_stock, :product_price) ");

$result = $query->execute(

    array(":supplier_name"=> $datos["product_supplier"],":product_name" => $datos["product_name"],":product_stock" => $datos["product_stock"],":product_price" => $datos["product_price"])

);

if($result){
    echo "succesfully";
}else{
    echo "fail";
}



}
?>