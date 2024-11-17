<?php

// App/Models/Galeria.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Galeria extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function eventos()
    {
        return $this->belongsToMany(Evento::class, 'evento_galeria', 'galeria_id', 'evento_id');
    }
}
