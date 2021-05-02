
window.onload = function main() {
   all();

}


function all () {
    value ="";
    const producto= [];
    const botones = document.querySelectorAll('.card a');
    let carrito = {};
    const items = document.getElementById('items');
    const totales = document.getElementById('totales');
    const fragmentTotales = document.createDocumentFragment();
    const templateTotales = document.getElementById('template-totales').content;
    const templateCarrito = document.getElementById('template-carrito').content;
    const fragmentCarrito = document.createDocumentFragment();
    const userName = document.getElementById('nombreSpan').innerText;
    const userMail = document.getElementById('mailSpan').innerText;

    if (!localStorage.empty){

        for( j = 0; j<localStorage.length; j++ ){
            producto.name = localStorage.key(1);
            
            console.log("producto.name" + producto.name);
        }

    }
    


    botones.forEach(btn =>{
        btn.addEventListener('click',()=>{
            producto.name=btn.parentElement.children.item(0).innerHTML;
            producto.price=btn.parentElement.children.item(1).innerHTML;
            producto.id=btn.parentElement.parentElement.id;
            producto.iva=(producto.price/1.19).toFixed(0);
            producto.cantidad=1;

            console.log(producto.iva);
            if(carrito.hasOwnProperty(producto.id)){
                producto.cantidad=carrito[producto.id].cantidad + 1;
            };
            carrito[producto.id]={...producto};
            llenarCarrito();
        });
       
    });
    const llenarCarrito = () => {
        items.innerHTML = '';

        Object.values(carrito).forEach(producto => {
          
            templateCarrito.getElementById('idProducto').textContent = producto.id;
            templateCarrito.getElementById('name').textContent = producto.name;
            templateCarrito.getElementById('cantidad').textContent = producto.cantidad;
            templateCarrito.getElementById('precio').textContent = producto.price * producto.cantidad;
            templateCarrito.getElementById('iva').textContent = producto.iva * producto.cantidad;
            templateCarrito.getElementById('btn+').dataset.id = producto.id;
            templateCarrito.getElementById('btn-').dataset.id = producto.id ;
            const clone = templateCarrito.cloneNode(true);
            fragmentCarrito.appendChild(clone);
        });
        
        items.appendChild(fragmentCarrito);
        totales.innerHTML = '';

        if (Object.keys(carrito).length === 0) {
            totales.innerHTML = "";
            return;
        };

        // sumar cantidad y sumar totales
        const cantidadTotal = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
        const precioTotal = Object.values(carrito).reduce((acc, {cantidad, price}) => acc + cantidad * price ,0);
        const ivaTotal=  Object.values(carrito).reduce((acc, {cantidad, iva}) => acc + cantidad * iva ,0);

        templateTotales.getElementById('cantidadTotal').textContent = cantidadTotal;
        templateTotales.getElementById('valorTotal').textContent = precioTotal;
        templateTotales.getElementById('ivaTotal').textContent = ivaTotal;

        const clone = templateTotales.cloneNode(true);
        fragmentTotales.appendChild(clone);
        totales.appendChild(fragmentTotales);

        const boton = document.getElementById('comprar');

        boton.addEventListener('click', () => {
            mensaje="";
            
            Object.values(carrito).forEach(producto => {
                value += JSON.stringify({"id" : producto.id, "nombre": producto.name, "precio": producto.price, "cantidad": producto.cantidad, "iva" : producto.iva});

                mensaje += "- " + producto.name +" Cantidad: "+ producto.cantidad+ " Precio: $"+ (producto.price * producto.cantidad)+ "\n" ;
            });
            console.log("value" + value);
            localStorage.setItem('productos',value);

            console.log(mensaje);

            if(userName != "#"){
                console.log(userName + " " + userMail);
                emailjs.send("service_mh9y83w","enviar-correos",{
                    to_name: userName,
                    message: mensaje,
                    to_email: userMail,
                });
                
                totales.innerHTML = "";
                carrito = {};
                items.innerHTML = "";    

            }
            
        });
        
        controlCantidad();
    }


    const controlCantidad = () => {
        const botonesAgregar = document.querySelectorAll('#items .btn-info');
        const botonesEliminar = document.querySelectorAll('#items .btn-danger');
        
        botonesAgregar.forEach(btn => {
            btn.addEventListener('click', () => {
                const producto = carrito[btn.dataset.id];
                producto.cantidad ++;
                carrito[btn.dataset.id] = { ...producto };
                llenarCarrito();
            })
        })

        botonesEliminar.forEach(btn => {
            btn.addEventListener('click', () => {
                // console.log('eliminando...')
                const producto = carrito[btn.dataset.id];
                producto.cantidad--;
                if (producto.cantidad === 0) {
                    delete carrito[btn.dataset.id];
                } else {
                    carrito[btn.dataset.id] = { ...producto };
                }
                llenarCarrito();
            })
        })
    }
   /*  <?php if(isset($_SESSION['nombre'])){?>
            
            <button class="btn btn-dark" id="comprar">
                Comprar
            </button>
          <?php }else{ ?>
            <a href="login.php">
            <button class="btn btn-dark" id="comprar">
              Comprar
            </button>
          </a>
          <?php } ?>
        */
}