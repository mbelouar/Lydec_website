<?php
    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();
    session_start();
    $id=$_SESSION['id'];
    $query="SELECT message,date_notification as dateNotif FROM notification WHERE id_client=$id";
    $getNotif=mysqli_query($conn,$query);
    $tab=array();
    while($row=mysqli_fetch_assoc($getNotif)){
        $objct=new stdClass();
        $objct->message=$row['message'];
        $objct->dateNotif=$row['dateNotif'];
        $tab[]=$objct;
    }
    $objctF=json_encode($tab);
    echo $objctF;
?>