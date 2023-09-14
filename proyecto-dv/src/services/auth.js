/*
Este archivo va a contener los métodos para interactuar con la autenticación, así como funcionar como
única fuente de verdad (single source of truth) de los detalles de la autenticación.

Para manejar los datos del estado de autenticación, va a guardarlos en variables, y va a ofreccer una
interfaz de un "Observer" para poder pedir esa información en tiempo real. Es decir, que puedan ser 
notificados instantáneamente cuando ocurra algún cambio.

¿Qué es un "observer"?
Observer es un patrón de diseño.
Este patrón sirve cuando tenemos un dato que puede cambiar con el tiempo, y existen muchos otros lugares
(ej: funciones, clases, componentes, etc) que necesitan enterarse de esos cambios en el momento.
Funciona definido un "Subject" (sujeto), que es la data que queremos "observar" para enterarnos de sus
cambios.
Ese sujeto va a permitir asociar uno o más "Observers" (observadores), que son los interesados en saber
los cambios. En general, los observers suelen ser clases o funciones, dependiendo el lenguaje.
El sujeto luego es el encargado de llevar una lista de los observadores, y de notificarles cuando ocurre
algún cambio.
El proceso de agregar un observador se suele llamar en algunos casos "listen" o "subscribe".
*/
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase.js';

let userData = {
    id: null,
    email: null,
}
let observers = [];

/**
 * Inicia sesión.
 * 
 * @param {{email: string, password: string}} user
 * @return {Promise}
 */
export function login({email, password}) {
// export function login(user) {
    // const {email, password} = user;
    // const email = user.email;
    // const password = user.password;
    // const persona = {
    //     nombre: 'Juan',
    //     apellido: 'Pérez',
    //     fechaNacimiento: '1999-02-02',
    // }
    // const {nombre, apellido} = persona;

    // const nombre = persona.nombre;
    // const apellido = persona.apellido;

    // const frutas = ['anana', 'manzana'];
    // const [anana, manzana] = frutas;
    // const anana = frutas[0];
    // const manzana = frutas[1];

    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            //  console.log("[auth.js login] Sesión iniciada. Las credenciales son: ", userCredentials);
            // userData = {
            //     id: userCredentials.user.uid,
            //     email: userCredentials.user.email,
            // };

            // // Notificamos a todos los observadores.
            // notifyAll();
            setUserData({
                id: userCredentials.user.uid,
                email: userCredentials.user.email,
            });

            return {...userData};
        })
        .catch(error => {
            return {
                code: error.code,
                message: error.message,
            }
        });
}

/**
 * 
 * @returns {Promise}
 */
export function logout() {
    const promise = signOut(auth);
    clearUserData();
    // userData = {
    //     id: null,
    //     email: null,
    // }
    // notifyAll();
    return promise;
}

/**
 * Agrega un observer (callback) para ser notificado de los cambios en el estado de autenticación.
 * El observer debe ser una función que reciba como argumento un objeto y no retorne nada.
 * 
 * @param {({id: null|string, email: null|string}) => void} observer 
 */
export function subscribeToAuth(observer) {
    // Agregamos el observer a la lista.
    observers.push(observer);

    // Ejecutamos el observer inmediatamente con la data actual.
    notify(observer);
}

/**
 * Notifica a todos los observers de los datos de la autenticación.
 */
function notifyAll() {
    observers.forEach(observer => notify(observer));
}

/**
 * Notifica a un observador de los datos.
 * 
 * @param {({id: null|string, email: null|string}) => void} observer 
 */
function notify(observer) {
    observer({...userData});
}

/**
 * 
 * @param {{id: null|string, email: null|string}} newData 
 */
function setUserData(newData) {
    userData = {
        ...userData,
        ...newData,
    }
    notifyAll();
}

function clearUserData() {
    setUserData({
        id: null,
        email: null,
    });
}

export function getUserData() {
    return {...userData};
}