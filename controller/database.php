<?php

try {
    
    $db = new PDO('mysql:host=localhost;dbname=super_tienda_xyz', "root", "");


} catch (PDOException $th) {
    //throw $th;

    error_log($th->getMessage());
    die();
}

?>