import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 
 * @returns {Promise<{id: number|string, title: string, body: string, created_at: string, updated_at: string}[]>}
 */
export async function getBlogPosts() {
    const snapshot = await getDocs(collection(db, 'blog-posts'));
    return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
            created_at: doc.data().created_at,
            updated_at: doc.data().updated_at,
        }
    });
}