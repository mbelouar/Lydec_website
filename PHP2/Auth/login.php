<?php
     require('../utils/cors.php');
     require('../utils/connexion.php');

     $email=$_POST["Email"];
     $password=$_POST["Password"];

     $conn=setConnection();

     $checkQuery=mysqli_query($conn,"SELECT motDePasse FROM client Where email='$email'");
     $rowCount=mysqli_num_rows($checkQuery);
     $checkQuery2=mysqli_query($conn,"SELECT motDePasse FROM fournisseur WHERE email='$email'");
     $rowCount2=mysqli_num_rows($checkQuery2);

     if($rowCount === 1){
          $row=mysqli_fetch_assoc($checkQuery);
          $dbPassword=$row["motDePasse"];
          if(!strcmp($dbPassword,$password)){
               $retrieveData=mysqli_query($conn,"SELECT id,nom, prenom, adresse FROM client Where email='$email'");
               $row=mysqli_fetch_assoc($retrieveData);

               session_start();
               $_SESSION['id']=$row['id'];
               $_SESSION['nom']=$row['nom'];
               $_SESSION['prenom']=$row['prenom'];
               $_SESSION['adresse']=$row['adresse'];
               $_SESSION['type']='client';


               if(isset($_SESSION['id']))
                    echo 'client';
               else
                    echo 'Erreur';
          }else{
               echo "Mot De Passe Invalide";
          }
     }else if($rowCount2 === 1){
          $row=mysqli_fetch_assoc($checkQuery2);
          $dbPassword=$row["motDePasse"];
          if(!strcmp($dbPassword,$password)){
               session_start();
               $_SESSION['id']=1;
               $_SESSION['type']='admin';
               if(isset($_SESSION['id']))
               echo 'admin';
               else
               echo 'Erreur';
          }else{
               echo "Mot De Passe Invalide";
          }

     }else{
          echo "Email Invalide";
     }
    
?>