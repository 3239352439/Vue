<?php
    header('Access-Control-Allow-Origin:*');
    header("Content-Type: text/html;charset=utf-8"); 
    include "DBHelper.php";
    $allType=isset($_GET['allType'])?$_GET['allType']:'';
    $uid=isset($_GET['uid'])?$_GET['uid']:'';
    $sql1='';
   
    if($uid){
        // $sql="select * from product;";
        // $sql.="select * from car c,product p where c.userId=$uid and c.goodId=p.goodId;";
        // $res =array2object(multi_query_oop($sql));
        // $result=array_merge($res->data1,$res->data2);  
        // $arr_new_obj = Array();
        // $count = count($result);
        // for( $i=0;$i<$count;$i++){
        //         //得到对象数组的第一个值，
        //         for($j=$i+1;$j<$count;$j++){
        //             //将第一个对象和其他值比较，
        //             if( $arr_new_obj[ i ] == $arr_new_obj[ j ] ){
        //                             //相等，就将第一个删除；依次类推
        //                 unset( $arr_new_obj[ i ] );
        //                 }
        //         }
        // }
        //  var_dump($arr_new_obj );
    }
   else if($allType){
       $sql="";
       $typeArr=explode(',',$allType);
       foreach($typeArr as $val){
            $sql.="select * from product,productimg where  product.goodId=productimg.goodId and product.classifySmallId in (select classifySmallId from classifysmall  where classifyBigId=(select categoryId from category where categoryName='$val') );";
         }
        $result =multi_query_oop($sql);
        
    }
    else{
        $sql="select * from category";
        $result =query_oop($sql); 
    }
    

    // arr->obj
    function array2object($array) {
    if (is_array($array)) {
        $obj = new StdClass();
        foreach ($array as $key => $val){
        $obj->$key = $val;
        }
    }
    else { $obj = $array; }
    return $obj;
    }
    // // obj->arr
    function object2array($object) {
    if (is_object($object)) {
        foreach ($object as $key => $value) {
        $array[$key] = $value;
        }
    }
    else {
        $array = $object;
    }
    return $array;
    }  
      echo json_encode($result, JSON_UNESCAPED_UNICODE);     
?>