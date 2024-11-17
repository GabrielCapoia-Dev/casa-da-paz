<?php

namespace App\Http\Controllers;


use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class UsuarioController extends Controller
{

    public function authenticate(Request $request)
    {
        Log::info('Iniciando a autenticação');

        // Validação dos dados de entrada
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        // Busca o usuário pelo email
        $user = Usuario::where('email', $request->email)->first();

        Log::info('Usuário encontrado: ', ['user' => $user]);

        // Verifica se o usuário existe e se a senha está correta
        if ($user && Hash::check($request->password, $user->senha)) {
            try {
                // Gera o token JWT
                $token = JWTAuth::fromUser($user);

                Log::info('Login bem-sucedido', ['user' => $user]);
                return response()->json([
                    'access_token' => $token,
                    'user' => $user
                ], 201);
            } catch (\Exception $e) {
                // Log de erro caso ocorra algum problema ao gerar o token JWT
                Log::error('Erro ao gerar o token JWT: ' . $e->getMessage());
                return response()->json(['message' => 'Erro ao gerar token'], 500);
            }
        }

        // Caso o usuário não exista ou a senha esteja incorreta
        Log::warning('Credenciais inválidas', ['email' => $request->email]);
        return response()->json(['message' => 'Credenciais inválidas'], 401);
    }

    // Método para listar todos os usuários ou um usuário específico
    public function index($id = null)
    {
        // Se um ID foi fornecido na URL, busca esse usuário
        if ($id) {
            // Busca o usuário pelo ID
            $usuario = Usuario::find($id);

            // Verifica se o usuário existe
            if (!$usuario) {
                return response()->json(['message' => 'Usuário não encontrado.'], 404);
            }

            // Retorna o usuário em formato JSON
            return response()->json($usuario);
        }

        // Se nenhum ID foi fornecido, busca todos os usuários
        $usuarios = Usuario::all();

        // Retorna os dados em formato JSON
        return response()->json($usuarios);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validação dos dados recebidos
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|string|min:6',
            'telefone' => 'required|string|max:20',
        ]);

        // Criação do usuário
        $usuario = Usuario::create([
            'nome' => $validatedData['nome'],
            'email' => $validatedData['email'],
            'senha' => bcrypt($validatedData['password']), // Alterado para 'password'
            'telefone' => $validatedData['telefone'],
        ]);

        // Retorna uma resposta JSON com os dados do usuário criado
        return response()->json([
            'message' => 'Usuário criado com sucesso!',
            'usuario' => $usuario,
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:usuarios,email,' . $id,
            'senha' => 'nullable|string|min:6',
            'telefone' => 'required|string|max:20',
        ]);

        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json(['message' => 'Usuário não encontrado.'], 404);
        }

        $usuario->nome = $validatedData['nome'];
        $usuario->email = $validatedData['email'];

        if (isset($validatedData['senha'])) {
            $usuario->senha = bcrypt($validatedData['senha']);
        }

        $usuario->telefone = $validatedData['telefone'];
        $usuario->save();

        return response()->json([
            'message' => 'Usuário atualizado com sucesso!',
            'usuario' => $usuario,
        ], 200);
    }

    public function show(string $id)
    {
        // Tente imprimir o ID recebido
        dd($id);

        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuário não encontrado.'], 404);
        }

        return response()->json($usuario);
    }



    /**
     * Show the form for editing the specified resource.
     */ 
    public function edit(string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Busca o usuário pelo ID
        $usuario = Usuario::find($id);

        // Verifica se o usuário existe
        if (!$usuario) {
            return response()->json(['message' => 'Usuário não encontrado.'], 404);
        }

        // Deleta o usuário
        $usuario->delete();

        // Retorna uma resposta JSON de sucesso
        return response()->json(['message' => 'Usuário deletado com sucesso.'], 200);
    }
}
