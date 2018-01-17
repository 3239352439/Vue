<?php
    include 'DBHelper.php';
    $phone = isset($_GET['phone']) ? $_GET['phone'] : "";
    $password = isset($_GET['password']) ? $_GET['password'] : "";
    
    if($password == "" && $phone != ""){
        $sql = "select * from user where phone = '$phone'";

        $result = query_oop($sql);
        // 输出结果
        if($result){
            // 表示用户名已存在
            echo 'false';
        }else{
            // 表示用户名可用
            echo 'true';
        }
    }else if($password != "" && $phone != ""){
        
        // 给密码加密
        $password = md5($password);

        // 将数据写入数据库并返回信息
        // 将数据写进数据库
        $sql = "insert into user(phone,password) values ('$phone','$password')";

        $result = excute_oop($sql);
        // var_dump($result);
        // 获取查询结果
        // $row = $result->fetch_all(MYSQLI_ASSOC);
        if($result){
            // 插入成功
            echo "true";
        }else{
            echo "fail";
        }
    }
    // 关闭连接
    // $conn->close();
?>