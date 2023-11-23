<?php

namespace Database\Factories;
use App\Models\News;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NewsModel>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'    => $this->faker->title(),
            'deskripsi'=> $this->faker->text(),
            'kategori' => $this->faker->name(),
            'penulis'  => $this->faker->email(),
        ];
    }
}
