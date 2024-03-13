<?php

    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();

    $file=file_get_contents('php://input');
    $data=json_decode($file);
    $id=$data->Id;

    $query="UPDATE facture SET statu=0 WHERE id=$id";
    $updateFacture=mysqli_query($conn,$query);

    if($updateFacture){
        echo 'Facture Valider';
    }else{
        echo 'Facture Non Valider';
    }
    
?>