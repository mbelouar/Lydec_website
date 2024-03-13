<?php
   function setConnection(){
     $conn=mysqli_connect("localhost","root",'',"electricity",3306);
     if(mysqli_connect_errno())
        echo "Problem de connexion a la BD";
     else
        return $conn;
   }
?>