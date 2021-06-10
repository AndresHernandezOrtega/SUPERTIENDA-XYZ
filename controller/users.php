<?php

require("database.php");

if(isset($_GET)){

    $user_email = $_GET["email"];
    $user_password = $_GET["password"];

    $query = $db->query("SELECT * FROM users WHERE email = '$user_email'")->fetch(PDO::FETCH_ASSOC);

    if ($query && password_verify($user_password, $query["password"])) {


        echo json_encode($query);

    }else{
        echo json_encode("uncorrect_credentials");
    }
}

?>