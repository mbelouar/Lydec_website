<?php

    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();
    $file=file_get_contents('php://input');
    $data=json_decode($file);
    $id=$data->Id;

    $query="SELECT c.nom as nom, c.prenom as prenom, ca.Annee as annee, ca.consommation as conso, ca.STATUS as statu, ca.dateDeSaisie as dateS
            FROM consommation_annuelle ca INNER JOIN 
            client c ON c.id=ca.id_client
            WHERE ca.id_client=$id ORDER BY ca.Annee DESC";
    $getConsoAnn=mysqli_query($conn,$query);

    $tab=array();
    while($row=mysqli_fetch_assoc($getConsoAnn)){
        $objct=new stdClass();
        $objct->nom=$row['nom'];
        $objct->prenom=$row['prenom'];
        $objct->annee=$row['annee'];
        $objct->conso=$row['conso'];
        $objct->status=$row['statu'];
        $objct->date=$row['dateS'];
        $tab[]=$objct;
    }

    $objctF=json_encode($tab);
    echo $objctF;

?>