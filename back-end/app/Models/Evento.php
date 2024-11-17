<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;

    // Definir a tabela associada, caso o nome seja diferente do plural do nome da model
    protected $table = 'eventos';

    // Definir os campos que podem ser preenchidos via mass assignment
    protected $fillable = [
        'nome',
        'data',
        'cep',
        'logradouro',
        'complemento',
        'bairro',
        'cidade',
        'estado',
    ];

    // Se você quiser usar a data corretamente no formato de data, Laravel trata como Carbon
    protected $dates = ['data'];

    public function galerias()
    {
        return $this->belongsToMany(Galeria::class, 'evento_galeria', 'evento_id', 'galeria_id');
    }
}
