
window.onload = function main() {
   all();

}

function all () {
 const botones = document.querySelectorAll('.card a');
 let carrito = {};
 const items = document.getElementById('items')
 const totales = document.getElementById('totales')
 const fragmentTotales = document.createDocumentFragment()


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
    totales.innerHTML = ''

    if (Object.keys(carrito).length === 0) {
        totales.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
        `
        return
    }

    const template1 = document.querySelector('#template-footer').content
    

    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    template1.querySelectorAll('td')[0].textContent = nCantidad
    template1.querySelector('span').textContent = nPrecio

    const clone = template1.cloneNode(true)
    fragmentTotales.appendChild(clone)

    totales.appendChild(fragmentTotales)


    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        totales.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
        `
       items.innerHTML = '';
    })
      
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