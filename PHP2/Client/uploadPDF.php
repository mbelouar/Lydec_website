<?php
require('../utils/cors.php');
require('../utils/connexion.php');

$conn=setConnection();

$id=$_REQUEST['id'];
$query="SELECT f.prix_ttc as prix_ttc,f.prix_ht as prix_ht,f.consommation as consommation,cl.nom as nom,cl.prenom as prenom,cl.adresse as adresse, c.mois as mois, c.annee as annee
        FROM consommation_mensuelle c
        INNER JOIN facture f  ON f.id_consommation=c.id
        INNER JOIN client cl ON c.id_client=cl.id
        WHERE f.id=$id";
$getInfo=mysqli_query($conn,$query);
$row=mysqli_fetch_assoc($getInfo);

$prix_ttc=$row['prix_ttc'];
$prix_ht=$row['prix_ht'];
$consommation=$row['consommation'];
$nom=$row['nom'];
$prenom=$row['prenom'];
$adresse=$row['adresse'];
$mois=$row['mois'];
$annee=$row['annee'];

// create new PDF document
require('../lib/tcpdf_import.php');
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
// remove default header/footer
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

// set some language-dependent strings (optional)
/*if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}*/

// ---------------------------------------------------------

// set default font subsetting mode
$pdf->setFontSubsetting(true);

// Set font
// dejavusans is a UTF-8 Unicode font, if you only need to
// print standard ASCII chars, you can use core fonts like
// helvetica or times to reduce file size.
$pdf->SetFont('dejavusans', '', 14, '', true);

// Add a page
// This method has several options, check the source code documentation for more information.
$pdf->AddPage();
// Set some content to print
$html = "<div class='container'>
<div class='invoice'>
  
<table class='row'>
<tr>
    <td>
       <img style=\"width:75px , height: 75px\" src=\"../uploads/lydec.jpg\" />
    </td>
    <td>
    <p style=\"font-size:12px\">Facture d'electricite:".$id." رقم الكهرباء فاتورة  </p>
    <p style=\"font-size:12px\">Du date : ".$mois."/".$annee."  بتاريخ</p>
    </td>
</tr>
</table>
   
  
  <br>
  <br>
  <br>
  <table class=\"row\" >
    <tr class=\"col-7\">
      <td class=\"padding:10px\" style=\"height: 50px;\">
        
        <strong>".$nom." ".$prenom."</strong><br>
        ".$adresse."
      </td>
      
    </tr>
  </table>
  <br>
  <br>
  <table><tr><td><p style=\"font-size:23px\">Avis de Facturation  <span style=\"color:rgb(109, 176, 26)\">Electricite </span>إشعار بالفاتورة </p></td></tr></table>
  <br>
  <br>
  <br>
  <br>
  <table class=\"table table-striped\">
    <thead>
      <tr>
        <th style=\"font-weight: bold;width: 200px;\"></th>
        <th style=\"font-weight: bold;width: 200px;height: 50px;\">Consommation</th>
        <th style=\"font-weight: bold;width: 200px;\">Prix</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style=\"font-weight: bold;width: 200px;color:rgb(0,139,202); height: 50px;\">Electricite</td>
        <td style=\"color:rgb(0,139,202);width: 200px;\">".$consommation." Kwh</td>
        <td style=\"color:rgb(0,139,202);width: 200px;\">".$prix_ht."DH</td>
        <td style=\"width: 200px;\"></td>
      </tr>
      <tr>
        <td style=\"font-weight: bold;width: 200px;height: 50px;\">Taxes</td>
        <td style=\"width: 200px;\">15%</td>
        <td style=\"width: 200px;\">".($prix_ht * 0.15)." DH</td>
        <td style=\"width: 200px;\"></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      </tbody>
      </table>
      <table>
        <tr>
        <td style=\"font-weight: bold;width:150px\">Net a payer *</td>
        <td style=\"font-weight: bold;background-color: rgb(109, 176, 26);width:200px;text-align:center\">".$prix_ttc." DH</td>
        <td style=\"font-weight: bold;width:150px;text-align:right\">الواجب أداؤه *</td>
        <td></td>
        </tr>
      </table>
</div>
</div>";

// Print text using writeHTMLCell()
//$pdf->writeHTMLCell(0,0, '', '', $html, 0, 1, 0, true, '', false);
$pdf->writeHTML($html, true, false, true, false, '');
// ---------------------------------------------------------

// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('facture.pdf', 'D');

//============================================================+
// END OF FILE
//============================================================+
    
?>