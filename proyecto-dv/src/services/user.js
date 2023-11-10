import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 
 * @param {string} id 
 * @returns {Promise<{id: string, email: string, displayName: string|null, career: string|null}>}
 */
export async function getUserProfileById(id) {
    const refUser = doc(db, `users/${id}`);
    const docSnapshot = await getDoc(refUser);

    return {
        id: docSnapshot.id,
        ...docSnapshot.data()
        // email: docSnapshot.data().email,
        // displayName: docSnapshot.data().displayName,
        // career: docSnapshot.data().career,
        // photoURL: docSnapshot.data().career,
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

/**
 * 
 * @param {string} id 
 * @param {{displayName: string|null, photoURL: string|null, career: string|null}} data 
 * @returns {Promise}
 */
export async function updateUserProfile(id, data) {
    return updateDoc(
        doc(db, `users/${id}`),
        {...data}
    );
}