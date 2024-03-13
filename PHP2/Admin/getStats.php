<?php

    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();

    $Year=date("Y");
    $month= intval(date("m"));

    $query=mysqli_query($conn,"SELECT count(*) as nbreClient FROM client");
    $query2=mysqli_query($conn,"SELECT sum(prix_ttc) as unpaid FROM facture WHERE statu=0");
    $query3=mysqli_query($conn,"SELECT count(*) as nbreRecla FROM reclamation WHERE statu=0");
    $query4=mysqli_query($conn,"SELECT count(*) as nbreAnomalie FROM facture WHERE statu=2");
    $query5=mysqli_query($conn,"SELECT sum(f.prix_ttc) as revenue FROM facture f INNER JOIN consommation_mensuelle c ON f.id_consommation=c.id  WHERE c.mois='$month' and c.annee='$Year' and f.statu!=2");

    $row=mysqli_fetch_assoc($query);
    $nbreClient=$row['nbreClient'];
    $row=mysqli_fetch_assoc($query2);
    $unpaid=$row['unpaid'];
    $row=mysqli_fetch_assoc($query3);
    $nbreRecla=$row['nbreRecla'];
    $row=mysqli_fetch_assoc($query4);
    $nbreAnomalie=$row['nbreAnomalie'];
    $row=mysqli_fetch_assoc($query5);
    $revenue=$row['revenue'];

    $objct=new stdClass();
    $objct->clients=$nbreClient;
    $objct->unpaid=$unpaid;
    $objct->reclamation=$nbreRecla;
    $objct->anomalie=$nbreAnomalie;
    $objct->revenue=$revenue;

    $objct=json_encode($objct);
    echo $objct;

?>