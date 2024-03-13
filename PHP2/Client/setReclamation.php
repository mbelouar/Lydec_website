<?php

require('../utils/cors.php');
require('../utils/connexion.php');
session_start();
$id=$_SESSION['id'];
$conn=setConnection();

$file=file_get_contents('php://input');
$data=json_decode($file);
$type=$data->type;
$description=$data->desc;
$date=date("Y-m-d");

$query="INSERT INTO reclamation(id_client,type,description,date_reclamation) Values ($id,'$type','$description','$date')";
if(mysqli_query($conn,$query))
    echo 'Reclamation Ajoutee';

?>