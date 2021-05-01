<?php

  require 'connectdb.php';

  if (!empty($_POST['mail']) && !empty($_POST['clave'])) {
    $stmt = $conn->prepare('SELECT userId, mail, clave FROM usuario WHERE mail = :mail');
    $stmt->bindParam(':mail', $_POST['mail']);
    $stmt->execute();
    $stmtexe = $stmt->fetch(PDO::FETCH_ASSOC);
    $message = '';

    if (count($stmtexe) > 0 && ($_POST['clave'] == $stmtexe['clave'])) {
      header("Location:  CarritoCompras.html");
      
    } else {
      $message = 'Usuario o contraseña incorrecta';
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