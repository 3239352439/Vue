<?php
    header('Access-Control-Allow-Origin:*');
    include "DBHelper.php";
    $uid=isset($_GET['uid'])?$_GET['uid']:'';
    if($uid){
        $sql="select o.userId,g.* from `order` o ,ordergoods g where o.userId=$uid and o.orderId=g.orderId;";
    }
    else{
        $sql="select * from address"; 
    }
     $result =query_oop($sql);
     echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>