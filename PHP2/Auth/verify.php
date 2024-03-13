<?php
    require('../utils/cors.php');

    session_start();
    $Objct=new stdClass();
    if(isset($_SESSION['id'])){
        $Objct->id=$_SESSION['id'];
        $Objct->nom=$_SESSION['nom'];
        $Objct->prenom=$_SESSION['prenom'];
        $Objct->adresse=$_SESSION['adresse'];
        $Objct->type=$_SESSION['type'];
        $Objct=json_encode($Objct);

        echo $Objct;
    }else{
        $Objct->message="false";
        $Objct=json_encode($Objct);

        echo $Objct;
    }

?>