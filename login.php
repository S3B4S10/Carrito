<?php

session_start();

  require 'connectdb.php';

  if (!empty($_POST['mail']) && !empty($_POST['clave'])) {
    $stmt = $conn->prepare('SELECT userId, userNombre, mail, clave FROM usuario WHERE mail = :mail');
    $stmt->bindParam(':mail', $_POST['mail']);
    $stmt->execute();
    $stmtexe = $stmt->fetch(PDO::FETCH_ASSOC);
 
    $nombre = $stmtexe['userNombre'];
    $mail = $stmtexe['mail'];


    if (count($stmtexe) > 0 && ($_POST['clave'] == $stmtexe['clave'])) {
      $_SESSION['nombre'] = $nombre;
      $_SESSION['mail'] = $mail;
      header("Location: carritoCompras.php");
      echo "ok";
    } else {
      echo "Usuario o contraseña incorrecta";
    }
  }

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <link rel="stylesheet" href="estilos.css">




</head>
<body>
  <?php if(!empty($message)){ ?>
  <p> <?= $message; }?></p>


    
  <h1>Ingresa</h1>
  <form action="login.php" method="POST">
    <input type="mail" name="mail" placeholder="Mail">
    <input type="password" name="clave" placeholder="Contraseña">
    <input type="submit" value="Ingresa"><br>
  </form>
  <a href="signup.php"><input type="submit" value="Registrate"></a>

</body> 
</html>