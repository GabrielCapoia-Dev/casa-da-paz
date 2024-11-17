<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use App\Models\Galeria;
use App\Models\EventoGaleria;
use Illuminate\Http\Request;

class EventoGaleriaController extends Controller
{
    /**
     * Associar uma galeria a um evento.
     */
    public function store(Request $request, $eventoId)
    {
        $request->validate([
            'galeria_id' => 'required|exists:galerias,id', // Verifica se o galeria_id existe
        ]);

        $evento = Evento::findOrFail($eventoId);
        $evento->galerias()->attach($request->galeria_id); // Relaciona a galeria ao evento

        return response()->json([
            'message' => 'Galeria associada com sucesso ao evento.',
            'evento' => $evento,
        ], 200);
    }

    /**
     * Remover uma galeria de um evento.
     */
    public function destroy($eventoId, $galeriaId)
    {
        $evento = Evento::findOrFail($eventoId);
        $evento->galerias()->detach($galeriaId); // Remove o relacionamento

        return response()->json([
            'message' => 'Galeria removida do evento com sucesso.',
            'evento' => $evento,
        ], 200);
    }

    /**
     * Listar as galerias de um evento.
     */
    public function show($eventoId)
    {
        $evento = Evento::findOrFail($eventoId);
        $galerias = $evento->galerias; // Obter todas as galerias associadas ao evento

        return response()->json([
            'evento' => $evento,
            'galerias' => $galerias,
        ], 200);
    }
}
