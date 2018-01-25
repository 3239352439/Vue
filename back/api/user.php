<?php
    include 'DBHelper.php';
    $data = isset($_GET['data']) ? $_GET['data'] : "";
    if($data){  
         $sql="select userName,password,phone,headeImg,time from user where userName like '%$data%' or password like '%password%' or phone like '%phone%' or headeImg like '%headeImg%' or time like '%time%' ";
    }
    else{
         $sql="select userName,password,phone,headeImg,time from user";
    }
    $result = query_oop($sql);
    echo json_encode($result,JSON_UNESCAPED_UNICODE);
?>