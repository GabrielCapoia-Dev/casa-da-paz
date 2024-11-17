<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Models\Galeria;
use App\Models\Evento;  // Importa o modelo Evento
use Illuminate\Http\Request;

class GaleriaController extends Controller
{
    public function store(Request $request)
    {
        // Valida o arquivo da imagem
        $request->validate([
            'name' => 'required|image|mimes:jpeg,png,jpg,gif|max:20480',
            'evento_id' => 'nullable|exists:eventos,id', // Validação para o evento_id
        ]);


        // Verifica se o arquivo foi enviado corretamente
        if ($request->hasFile('name') && $request->file('name')->isValid()) {
            // Armazena o arquivo
            $path = $request->file('name')->store('galerias', 'public');
            $nomeArquivo = basename($path); // Extrai o nome do arquivo

            try {
                // Cria o registro da galeria
                $galeria = new Galeria();
                $galeria->name = $nomeArquivo;

                // Se evento_id for fornecido, associa à galeria
                if ($request->has('evento_id')) {
                    $galeria->evento_id = $request->evento_id;
                }

                $galeria->save();

                return response()->json([
                    'mensagem' => 'Imagem enviada com sucesso.',
                    'nomeArquivo' => $nomeArquivo
                ], 201);
            } catch (\Exception $e) {
                return response()->json([
                    'mensagem' => 'Erro ao salvar no banco de dados',
                    'erro' => $e->getMessage()
                ], 500);
            }
        }

        return response()->json(['mensagem' => 'Falha ao enviar arquivo.'], 500);
    }

    public function update(Request $request, $id)
    {
        $galeria = Galeria::findOrFail($id);

        // Valida e processa o upload da nova imagem
        if ($request->hasFile('name') && $request->file('name')->isValid()) {
            $request->validate(['name' => 'image|mimes:jpeg,png,jpg,gif|max:20480']); // Validação adicional
            Storage::disk('public')->delete('galerias/' . $galeria->name); // Remove a imagem anterior
            $path = $request->file('name')->store('galerias', 'public');
            $galeria->name = basename($path); // Atualiza o nome do arquivo
        }

        // Atualiza e salva o registro
        $galeria->update();
        return response()->json($galeria);
    }

    public function index()
    {
        $galerias = Galeria::all()->map(function ($item) {
            // Monta a URL da imagem usando o hash
            $item->url_imagem = asset('storage/galerias/' . $item->name);
            return $item;
        });

        return response()->json($galerias);
    }

    public function show($id)
    {
        $galeria = Galeria::findOrFail($id);
        $galeria->url_imagem = asset('storage/galerias/' . $galeria->name);

        return response()->json($galeria);
    }

    // Deletar uma imagem da galeria
    public function destroy($id)
    {
        $galeria = Galeria::findOrFail($id);

        // Exclui a imagem do armazenamento se existir
        if ($galeria->name) {
            Storage::disk('public')->delete('galerias/' . $galeria->name);
        }

        $galeria->delete(); // Deleta o registro no banco de dados
        return response()->json(null, 204);
    }
}
