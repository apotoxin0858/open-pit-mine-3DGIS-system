<?php
   session_start();
   unset( $_SESSION['valid_user']);
   session_destroy();
//    setcookie(session_name(),'',time()-1,'/');
   header('location:../index.html');
?>
