<?php

    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();

    $file=file_get_contents('php://input');
    $data=json_decode($file);
    $id=$data->Id;
    $query="";
    if(strcmp($id,"") && strcmp($id," ")){
        $query="SELECT r.id as id ,c.nom as nom , c.prenom as prenom, type, description, date_reclamation as dateRec
        FROM reclamation r
        inner JOIN client c on r.id_client = c.id
        Where r.id_client=$id and statu=0 ORDER BY id desc";
    }else{
        $query="SELECT r.id as id ,c.nom as nom, c.prenom as prenom, type, description, date_reclamation as dateRec
        FROM reclamation r
        inner JOIN client c on r.id_client = c.id
        Where statu=0 ORDER BY id desc";
    }
    
    $getRec=mysqli_query($conn,$query);

    $tab=array();
    while($row=mysqli_fetch_assoc($getRec)){
        $object=new stdClass();
        $object->id=$row['id'];
        $object->type=$row['type'];
        $object->description=$row['description'];
        $object->dateRec=$row['dateRec'];
        $object->nom=$row['nom'];
        $object->prenom=$row['prenom'];

        $tab[]=$object;
    }

    $objctF=new stdClass();
    $objctF->data=$tab;
    $objctF=json_encode($objctF);

    echo $objctF;
?>