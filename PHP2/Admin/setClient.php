<?php
    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();

    $file=file_get_contents('php://input');
    $data=json_decode($file);
    $Nom=$data->Nom;
    $Prenom=$data->Prenom;
    $Adresse=$data->Adresse;
    $Password=$data->Password;
    $Email=$data->Email;

    $query="SELECT id FROM client WHERE email='$Email'";
    $checkMail=mysqli_query($conn,$query);
    if(mysqli_num_rows($checkMail)===0){
        $query="INSERT INTO client(nom,prenom,adresse,motDePasse,Email) VALUES('$Nom','$Prenom','$Adresse','$Password','$Email')";
        $insertClient=mysqli_query($conn,$query);

        if($insertClient)
            echo "Client Ajouté";
        else
            echo "Erreur D'insertion";
    }else{
        echo "Un Client Avec ce Email est Inscrit Déjà";
    }
    
?>