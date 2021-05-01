<?php
require 'connectdb.php';

$message = '';

  if ((!empty($_POST['nombre'])) && (!empty($_POST['apellido'])) && (!empty($_POST['mail'])) && !empty($_POST['clave'])) {
    $sql = "INSERT INTO usuario (userNombre, userApellido, mail, clave) VALUES (:nombre, :apellido, :mail, :clave)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nombre', $_POST['nombre']);
    $stmt->bindParam('apellido', $_POST['apellido']);
    $stmt->bindParam(':mail', $_POST['mail']);
    $password = password_hash($_POST['clave'], PASSWORD_BCRYPT);
    $stmt->bindParam(':clave', $password);

    if ($stmt->execute()) {
      $message = '!!Nuevo usuario registrado!!';
    } else {
      $message = 'Algo salio mal';
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <?php if(!empty($message)){ ?> 
  <p>: <?= $message; }?></p>


  <h1>Registrate</h1>

  <form action="signup.php" method="POST">
    <input type="nombre" name="nombre" placeholder="Nombre">
    <input type="apellido" name="apellido" placeholder="Apellido">
    <input type="mail" name="mail" placeholder="Mail">
    <input type="password" name="clave" placeholder="Contraseña">
    <input type="submit" value="Listo"><br>
  </form>

  <p>¿Ya tienes una cuenta? <a href="login.php">  <input type="submit" value="INGRESA"></a></p>
</body>
</html>