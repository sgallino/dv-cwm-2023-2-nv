/*
# Estructura para los chats privados
[C] => Collection
[D] => Document

Lo primero que necesitamos es una collection donde guardar los chats privados.
La idea va a ser tener un documento por cada chat entre 2 usuarios.

    [C] private-chats {
        [D] autoId: {
            ...
        }
    }

Lo que falta ahora es definir cómo guardar dos cosas:
a. Los usuarios que participan en el chat.
b. Los mensajes del chat.

Ambos casos son listas de datos. El primero es para este caso solo 2 valores, el segundo puede ser una 
lista de longitud indefinida.
Documentación útil sobre posibles opciones: https://firebase.google.com/docs/firestore/manage-data/structure-data

Para los usuarios, que son un grupo muy reducido de valores y que siempre necesitar consultar junto a la
conversación privada, los vamos a guardar como un objeto/mapa, donde las claves van a ser los ids de los
usuarios, y los valores siempre van a ser true.
Esto va a simplificar no solo la obtención y manejo del documento, sino también el manejo de las reglas
de seguridad.

Para los mensajes, en cambio, como pueden ser una cantidad indefinida y siempre creciente de valores, los
vamos a guardar en una subcollection.

Por lo tanto, la estructura final que vamos a utilizar es:

    [C] private-chats {
        [D] autoId: {
            users: {
                [userId1]: true,
                [userId2]: true,
            }

            [C] messages {
                [D] autoId: {
                    senderId: userId1,
                    message: ...,
                    created_at: ...,
                }

                ...
            }
        }

        ...
    }
*/
import { DocumentReference, addDoc, collection, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

const privateChatRefCache = {};

/**
 * 
 * @param {{senderId: string, receiverId: string, message: string}} data
 * @returns {Promise}
 */
export async function sendPrivateChatMessage({senderId, receiverId, message}) {
    const privateChatDoc = await getPrivateChatDoc({senderId, receiverId});

    // Creamos la referencia a la collection de messages para este chat privado.
    // Cuando queremos ir accediendo a elementos anidados dentro de una collection o documento, lo
    // escribimos con formato ruta.
    const messagesRef = collection(db, `private-chats/${privateChatDoc.id}/messages`);

    await addDoc(messagesRef, {
        senderId,
        message,
        created_at: serverTimestamp(),
    });
    return true;
}

/**
 * 
 * @param {{senderId: string, receiverId: string}} users
 * @param {({}[]}) => void} callback 
 * @returns {Promise<import("firebase/auth").Unsubscribe>}
 */
export async function subscribeToPrivateChat({senderId, receiverId}, callback) {
    const privateChatDoc = await getPrivateChatDoc({senderId, receiverId});

    const messagesRef = collection(db, `private-chats/${privateChatDoc.id}/messages`);

    const q = query(
        messagesRef,
        orderBy('created_at')
    );

    return onSnapshot(q, snapshot => {
        const messages = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                senderId: doc.data().senderId,
                message: doc.data().message,
                created_at: doc.data().created_at?.toDate(),
            }
        });

        callback(messages);
    });
}

/**
 * 
 * @param {{senderId: string, receiverId: string}} users
 * @returns {Promise<DocumentReference>}
 */
async function getPrivateChatDoc({senderId, receiverId}) {
    const cachedRef = getFromCache({senderId, receiverId});
    if(cachedRef) {
        // console.log('[private-chat.js getPrivateChatDoc] Retornando valor de caché.');
        return cachedRef;
    }

    // console.log('[private-chat.js getPrivateChatDoc] Buscando el documento del chat privado en Firestore.');
    const privateChatRef = collection(db, 'private-chats');

    // Buscamos a ver si el documento existe.
    const q = query(
        privateChatRef, 
        where('users', '==', {
            [senderId]: true,
            [receiverId]: true,
        }),
        limit(1),
    );
    // debugger;
    // Como queremos usar un query, tenemos que traer los documentos con getDocs().
    const snapshot = await getDocs(q);
    let privateChatDoc;

    if(snapshot.empty) {
        // Creamos el documento para el chat privado.
        privateChatDoc = await addDoc(privateChatRef, {
            users: {
                [senderId]: true,
                [receiverId]: true,
            }
        });
    } else {
        privateChatDoc = snapshot.docs[0];
    }

    addToCache({senderId, receiverId}, privateChatDoc);

    return privateChatDoc;
}

function addToCache({senderId, receiverId}, value) {
    privateChatRefCache[getKeyForCache()] = value;
}

function getFromCache({senderId, receiverId}) {
    return privateChatRefCache[getKeyForCache()] || null;
}

function getKeyForCache({senderId, receiverId}) {
    return senderId + receiverId;
}