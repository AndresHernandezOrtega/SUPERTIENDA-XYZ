<?php

require("database.php");

function stdToArray($obj){

    $reaged = (array)$obj;
    
    foreach($reaged as $key => &$field){
        if(is_object($field))$field = stdToArray($field);
    }
    return $reaged;
}

if($_SERVER['REQUEST_METHOD'] === "GET"){

    $id = $_GET["id"];
    $query = $db->query("SELECT * FROM users WHERE user_id = $id")->fetch(PDO::FETCH_ASSOC);

    if($query){
        echo json_encode($query);
    }

}

if($_SERVER['REQUEST_METHOD'] === "PUT"){

    $datosArray = json_decode(file_get_contents("php://input"));
    $datos = stdToArray($datosArray);

    print_r($datos);
    if($datos["password"] !== ""){

        $cryptedPass = password_hash($datos["password"], PASSWORD_BCRYPT);
        $query = $db->prepare("UPDATE users SET email = :email, name = :name, lastName = :lastName, password = :password WHERE user_id = :id");

        $result = $query->execute(
            
            array( ":email" => $datos["email"],  ":name" => $datos["name"], ":lastName" => $datos["lastName"], ":password" => $cryptedPass, ":id" => $datos["id"] )
        );

        if($result){
            echo "GOOD";
        }else{
            echo "FAIL";
        }

    }else{

        $query = $db->prepare("UPDATE users SET email = :email, name = :name, lastName = :lastName WHERE user_id = :id");
        $result = $query->execute(
            
            array( ":email" => $datos["email"],  ":name" => $datos["name"], ":lastName" => $datos["lastName"], ":id" => $datos["id"] )
        );

        if($result){
            echo "GOOD";
        }else{
            echo "FAIL";
        }
    }
}

?>