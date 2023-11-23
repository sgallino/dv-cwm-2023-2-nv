<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    public function list()
    {
        $posts = BlogPost::all();

        // Como esto es una API, no vamos a renderizar una vista, mucho menos de Blade.
        // En su lugar, vamos a retornar siempre JSON.
        // En Laravel, logramos esto usando la función response() con su método json().
        // El método json() serializa a JSON los valores recibidos como argumento antes de renderizarlos, y
        // también agrega en header de HTTP "Content-Type: application/json".
        return response()->json([
            'posts' => $posts,
        ]);
        // return response(json_encode($posts));
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|min:2',
            'body' => 'required',
        ], [
            'title.required' => 'Debe tener un título.',
        ]);

        // Si la petición envió datos con formato JSON, y aclaró en el "Content-Type" que es de tipo
        // "application/json", entonces Laravel automáticamente va a parsear esa información y retonarla
        // en el Request::input().
        $data = $request->input();

        $post = BlogPost::create($data);

        return response()->json([
            // 'success' => true,
            // 'status' => 0,
            'code' => 0,
            'post_id' => $post->id,
        ]);
    }
}
