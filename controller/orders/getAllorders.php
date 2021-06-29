<?php

require("../database.php");

$query = $db->query("SELECT * FROM `orders` WHERE 1")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($query);

?>