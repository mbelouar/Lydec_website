<?php

    require('../utils/cors.php');
    require('../utils/connexion.php');
    session_start();
    $id=$_SESSION['id'];
    $conn=setConnection();

    $query="SELECT id , type, description, date_reclamation as dateRec, statu
            FROM reclamation Where id_client=$id ORDER BY id desc";
    $getRec=mysqli_query($conn,$query);

    $tab=array();
    while($row=mysqli_fetch_assoc($getRec)){
        $object=new stdClass();
        $object->id=$row['id'];
        $object->type=$row['type'];
        $object->description=$row['description'];
        $object->dateRec=$row['dateRec'];
        $object->status=$row['statu'];

        $tab[]=$object;
    }

    $objctF=new stdClass();
    $objctF->data=$tab;
    $objctF=json_encode($objctF);

    echo $objctF;
?>