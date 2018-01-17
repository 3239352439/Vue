<?php
    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";

    $categoryId = isset($_GET['categoryId']) ? $_GET['categoryId'] : "";
    $sql;

    if( $categoryId !== ''){
      $sql = "select * from classifysmall,product,productimg where classifysmall.classifySmallId = '$categoryId' and classifysmall.classifySmallId = product.classifySmallId and product.goodId = productimg.goodId";
    } else {
      $sql = "select * from classifysmall,product,productimg
      where classifysmall.classifySmallId = product.classifySmallId
      and product.goodId = productimg.goodId";
    }


    $result = query_oop($sql);

   	echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>
