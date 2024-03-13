<?php

    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();

    $file=file_get_contents('php://input');
    $data=json_decode($file);
    $id=$data->Id;
    $nvConso=$data->nvConso;
    $Mois=$data->Mois;
    $Annee=$data->Annee;

    $query="SELECT c.id_client as idClient 
            FROM consommation_mensuelle c 
            INNER JOIN facture f ON f.id_consommation=c.id
            WHERE  f.id=$id";
    $getIdClient=mysqli_query($conn,$query);
    $row=mysqli_fetch_assoc($getIdClient);
    $idClient=$row['idClient'];
    $moisPrecedent=0;
    $anneeTmp=0;
    if($Mois!=1){
        $moisPrecedent=$Mois - 1;
        $anneeTmp=$Annee;
    }else{
        $moisPrecedent=12;
        $anneeTmp=$Annee-1;
    }
    $query="SELECT consommation_compteur as conMois from consommation_mensuelle where id_client=$idClient and mois=$moisPrecedent and annee=$anneeTmp";
    $calcConso=mysqli_query($conn,$query);
    $row=mysqli_fetch_assoc($calcConso);
    $consoPrecedent=$row['conMois'];
    $consomCalcule=$nvConso-$consoPrecedent;
    $prixht=0;
    if($consomCalcule > 0){
        if($consomCalcule - 100 >= 0){
            $prixht+=100*0.8;
            if($consomCalcule - 200 >=0){
                $prixht+=100*0.9;
                $prixht+=($consomCalcule - 200)*1;
            }else{
                $prixht+=($consomCalcule - 100)*0.9;
            }
        }else{
            $prixht+=$consomCalcule*0.8;
        }
        $prixttc=($prixht*0.15)+$prixht;
        $query="UPDATE consommation_mensuelle SET consommation_compteur=$nvConso WHERE id_client=$idClient and mois='$Mois' and annee='$Annee'";
        $updateConso=mysqli_query($conn,$query);
        $query="UPDATE facture SET prix_ttc=$prixttc, prix_ht=$prixht, consommation=$consomCalcule, statu=0 WHERE id=$id";
        $updateFacture=mysqli_query($conn,$query);
        if($updateConso && $updateFacture)
            echo "Consommation Modifier";
    }else{
        echo "Consommation Generee Est Negative";
    }
    
?>