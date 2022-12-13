//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];



//Funciones
const agregarCurso = e => {
    //como no tiene href, previene que se mueva hacia arriba la pagina
    e.preventDefault();

    //Comprueba que se haya hecho click en el correspondiente boton de "Agregar carrito"
    if (e.target.classList.contains('agregar-carrito')) {
        //selecion el contener padre, y este a su padre
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCursos(cursoSeleccionado)
    }
}

//Elimina un curso del carrito
const eliminarCurso = e => {
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina el arreglo de arriba carrito poor el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        
        //Iterar sobre carrito y mostrar su HTML
        carritoHTML()
    }
};

//Lee el contenido de HTML al que le dimos click y extrae la info del curso
const leerDatosCursos = curso => {
    //console.log(curso);

    //Objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        //Actualiza la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso//retorna los objetos duplicados actualizados
            }else{
                return curso//retorna los objetos que no se duplicaron
            }
        })
        articulosCarrito = [...cursos]
    }else{
        //Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    console.log(existe);

    carritoHTML()
    console.log(articulosCarrito);
}

//Muestra el carrito de compras en el HTML
const carritoHTML = () => {
    //Limpiar el HTML
    limpiarHTML()

    //Recorre el carrito y genera HTML
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        //distructuring
        const {imagen, titulo, precio,cantidad, id} = curso
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id=${id}> X </a></td>
        `;
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
const limpiarHTML = () => {
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}



const cargarEventListeners = () => {
    //Cuando agregas un curso presionando "Agregar carrito"
    listaCursos.addEventListener('click', agregarCurso)

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        //Reseteamo el arreglo
        articulosCarrito = [];

        //Eliminamos todo el HTML
        limpiarHTML();
    })
}
cargarEventListeners()