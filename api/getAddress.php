<?php
    header('Access-Control-Allow-Origin:*');
    include "DBHelper.php";
     $sql="select * from address";
     $result =query_oop($sql);
     echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>