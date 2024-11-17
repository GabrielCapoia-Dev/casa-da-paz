<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventoGaleria extends Model
{
    // Definindo a tabela associada a este model
    protected $table = 'evento_galeria';

    // Desabilitando o uso de timestamps se não for necessário
    public $timestamps = true;

    // Se precisar, pode adicionar os campos que são atribuíveis em massa
    protected $fillable = [
        'evento_id',
        'galeria_id',
    ];
}
