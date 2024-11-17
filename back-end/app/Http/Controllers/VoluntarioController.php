<?php

namespace App\Http\Controllers;

use App\Models\Voluntario;
use Illuminate\Http\Request;

class VoluntarioController extends Controller
{
    public function index()
    {
        $voluntarios = Voluntario::all();
        return response()->json($voluntarios);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:voluntarios',
            'telefone' => 'required|string|max:15',
        ]);

        $voluntario = Voluntario::create($request->all());
        return response()->json($voluntario, 201);
    }

    public function show($id)
    {
        $voluntario = Voluntario::find($id);

        if (!$voluntario) {
            return response()->json(['message' => 'Voluntário não encontrado'], 404);
        }

        return response()->json($voluntario);
    }

    public function update(Request $request, $id)
    {
        $voluntario = Voluntario::find($id);

        if (!$voluntario) {
            return response()->json(['message' => 'Voluntário não encontrado'], 404);
        }

        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:voluntarios,email,' . $voluntario->id,
            'telefone' => 'required|string|max:15',
        ]);

        $voluntario->update($request->all());
        return response()->json($voluntario);
    }

    public function destroy($id)
    {
        $voluntario = Voluntario::find($id);

        if (!$voluntario) {
            return response()->json(['message' => 'Voluntário não encontrado'], 404);
        }

        $voluntario->delete();
        return response()->json(['message' => 'Voluntário deletado com sucesso']);
    }
}
