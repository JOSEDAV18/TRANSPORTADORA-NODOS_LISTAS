const readlineSync = require('readline-sync');

class Producto {
    constructor(numero, nombre, largo, ancho, profundidad) {
        this.numero = numero;
        this.nombre = nombre;
        this.largo = largo;
        this.ancho = ancho;
        this.profundidad = profundidad;
    }

    calcularDimensiones() {
        return this.largo * this.ancho * this.profundidad;
    }

    calcularCosto() {
        return this.calcularDimensiones() * 100;
    }

    calcularImpuesto() {
        const dimensiones = this.calcularDimensiones();
        if (dimensiones > 10000) {
            return this.calcularCosto() * 0.2;
        } else if (dimensiones > 1000) {
            return this.calcularCosto() * 0.1;
        } else {
            return 0;
        }
    }

    costoConImpuesto() {
        return this.calcularCosto() + this.calcularImpuesto();
    }
}

class NodoProducto {
    constructor(producto) {
        this.valor = producto;
        this.siguiente = null;
    }
}

class ListaProductos {
    constructor() {
        this.cabeza = null;
    }

    insertar(producto) {
        const nuevoNodo = new NodoProducto(producto);
        if (this.cabeza == null) {
            this.cabeza = nuevoNodo;
        } else {
            let nodoTmp = this.cabeza;
            while (nodoTmp.siguiente != null) {
                nodoTmp = nodoTmp.siguiente;
            }
            nodoTmp.siguiente = nuevoNodo;
        }
    }

    calcularCostoTotalFlete() {
        let nodoTmp = this.cabeza;
        let costoTotal = 0;
        while (nodoTmp != null) {
            costoTotal += nodoTmp.valor.costoConImpuesto();
            nodoTmp = nodoTmp.siguiente;
        }
        return costoTotal;
    }

    productoMayorDimension() {
        let nodoTmp = this.cabeza;
        let productoMayor = this.cabeza.valor;
        while (nodoTmp != null) {
            if (nodoTmp.valor.calcularDimensiones() > productoMayor.calcularDimensiones()) {
                productoMayor = nodoTmp.valor;
            }
            nodoTmp = nodoTmp.siguiente;
        }
        return productoMayor;
    }

    calcularPromedioCosto() {
        let nodoTmp = this.cabeza;
        let totalCosto = 0;
        let contador = 0;
        while (nodoTmp != null) {
            totalCosto += nodoTmp.valor.costoConImpuesto();
            contador++;
            nodoTmp = nodoTmp.siguiente;
        }
        return totalCosto / contador;
    }

    calcularTotalImpuestos() {
        let nodoTmp = this.cabeza;
        let totalImpuestos = 0;
        while (nodoTmp != null) {
            totalImpuestos += nodoTmp.valor.calcularImpuesto();
            nodoTmp = nodoTmp.siguiente;
        }
        return totalImpuestos;
    }

    mostrarTodosLosProductos() {
        let nodoTmp = this.cabeza;
        while (nodoTmp != null) {
            console.log(`Producto ${nodoTmp.valor.numero}: ${nodoTmp.valor.nombre}`);
            console.log(`Dimensiones: ${nodoTmp.valor.largo} x ${nodoTmp.valor.ancho} x ${nodoTmp.valor.profundidad} cm`);
            console.log(`Dimensiones en cm³: ${nodoTmp.valor.calcularDimensiones()}`);
            console.log(`Costo sin impuestos: $${nodoTmp.valor.calcularCosto()}`);
            console.log(`Costo con impuestos: $${nodoTmp.valor.costoConImpuesto()}`);
            console.log(`Impuesto: $${nodoTmp.valor.calcularImpuesto()}`);
            nodoTmp = nodoTmp.siguiente;
        }
    }
}

function solicitarDatosProducto(numero) {
    const nombre = readlineSync.question(`Ingrese el nombre del producto ${numero}: `);
    const largo = parseFloat(readlineSync.question(`Ingrese el largo del producto ${numero} (cm): `));
    const ancho = parseFloat(readlineSync.question(`Ingrese el ancho del producto ${numero} (cm): `));
    const profundidad = parseFloat(readlineSync.question(`Ingrese la profundidad del producto ${numero} (cm): `));
    return new Producto(numero, nombre, largo, ancho, profundidad);
}

const listaProductos = new ListaProductos();
const cantidadProductos = parseInt(readlineSync.question('Ingrese la cantidad de productos a transportar: '));

for (let i = 1; i <= cantidadProductos; i++) {
    const producto = solicitarDatosProducto(i);
    listaProductos.insertar(producto);
}

listaProductos.mostrarTodosLosProductos();
console.log(`Costo total del flete: $${listaProductos.calcularCostoTotalFlete()}`);
const productoMayor = listaProductos.productoMayorDimension();
console.log(`Producto de mayores dimensiones: ${productoMayor.nombre} con ${productoMayor.calcularDimensiones()} cm³`);
console.log(`Promedio del costo de productos en el flete: $${listaProductos.calcularPromedioCosto()}`);
console.log(`Total de impuestos del flete: $${listaProductos.calcularTotalImpuestos()}`);
