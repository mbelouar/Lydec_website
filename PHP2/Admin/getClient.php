<?php

require('../utils/cors.php');
require('../utils/connexion.php');

$conn=setConnection();

$file=file_get_contents('php://input');
$data=json_decode($file);
$id=$data->Id;

$query="SELECT id,nom,prenom,adresse,email,motDePasse FROM client WHERE id=$id";
$findClient=mysqli_query($conn,$query);

$objct=new stdClass();
if(mysqli_num_rows($findClient)===1){
    $row=mysqli_fetch_assoc($findClient);
    $objct->id=$row['id'];
    $objct->Nom=$row['nom'];
    $objct->Prenom=$row['prenom'];
    $objct->Adresse=$row['adresse'];
    $objct->Email=$row['email'];
    $objct->Password=$row['motDePasse'];
    
    $objct=json_encode($objct);
    echo $objct;
}else{
    $objct->msg="Client Introuvable";
    $objct=json_encode($objct);
    echo $objct;
}

?>