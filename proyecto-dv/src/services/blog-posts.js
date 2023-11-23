// Este servicio va a encargarse de hacer las peticiones al backend de Laravel para interactuar con los
// mensajes de blog.

const API_HOST = 'http://localhost:8000/api';

/**
 * 
 * @returns {Promise<{id: number|string, title: string, body: string, created_at: string, updated_at: string}[]>}
 */
export async function getBlogPosts() {
    return fetch(`${API_HOST}/blog`)
        .then(res => res.json())
        .then(data => data.posts);
}

export async function createBlogPost({title, body}) {
    return fetch(`${API_HOST}/blog`, {
        method: 'POST',
        body: JSON.stringify({title, body}),
        headers: {
            // Indicamos en la petición que el formato del contenido es un JSON.
            // Esto le va a servir a quién reciba la petición (ej: Laravel) para saber cómo parsearla.
            'Content-Type': 'application/json',
            // Este encabezado se utiliza como práctica común para indicar que la petición se realiza
            // por Ajax.
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
        .then(res => res.json())
        .then(data => console.log(data));}