
window.onload = function main() {
   all();

}

function all () {
 const botones = document.querySelectorAll('.card a');
 let carrito = {};
 const items = document.getElementById('items')
 const footer = document.querySelector('#footer-carrito')

    botones.forEach(btn =>{
        btn.addEventListener('click',()=>{
            
           
                const producto= []
                producto.name=btn.parentElement.children.item(0).innerHTML;
                producto.price=btn.parentElement.children.item(1).innerHTML;
                producto.id=btn.parentElement.parentElement.id;
                producto.cantidad=1;
               if(carrito.hasOwnProperty(producto.id)){
                   
                producto.cantidad=carrito[producto.id].cantidad + 1;
               }
            
               carrito[producto.id]={...producto}
               //console.log(carrito);
               llenarCarrito();
           
            
        })
    })
    const llenarCarrito = () => {

        items.innerHTML = '';
        const template = document.getElementById('template-carrito').content;
        const fragment = document.createDocumentFragment();

        Object.values(carrito).forEach(producto => {
          
          
 
          
          template.getElementById('idProducto').textContent = producto.id;
          template.getElementById('name').textContent = producto.name;
          template.getElementById('cantidad').textContent = producto.cantidad;
          template.querySelector('span').textContent = producto.price * producto.cantidad;
    
          
           //botones
           template.getElementById('btn+').dataset.id = producto.id;
           template.getElementById('btn-').dataset.id = producto.id ;
       

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
        })
        
    items.appendChild(fragment)

    //llenarCarrito()
    //controlCantidad()

    }


const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')

    // console.log(botonesAgregar)

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log(btn.dataset.id)
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = { ...producto }
            pintarCarrito()
        })
    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log('eliminando...')
            const producto = carrito[btn.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0) {
                delete carrito[btn.dataset.id]
            } else {
                carrito[btn.dataset.id] = { ...producto }
            }
            pintarCarrito()
        })
    })
}
   
}