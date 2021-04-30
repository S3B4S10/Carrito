
window.onload = function main() {
   all();

}

function all () {
    
for(i=1;i<5;i++){

    
    var producto = document.getElementById(i+1);
    var imagen = document.createElement('img');
    var contenedor= document.createElement('div');
    var nombre= document.createElement('h5');
    var precio= document.createElement('p');
    var boton= document.createElement('a');
    
    producto.className= "card";

    
    imagen.className="card-img-top"

   
    contenedor.className="card-body";

    

    boton.className="btn btn-primary";
    nombre.className="card-title";
    precio.className="card-text";
    nombre.textContent = "Elemento ";
    precio.textContent= "$2000";
    boton.textContent="Agregar"
  
    contenedor.appendChild(nombre);
    contenedor.appendChild(precio);
    contenedor.appendChild(boton);
    producto.appendChild(imagen);
    producto.appendChild(contenedor);
}
    

    
    
   
}