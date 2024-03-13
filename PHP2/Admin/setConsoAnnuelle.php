<?php

    require('../utils/cors.php');
    require('../utils/connexion.php');

    $conn=setConnection();

    $file=$_FILES['fichier'];
    $txt=fopen($file['tmp_name'],'r') or die("Ouverture Non Possible");
    $format=true;
    $infos=array();
    while(!feof($txt)){
        $tab=array();
        $line=fgets($txt);
        $tab=explode(':',$line);
        if(count($tab)!= 2 || !strcmp(trim($tab[0]),'') || !strcmp(trim($tab[1]),'') || is_numeric(trim($tab[1])) != 1)
            $format=false;
        else 
            $infos[trim($tab[0])]=trim($tab[1]);
    }
    if(!isset($infos['id']) || !isset($infos['annee']) || !isset($infos['consommation']))
        $format=false;
    
    if($format){
        $id=$infos['id'];
        $annee=$infos['annee'];
        $consommation=$infos['consommation'];
        $query="SELECT count(*) as numClient FROM client WHERE id=$id";
        $checkExistClient=mysqli_query($conn,$query);
        $row=mysqli_fetch_assoc($checkExistClient);
        if($row['numClient'] != 0){
            $query="SELECT * from consommation_annuelle WHERE id_client=$id and Annee=$annee ";
            $checkExist=mysqli_query($conn,$query);
            if(mysqli_num_rows($checkExist)==0){
                $date=date("Y-m-d");
                $status=1;
                $query="SELECT sum(f.consommation) as consoClient from facture f INNER JOIN
                        consommation_mensuelle c ON f.id_consommation=c.id
                        WHERE c.id_client=$id and c.annee=$annee";
                $consoClient=mysqli_query($conn,$query);
                $row=mysqli_fetch_assoc($consoClient);
                $consoClient=$row['consoClient'];
                    if(!(intVal($consommation)+50 >= intVal($consoClient)) || !(intVal($consommation)-50 <= intVal($consoClient)))
                        $status=0;
                    $query="INSERT INTO consommation_annuelle(id_client,Annee,consommation,dateDeSaisie,STATUS) VALUES($id,$annee,$consommation,'$date',$status)";
                    $insertConso=mysqli_query($conn,$query);
                    if($insertConso)
                        echo "Bien Ajouté ( Marge De ".($consoClient - $consommation)." Kwh)";
                    else
                        echo "Erreur Lors De L'insertion";
                //}
            }else{
                echo 'Consommation Annuelle Deja Saisie';
            }
        }else{
            echo "Client Inexistant";
        }
    }else{
        echo "Donnees Incorrecte";
    }

?>