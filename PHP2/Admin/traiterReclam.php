<?php

    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();

    $file=file_get_contents('php://input');
    $data=json_decode($file);
    $id=$data->Id;

    $query="UPDATE reclamation SET statu=1 WHERE id=$id";
    $updateRec=mysqli_query($conn,$query);
    if($updateRec){
        echo "true";
    }else{
        echo "false";
    }
?>