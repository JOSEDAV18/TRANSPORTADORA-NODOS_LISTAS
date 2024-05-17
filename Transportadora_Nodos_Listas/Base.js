class Salon {
    numero = '';
    cantidadDeAlumnos = 0;
}

class NodoSalon {
    valor = null;//en el valor del nodo ponemos un salon
    siguiente = null; //Es otro nodo
}

class ListaSalones {
    cabeza = null;

    insertar(salon){
        const nuevoNodo = new NodoSalon();
        nuevoNodo.valor = salon;

        //Pregunto si la lista esta vacia
        if(this.cabeza == null){
            this.cabeza = nuevoNodo;
        }
        else {
            let nodoTmp = this.cabeza;
            while(nodoTmp.siguiente != null){
                nodoTmp = nodoTmp.siguiente;
            }
            nodoTmp.siguiente = nuevoNodo;
        }
    }

    mostrarTodosLosSalones(){
        if(this.cabeza == null){
            console.log(`No hay salones para mostrar, no hay nodos en la lista`);
        }
        else {
            let nodoTmp = this.cabeza;
            let i = 1;
            while(nodoTmp != null){
                console.log(`Datos del salon numero ${i}`);
                console.log(`Numero: ${nodoTmp.valor.numero}:`);
                console.log(`Cantidad de alumnos: ${nodoTmp.valor.cantidadDeAlumnos}:`);
                nodoTmp = nodoTmp.siguiente;
                i++;
            }
        }
    }
    
    mostrarCantidadDealumnos(){
        if(this.cabeza == null){
            console.log(`No hay Alumnos`);
        }
        else {
            let nodoTmp = this.cabeza;
            let i = 1;
            let cantAlumnos= 0;

            while(nodoTmp != null){
                cantAlumnos += nodoTmp.valor.cantidadDeAlumnos;
                console.log(`Datos del salon numero ${i}`);
                console.log(`Numero: ${nodoTmp.valor.numero}:`);
                console.log(`Cantidad de alumnos: ${nodoTmp.valor.cantidadDeAlumnos}:`);
                nodoTmp = nodoTmp.siguiente;
                i++;
            }
            console.log(`La cantidaD De alumnos es: ${cantAlumnos}`);

        }
    }

    mostrarSalonConMenosEstudiantes(){
        if(this.cabeza == null){
            console.log(`No hay nodos de alumnos`);
        }
        else {
            let nodoTmp = this.cabeza;
            let i = 1;
            let salonMenorAlumnos= this.cabeza.valor;
            nodoTmp = nodoTmp.siguiente;
    
            while(nodoTmp != null){
                if(nodoTmp.valor.cantidadDeAlumnos < salonMenorAlumnos.cantidadDeAlumnos){
                    salonMenorAlumnos = nodoTmp.valor;
                }
                nodoTmp = nodoTmp.siguiente;
                i++;
            }
            console.log(`El salon con menor cantidad de alumnos es: ${salonMenorAlumnos.numero}`);
        }
    }


}

const listaSalones = new ListaSalones();

//Aqui voy a meter datos inventados, 
//en el trabajo final, estos datos se le deben preguntar al usuario
//En el trabajo final, se pueden insertar la cantidad de datos que el usuario requiera
const salon1 = new Salon();
salon1.numero = "A101";
salon1.cantidadDeAlumnos = 10;
listaSalones.insertar(salon1);

const salon2 = new Salon();
salon2.numero = "B102";
salon2.cantidadDeAlumnos = 20;
listaSalones.insertar(salon2);

const salon3 = new Salon();
salon3.numero = "C103";
salon3.cantidadDeAlumnos = 5;
listaSalones.insertar(salon3);

listaSalones.mostrarTodosLosSalones();
listaSalones.mostrarCantidadDealumnos();
listaSalones.mostrarSalonConMenosEstudiantes();