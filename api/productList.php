<?php
    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";

    $categoryId = isset($_GET['categoryId']) ? $_GET['categoryId'] : "";
    // $categoryId1 = isset($_POST['categoryId']) ? $_POST['categoryId'] : "";
    $Sort = isset($_GET['Sort']) ? $_GET['Sort'] : "";

    $sql;


    if( $categoryId !== ''){

      // if( $Sort == "DefaultSort"){
      //   $sql = "select * from classifysmall,product,productimg where classifysmall.classifySmallId = '$categoryId' and classifysmall.classifySmallId = product.classifySmallId and product.goodId = productimg.goodId ORDER BY product.Price asc";
      //    echo  'aa';

      // } else {
        $sql = "select * from classifysmall,product,productimg where classifysmall.classifySmallId = '$categoryId' and classifysmall.classifySmallId = product.classifySmallId and product.goodId = productimg.goodId";
        $result = query_oop($sql);

   	    echo json_encode($result, JSON_UNESCAPED_UNICODE);
      // }
    } else if($categoryId == '' || $categoryId == 'undefined') {
      $sql = "select * from classifysmall,product,productimg
      where classifysmall.classifySmallId = product.classifySmallId
      and product.goodId = productimg.goodId";
      $result = query_oop($sql);

   	  echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }

?>
