<?php

    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();

    $data=file_get_contents("php://input");
    $data=json_decode($data);
    $id=$data->idFacture;

    $query="SELECT f.prix_ttc as ttc, f.prix_ht as ht , c.mois as mois , c.annee as annee, f.statu as statu, f.consommation as conso,c.photo_compteur as pic
            FROM facture f
            INNER JOIN consommation_mensuelle c ON f.id_consommation=c.id
            WHERE f.id=$id";

    $getFacture=mysqli_query($conn,$query);
    $row=mysqli_fetch_assoc($getFacture);

    $objct = new stdClass();
    $objct->prix_ttc=$row['ttc'];
    $objct->prix_ht=$row['ht'];
    $objct->mois=$row['mois'];
    $objct->annee=$row['annee'];
    $objct->status=$row['statu'];
    $objct->conso=$row['conso'];
    $objct->pic=$row['pic'];

    $objct=json_encode($objct);
    echo $objct;
?>