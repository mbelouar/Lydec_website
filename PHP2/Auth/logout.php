<?php
    require('../utils/cors.php');
    session_start();
    session_unset();
    echo (session_destroy() ? 'true' : 'false'); 
?>