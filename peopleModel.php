<?php
class Crud
{
    public $conn;

    public function __construct()
    {
        $this->conn = new mysqli('192.168.0.29', 'ajaxcrud', 'ajaxcrud123', 'ajax');

        if (!$this->conn) {
            mysqli_connect_error();
        }
    }

    public function getData($id = null)
    {
        if($id === null){
            $sql = 'SELECT * FROM peoples';
            $result = $this->conn->query($sql);
            return $result;
        }

        $sql = "SELECT * FROM peoples WHERE ID = ".$id."";
        $result = $this->conn->query($sql);
        return $result;

    }

    public function insertData($fullname, $email, $gender)
    {
        $sql = "INSERT INTO peoples(Fullname, Email, Gender) VALUES('$fullname', '$email', '$gender')";
        $this->conn->query($sql);
    }

    public function updateData($id, $fullname, $email, $gender){
        $sql = "UPDATE peoples SET Fullname ='$fullname', Email = '$email', Gender='$gender' WHERE ID=$id";
        $this->conn->query($sql);
    }

    public function deleteData($id){
        $sql = "DELETE FROM peoples WHERE ID='$id'";
        $this->conn->query($sql);
    }

}

$conn = new Crud();
