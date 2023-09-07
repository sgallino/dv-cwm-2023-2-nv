// Funciones que sirven para interactuar con el chat.
import {db} from './firebase.js';
import {addDoc, collection, onSnapshot, serverTimestamp, query, orderBy} from "firebase/firestore";

const refChat = collection(db, 'chats');

export function chatSaveMessage(data) {
    /*
     |--------------------------------------------------------------------------
     | Grabando datos
     |--------------------------------------------------------------------------
     | Para grabar datos en una collection, solo necesitamos llamar a la función addDoc, pasándole
     | 2 cosas:
     | 1. La referencia de la collection donde quiero insertar el documento.
     | 2. Un objeto con los datos a insertar.
     | La función retorna una promesa que se completa cuando el documento se grabó correctamente.
     */
    return addDoc(refChat, {
        ...data,
        // serverTimestamp() le pide a Firebase que use la fecha y hora del servidor al momento de 
        // almacenar los datos.
        created_at: serverTimestamp(),
    });
}

export function chatSubscribeToMessages(callback) {
    /*
    |--------------------------------------------------------------------------
    | Leyendo datos de Firestore en tiempo real
    |--------------------------------------------------------------------------
    | Si queremos leer los datos en tiempo real, es decir, que se actualicen automáticamente tan pronto
    | haya datos nuevos en el servidor, es bastante sencillo.
    | Tenemos que primero, cambiar la función que usamos. En vez de "getDocs" vamos a usar "onSnapshot".
    | Esta función no retorna una promesa, sino que recibe un segundo parámetro que es un "callback"
    | con lo que queremos hacer cada vez que haya nueva data.
    */

    /*
    Ahora queremos traer los mensajes de chat ordenados por su fecha de creación.
    Para hacer esto, necesitamos crear un "query".
    Los queries se crean con la función "query()", y necesita al menos 2 parámetros:
    1. Una referencia de una Collection, que es la que queremos aplicar alguna búsqueda o filtro.
    2. El filtro que queremos aplicar.

    Puede recibir tantos filtros como necesitemos, pero al menos necesitamos 1.

    Si queremos ordenar, usamos la función orderBy, que recibe como argumento el nombre del campo
    por el cual queremos ordenar.
    Por defecto, el orden es ascendente. Si queremos cambiarlo, lo podemos hacer pasando "desc" como
    segundo parámetro.

    Una vez armado el query, lo podemos usar con cualquiera de las funciones de Firestore que aceptan
    una referencia de una collection, como onSnapshot.
    */
    const q = query(refChat, orderBy('created_at'));

    onSnapshot(q, snapshot => {
        // Transformamos el snapshot a un array de objetos que tengan solo los datos de cada mensaje.
        const data = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                user: doc.data().user,
                message: doc.data().message,
                created_at: doc.data().created_at.toDate(),
            };
        });

        // Invocamos el callback recibido por parámetro con el array de objetos creado.
        callback(data);
    });
}
