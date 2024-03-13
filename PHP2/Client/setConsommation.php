<?php

require('../utils/cors.php');
require('../utils/connexion.php');
session_start();
$id=$_SESSION['id'];

$conn=setConnection();

$mois=$_POST['mois'];
$annee=$_POST['annee'];
$consom=$_POST['consom'];
$status=0;
$targetDir='../uploads';
$targetFile=$id.$mois.$annee.'.'.pathinfo($_FILES['pic']['name'],PATHINFO_EXTENSION);
$ex_tab=array('jpg','png','jpeg','webp');

$query="SELECT consommation_compteur as conMois from consommation_mensuelle where id_client=$id and mois=$mois and annee=$annee";
$checkExixtance=mysqli_query($conn,$query);

if(mysqli_num_rows($checkExixtance)===0){
    if($mois!=1){
        $moisPrecedent=$mois - 1;
        $anneeTmp=$annee;
    }else{
        $moisPrecedent=12;
        $anneeTmp=$annee-1;
    }
    $query="SELECT id from consommation_mensuelle where id_client=$id";
    $premierFacture=mysqli_query($conn,$query);
    $query="SELECT consommation_compteur as conMois from consommation_mensuelle where id_client=$id and mois=$moisPrecedent and annee=$anneeTmp";
    $calcConso=mysqli_query($conn,$query);
    if(mysqli_num_rows($calcConso) !== 0 || mysqli_num_rows($premierFacture) === 0){
        if(mysqli_num_rows($calcConso) !== 0){
            $row=mysqli_fetch_assoc($calcConso);
            $row=$row['conMois'];
            $consomCalcule=$consom - $row;
                if($consomCalcule < 0)
                    $status=2;
                $query="SELECT avg(f.consommation) as average 
                        from consommation_mensuelle c INNER JOIN 
                        facture f ON f.id_consommation=c.id
                        where c.id_client=$id";
                $checkAvg=mysqli_query($conn,$query);
                $row=mysqli_fetch_assoc($checkAvg);
                $avg=$row['average'];
                if(($avg + 150 ) < $consomCalcule || ($avg - 150) > $consomCalcule)
                    $status=2;
        }else{
            $consomCalcule=$consom;
        }
            if(in_array(pathinfo($_FILES['pic']['name'],PATHINFO_EXTENSION),$ex_tab)){
                $prixht=0;
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
                $query="INSERT INTO consommation_mensuelle(id_client,consommation_compteur,mois,photo_compteur,annee) VALUES ($id,$consom,'$mois','$targetFile','$annee')";
                if($insertConso=mysqli_query($conn,$query)){

                    echo ($status===0?"Consommation Envoyee Avec Succes":"Consommation Envoyee, Pourtant Une Anomalie a été detectée ");
                }
                $query="SELECT id as idCons FROM consommation_mensuelle Where id_client=$id ORDER BY id DESC LIMIT 1";
                $getId=mysqli_query($conn,$query);
                $idConsommation=mysqli_fetch_assoc($getId);
                $idConsommation=$idConsommation['idCons'];
                $idFacture=$id.$mois.$annee;
                $query="INSERT INTO facture VALUES ($idFacture,$idConsommation,$prixht,$prixttc,$status,$consomCalcule)";
                $insertFacture=mysqli_query($conn,$query);
                move_uploaded_file($_FILES['pic']['tmp_name'],$targetDir.'/'.$targetFile);
            }else{
                echo "L'image doit être: jpg, png, jpeg, webp";
            }
    }else{
        echo "Consommation du mois ".$moisPrecedent." est Absente.";
    }
}else{
    echo "La consommation du: ".$mois."/".$annee." est déja envoyée";
}

?>
