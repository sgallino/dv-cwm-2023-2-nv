import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

/**
 * 
 * @param {string} path 
 * @param {File} file 
 * @returns {Promise}
 */
export async function uploadFile(path, file) {
    // Definimos la referencia al archivo que queremos subir.
    const fileRef = ref(storage, path);
    return uploadBytes(fileRef, file);
}

/**
 * Retorna la URL del archivo en el path en el almacenamiento.
 * 
 * @param {File} path 
 * @returns {Promise<string>}
 */
export async function getFileURL(path) {
    return getDownloadURL(ref(storage, path));
}