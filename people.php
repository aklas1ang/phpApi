<?php
header('Access-Control-Allow-Origin: *');
require_once 'peopleModel.php';


if(isset($_POST['single'])){
    $id = $_POST['single'];
    $result = $conn->getData($id);
    echo json_encode($result->fetch_assoc());
}else if(isset($_POST['create'])){
    $conn->insertData($_POST['fullname'], $_POST['email'], $_POST['gender']);
    echo "Successfully Created Data!";
}else if(isset($_POST['update'])){
    $conn->updateData($_POST['id'],$_POST['fullname'], $_POST['email'], $_POST['gender']);
    echo "Successfully Updated Data";
}else if(isset($_POST['delete'])){
    $conn->deleteData($_POST['delete']);
    echo "Successfully Deleted Data";
}else{
    $array = array();
    $result = $conn->getData();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $array[] = $row;
        }
        echo json_encode($array);
    }
    
}


