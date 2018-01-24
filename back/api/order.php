<?php
    // 订单状态(status)：0，待付款；1，已付款；2，待收货；3，确认收货；4，待评价；5，已完成；6，已取消

    include 'DBHelper.php';
    $phone = isset($_GET['phone']) ? $_GET['phone'] : "";
    $status = isset($_GET['status']) ? $_GET['status'] : "";
    $state = isset($_GET['state']) ? $_GET['state'] : "";
    $orderId = isset($_GET['orderId']) ? $_GET['orderId'] : "";
    $goodId = isset($_GET['goodId']) ? $_GET['goodId'] : "";
    $data = isset($_GET['data']) ? $_GET['data'] : "";
    
    if($state == 'get' && $phone != ""){
        $sql = "SELECT product.goodId,`order`.orderId,`order`.`status`,goodName,Price,productimg.ImgUrl,`order`.time FROM product INNER JOIN ordergoods on product.goodId = ordergoods.goodId INNER JOIN `order` on ordergoods.orderId = `order`.orderId INNER JOIN `user` on `user`.userId = `order`.userId INNER JOIN productimg on productimg.goodId = product.goodId WHERE `order`.userId = (SELECT userId FROM `user` WHERE phone = '$phone')";
        if($status != ""){
            $sql .= " and `order`.status = '$status'";
        }
        if($orderId != ""){
            $sql .= " and `order`.orderId = '$orderId'";
        }
        $result = query_oop($sql);
        if($result){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo 'false';
        }
    }else if($state == 'update' && $phone != "" && $status != ""){
        // 更新订单状态
        $sql = "UPDATE `order` SET `order`.`status` = '$status' WHERE `order`.userId = (SELECT userId from `user` WHERE phone = '$phone') and `order`.orderId = '$orderId'";
        $result = excute_oop($sql);
        if($result){
            echo 'ok';
        }else{
            echo 'false';
        }
    }else if($state == 'del' && $phone != ""){
        $sql = "DELETE FROM `order` WHERE userId = (SELECT userId from `user` WHERE phone = '$phone') and orderId = '$orderId'";
        $result = excute_oop($sql);
        $sql1 = "DELETE FROM ordergoods WHERE orderId = '$orderId'";
        $result1 = excute_oop($sql1);
        if($result){
            echo 'ok';
        }else{
            echo 'false';
        }
    }else if($state == 'search'){
        $sql = "select `order`.orderId,`user`.phone,`order`.`status`,`order`.time from `order` INNER JOIN `user` on `user`.userId = `order`.userId WHERE `order`.orderId LIKE '%$data%' or `user`.phone like '%$data%' or `order`.`status` like '%$data%'";
        $result = query_oop($sql);
        if($result){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo 'false';
        }
    }else{
        $sql = "select `order`.orderId,`user`.phone,`order`.`status`,`order`.time from `order` INNER JOIN `user` on `user`.userId = `order`.userId ";
        $result = query_oop($sql);
        if($result){
            echo json_encode($result,JSON_UNESCAPED_UNICODE);
        }else{
            echo 'false';
        }
    }
?>