<?php
      
  session_start();
  $id=$_SESSION["id"];

  require('../utils/cors.php');
  require('../utils/connexion.php');

  $file=file_get_contents("php://input");
  $choices=json_decode($file);
  $annee=$choices->annee;
  $status=$choices->status;
  $query='';
  if($status==-1){
    $query="SELECT f.id as id ,f.statu as statu , f.prix_ttc as montant, c.mois as mois, c.annee as annee
          FROM consommation_mensuelle c  
          INNER JOIN facture f on f.id_consommation=c.id
          WHERE c.id_client=$id and c.annee='$annee'";
  }else{
    $query="SELECT f.id as id ,f.statu as statu , f.prix_ttc as montant, c.mois as mois, c.annee as annee
          FROM consommation_mensuelle c  
          INNER JOIN facture f on f.id_consommation=c.id
          WHERE c.id_client=$id and c.annee='$annee' and f.statu=$status";
  }
  $conn=setConnection();

  $getData=mysqli_query($conn,$query);

  $facturesTab=array();
  if(mysqli_num_rows($getData) !== 0){
    while($row=mysqli_fetch_assoc($getData)){
        $objct=new stdClass();
        $objct->id=$row['id'];
        $objct->status=$row['statu'];
        $objct->montant=$row['montant'];
        $objct->mois=$row['mois'];
        $objct->annee=$row['annee'];
        $facturesTab[]=$objct;
    }

    $ObjctF=new stdClass();
    $ObjctF->data=$facturesTab;

    $ObjctF=json_encode($ObjctF);
    echo $ObjctF;
}else{
    $ObjctF=new stdClass();
    $ObjctF->msg="No Data Found";

    $ObjctF=json_encode($ObjctF);
    echo $ObjctF;
}
?>