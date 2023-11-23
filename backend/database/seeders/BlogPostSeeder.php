<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlogPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('blog_posts')->insert([
            [
                'title' => 'Introducción a Laravel con Vue',
                'body' => 'Vamos a aprender cómo crear una API REST con Laravel que pueda ser consumida con Vue.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Programando SPAs con Laravel',
                'body' => 'Programar es algo muy fácil, y hacer SPAs no es la excepción.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
