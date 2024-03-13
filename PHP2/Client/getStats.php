<?php

require('../utils/cors.php');
require('../utils/connexion.php');
session_start();
$id=$_SESSION['id'];

$conn=setConnection();

$query="SELECT sum(f.prix_ttc) as total
        FROM facture f 
        INNER JOIN consommation_mensuelle c 
        ON f.id_consommation=c.id
        WHERE c.id_client=$id and f.statu=0 ";

$getStats=mysqli_query($conn,$query);
$row=mysqli_fetch_assoc($getStats);

$query="SELECT f.consommation as conso, c.mois as mois
        FROM facture f
        INNER JOIN consommation_mensuelle c
        ON f.id_consommation=c.id
        WHERE c.id_client=$id
        ORDER BY c.id DESC
        LIMIT 6";
$getStats=mysqli_query($conn,$query);
$tab=array();
while($row2=mysqli_fetch_assoc($getStats)){
    $objct=new stdClass();
    $objct->conso=$row2['conso'];
    $objct->mois=$row2['mois'];
    $tab[]=$objct;
}

$objct = new stdClass();
$objct->total=$row['total'];
$objct->recent=$tab;
$objct=json_encode($objct);

echo $objct;


?>