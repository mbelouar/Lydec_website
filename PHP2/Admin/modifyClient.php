<?php

    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();

    $file=file_get_contents('php://input');
    $data=json_decode($file);
    $id=$data->id;
    $nom=$data->Nom;
    $password=$data->Password;
    $prenom=$data->Prenom;
    $Adresse=$data->Adresse;
    $Email=$data->Email;

    $query="SELECT id FROM client WHERE email='$Email' and id!=$id";
    $checkMail=mysqli_query($conn,$query);
    if(mysqli_num_rows($checkMail)===0){
        $query="UPDATE client SET nom='$nom', prenom='$prenom', adresse='$Adresse', email='$Email', motDePasse='$password' WHERE id=$id";
        $updateClient=mysqli_query($conn,$query);
        if($updateClient){
            echo "Client Modifier";
        }else{
            echo "Erreur";
        }
    }else{
        echo "Le Nouveu Email Existe Deja";
    }
    
?>