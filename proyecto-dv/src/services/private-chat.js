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
import { db } from "./firebase";

export async function sendPrivateChatMessage() {
    
}


export async function subscribeToPrivateChat(callback) {

}