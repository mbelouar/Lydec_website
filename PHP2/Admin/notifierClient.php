<?php

    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();
    $file=file_get_contents('php://input');
    $data=json_decode($file);
    $id=$data->Client;
    $annee=$data->Annee;
    $date=date('Y-m-d');
    $message="Veuillez Visite Votre Agence Pour Regler Votre Situation De : ".$annee;

    $query="INSERT INTO notification(id_client,message,date_notification) VALUES($id,'$message','$date')";
    $notifier=mysqli_query($conn,$query);
    if($notifier)
        echo 'true';
    else
        echo 'false';
?>
