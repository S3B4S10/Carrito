
window.onload = function main() {
   all();

}

function all () {
 const botones = document.querySelectorAll('.card a');
 let carrito = {};
 const items = document.getElementById('items')


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
          
          console.log(producto);
          


          template.querySelector('th').textContent = producto.id
          template.querySelectorAll('td')[0].textContent = producto.name
          template.querySelectorAll('td')[1].textContent = producto.cantidad
          template.querySelector('span').textContent = producto.price * producto.cantidad
    
          
        //botones
        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
        })
        
    items.appendChild(fragment)

    pintarFooter()
    accionBotones()

    }
    const footer = document.querySelector('#footer-carrito')
const pintarFooter = () => {

    footer.innerHTML = ''

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
        `
        return
    }

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)


    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

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