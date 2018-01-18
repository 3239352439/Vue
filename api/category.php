<?php
    header('Access-Control-Allow-Origin:*');

    include "DBHelper.php";

    $cateSamll = isset($_GET['cateSamll']) ? $_GET['cateSamll'] : "";
    $sql;

    if( $cateSamll !==''){
      $sql = "select * from category,classifysmall  where category.categoryId= '$cateSamll' and category.categoryId = classifysmall.classifyBigId";
    }else {
<<<<<<< HEAD
      $sql = "select * from category";
=======
      $sql = "select * from category,classifysmall  where category.categoryId = classifysmall.classifyBigId";
>>>>>>> f8e00201ef0ce0bf975a111c219dbb7e6f54e2a4
    }

    $result = query_oop($sql);

   	echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>
