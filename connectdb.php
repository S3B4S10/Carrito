<?php
  $server = 'localhost';
  $username = 'root';
  $password = '';
  $database = 'parcialminimercado';

  try{
    $conn = new PDO("mysql:host=$server;dbname=$database;",$username,$password);
    echo "conectado";
  } catch(PDOException $e){
    die('Connection failed: '.$e->getMessage()); 
  }

?>
