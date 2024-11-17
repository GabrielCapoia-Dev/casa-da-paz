<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retorna todos os eventos
        $eventos = Evento::all();
        return response()->json($eventos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validação dos dados de entrada
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'data' => 'required|date',
            'cep' => 'nullable|string|max:10',
            'logradouro' => 'nullable|string|max:255',
            'complemento' => 'nullable|string|max:255',
            'bairro' => 'nullable|string|max:255',
            'cidade' => 'nullable|string|max:255',
            'estado' => 'nullable|string|max:2',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        // Criar o evento
        $evento = Evento::create([
            'nome' => $request->nome,
            'data' => $request->data,
            'cep' => $request->cep,
            'logradouro' => $request->logradouro,
            'complemento' => $request->complemento,
            'bairro' => $request->bairro,
            'cidade' => $request->cidade,
            'estado' => $request->estado,
        ]);

        return response()->json($evento, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Buscar evento pelo id
        $evento = Evento::find($id);

        // Verificar se o evento existe
        if (!$evento) {
            return response()->json(['error' => 'Evento não encontrado'], 404);
        }

        return response()->json($evento);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Buscar evento pelo id
        $evento = Evento::find($id);

        // Verificar se o evento existe
        if (!$evento) {
            return response()->json(['error' => 'Evento não encontrado'], 404);
        }

        // Validação dos dados de entrada
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'data' => 'required|date',
            'cep' => 'nullable|string|max:10',
            'logradouro' => 'nullable|string|max:255',
            'complemento' => 'nullable|string|max:255',
            'bairro' => 'nullable|string|max:255',
            'cidade' => 'nullable|string|max:255',
            'estado' => 'nullable|string|max:2',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        // Atualizar o evento
        $evento->update([
            'nome' => $request->nome,
            'data' => $request->data,
            'cep' => $request->cep,
            'logradouro' => $request->logradouro,
            'complemento' => $request->complemento,
            'bairro' => $request->bairro,
            'cidade' => $request->cidade,
            'estado' => $request->estado,
        ]);

        return response()->json($evento);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Buscar evento pelo id
        $evento = Evento::find($id);

        // Verificar se o evento existe
        if (!$evento) {
            return response()->json(['error' => 'Evento não encontrado'], 404);
        }

        // Deletar o evento
        $evento->delete();
        return response()->json(['message' => 'Evento deletado com sucesso']);
    }
}
