<?php
    header('Access-Control-Allow-Origin:*');
    header("Content-Type: text/html;charset=utf-8"); 
    include "DBHelper.php";
    $type=isset($_GET['type'])?$_GET['type']:'';
    $uid=isset($_GET['uid'])?$_GET['uid']:'';
    if($uid){
        $sql="select * from car where userId=$uid";
    }
   else if($type){
        $sql="select * from product,productimg where  product.goodId=productimg.goodId and product.classifySmallId in (select classifySmallId from classifysmall  where classifyBigId=(select categoryId from category where categoryName='$type') )";  
        // var_dump($sql);
    }
    else{
      $sql="select * from category";

    }
     $result =query_oop($sql);
     echo json_encode($result, JSON_UNESCAPED_UNICODE); 
?>