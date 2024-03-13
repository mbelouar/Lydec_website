<?php

    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();

    $file=file_get_contents('php://input');
    $data=json_decode($file);
    $id=$data->Id;

    $tabAnomalie=array();
    $tabUnpaid=array();
    $objctF=new stdClass();
    $query1='';
    $query2='';

    if(strcmp($id,"") && strcmp($id," ")){
        $query1="SELECT f.id as id ,f.statu as statu , f.prix_ttc as montant, c.mois as mois, c.annee as annee, cl.nom as nom, cl.prenom as prenom
            FROM consommation_mensuelle c  
            INNER JOIN facture f on f.id_consommation=c.id
            INNER JOIN client cl on c.id_client = cl.id
            WHERE c.id_client=$id and f.statu=2";
        $query2="SELECT f.id as id ,f.statu as statu , f.prix_ttc as montant, c.mois as mois, c.annee as annee, cl.nom as nom, cl.prenom as prenom
            FROM consommation_mensuelle c  
            INNER JOIN facture f on f.id_consommation=c.id
            INNER JOIN client cl on c.id_client = cl.id
            WHERE c.id_client=$id and f.statu=0";
    }else{
        $query1="SELECT f.id as id ,f.statu as statu , f.prix_ttc as montant, c.mois as mois, c.annee as annee, cl.nom as nom, cl.prenom as prenom
            FROM consommation_mensuelle c  
            INNER JOIN facture f on f.id_consommation=c.id
            INNER JOIN client cl on c.id_client = cl.id
            WHERE f.statu=2";
        $query2="SELECT f.id as id ,f.statu as statu , f.prix_ttc as montant, c.mois as mois, c.annee as annee, cl.nom as nom, cl.prenom as prenom
            FROM consommation_mensuelle c  
            INNER JOIN facture f on f.id_consommation=c.id
            INNER JOIN client cl on c.id_client = cl.id
            WHERE f.statu=0";
    }

    $getAnomalie=mysqli_query($conn,$query1);
    $getUnpaid=mysqli_query($conn,$query2);

    while($row1=mysqli_fetch_assoc($getAnomalie)){
        $objct=new stdClass();
        $objct->id=$row1['id'];
        $objct->statu=$row1['statu'];
        $objct->montant=$row1['montant'];
        $objct->mois=$row1['mois'];
        $objct->annee=$row1['annee'];
        $objct->nom=$row1['nom'];
        $objct->prenom=$row1['prenom'];

        $tabAnomalie[]=$objct;
    }

    while($row2=mysqli_fetch_assoc($getUnpaid)){
        $objct=new stdClass();
        $objct->id=$row2['id'];
        $objct->statu=$row2['statu'];
        $objct->montant=$row2['montant'];
        $objct->mois=$row2['mois'];
        $objct->annee=$row2['annee'];
        $objct->nom=$row2['nom'];
        $objct->prenom=$row2['prenom'];

        $tabUnpaid[]=$objct;
    }

    $objctF->anomalie=$tabAnomalie;
    $objctF->unpaid=$tabUnpaid;

    $objctF=json_encode($objctF);
    echo $objctF;

?>
