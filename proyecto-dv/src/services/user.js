import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 
 * @param {string} id 
 * @returns {Promise<{id: string, email: string}>}
 */
export async function getUserProfileById(id) {
    const refUser = doc(db, `users/${id}`);
    const docSnapshot = await getDoc(refUser);

    return {
        id: docSnapshot.id,
        email: docSnapshot.data().email,
    }
}

/**
 * 
 * @param {string} id 
 * @param {{email: string}} data 
 * @returns {Promise}
 */
export async function createUserProfile(id, data) {
    const refUser = doc(db, `users/${id}`);
    return setDoc(refUser, {...data, created_at: serverTimestamp()});
}