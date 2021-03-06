<?php
  session_start();

  require 'connectdb.php';
  
?>


<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
  content="width=device-width,initial-scale=1.0">
  <title>Parcial</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
  <link href="estilos.css" rel="stylesheet" >
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js"></script>
  <script type="text/javascript"> (function() {
  emailjs.init("user_2BplPpMaxnCuawlrJ4zwd");
  })();
  </script>
</head>
<body>
     
<?php if(isset($_SESSION['nombre'])){?>
    <h1 id="h1-session">Hola de nuevo
      <span id="nombreSpan"><?= $_SESSION['nombre'];?></span>
      , gusto en verte por estos lares!
      <span class="invisible" id="mailSpan"><?= $_SESSION['mail'];?></span>
    </h1>
<?php }else {?>
  <a href="login.php">
  <button type="button" class="btn btn-primary position-relative">
    Login <span class="position-absolute top-0 start-100 translate-middle"><span class="visually-hidden">unread messages</span></span>
  </button>
  </a>

  <a href="signup.php">
  <button type="button" class="btn btn-primary position-relative">
    Registro <span class="position-absolute top-0 start-100 translate-middle"><span class="visually-hidden">unread messages</span></span>
  </button>
  </a>
    <h1 id="h1-session">
      <span class="invisible" id="nombreSpan">#</span>
      <span class="invisible" id="mailSpan">#</span>
    </h1>
<?php } ?>
<br>
<br>
<h1 class="text-center" id="titulo">-------------------
 Tienda JyS
-------------------</h1><br>


  <div class="container overflow-hidden" id="productos">
    <div class="row gx-5">
      <div class="col">
        <div class="card" id="1">
          <img src="https://images-na.ssl-images-amazon.com/images/I/81F2IPqpljL._SL1500_.jpg" class="card-img-top" >
            <div class="card-body">
              <h5 class="card-title">Fifa 21</h5>
              <p class="card-text">2000</p>
              <a href="#" class="btn btn-primary">Agregar</a>
            </div>
          </div>
        </div>
      <div class="col">
        <div class="card" id="2" >
            <img src="https://images-na.ssl-images-amazon.com/images/I/71R-0noHgzL._SL1346_.jpg" class="card-img-top" >
            <div class="card-body">
              <h5 class="card-title">NBA 2K21</h5>
              <p class="card-text">2000</p>
              <a href="#" class="btn btn-primary">Agregar</a>
            </div>
          </div>
        </div>
      <div class="col">
      <div class="card" id="3" >
          <img src="https://images-na.ssl-images-amazon.com/images/I/81poXdBNmRL._SL1500_.jpg" class="card-img-top" >
          <div class="card-body">
            <h5 class="card-title">Vikings</h5>
            <p class="card-text">2000</p>
            <a href="#" class="btn btn-primary">Agregar</a>
            </div>
          </div>
      </div>
      <div class="col" >
        <div class="card" id="4">
          <img src="https://images-na.ssl-images-amazon.com/images/I/91ftcNv8XvL._SL1500_.jpg" class="card-img-top" >
            <div class="card-body">
              <h5 class="card-title">Red dead redemption 2</h5>
              <p class="card-text">2000</p>
              <a href="#" class="btn btn-primary">Agregar</a>
            </div>
        </div>
      </div>
      <div class="col">
        <div class="card"id="5" >
          <img src="https://images-na.ssl-images-amazon.com/images/I/71rF66%2B%2Bv8S._SL1000_.jpg" class="card-img-top" >
          <div class="card-body">
            <h5 class="card-title">Need for Speed</h5>
            <p class="card-text">2000</p>
            <a href="#" class="btn btn-primary">Agregar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="my-5" id="carrito">
    <h4>Carrito de compras</h4>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Valor sin iva</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody id="items"></tbody>
      <tfoot>
        <tr id="totales">
          <th scope="row" colspan="5">Carrito vac??o - comienza a comprar!</th>
        </tr>
      </tfoot>
    </table>
  </div>
    <template id="template-carrito">
      <tr>
        <th scope="row" id="idProducto" ></th>
        <td id="name"></td>
        <td>
            <button class="btn btn-info btn-sm" id="btn+">
                +
            </button>
            <span id="cantidad"></span>
            <button class="btn btn-danger btn-sm" id="btn-">
                -
            </button>
        </td>
        <td>$ <span id="iva"></span></td>
        <td>$ <span id="precio"></span></td>
      </tr>
    </template>
      <template id="template-totales">
        <th scope="row" colspan="2">Total productos</th>
        <td id="cantidadTotal"></td>
        <td class="font-weight-bold">$ <span id="ivaTotal"></span>
            
        </td>
        <td class="font-weight-bold">$ <span id="valorTotal"></span>
        <button class="btn btn-dark" id="comprar">
              Comprar
        </button>
        
        </td>
    </template>
    
<?php if(isset($_SESSION['nombre'])){?>
<a href="logout.php"><button type="button" id="buttonSalir">SALIR </button></a>
<?php } ?>
<script src="carritoScript.js"></script>
</body>

</html>