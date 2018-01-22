<?php
    header('Access-Control-Allow-Origin:*');
    header("Content-Type: text/html;charset=utf-8"); 
    include "DBHelper.php";
     $sql="select * from category";
     $result =query_oop($sql);
     echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>