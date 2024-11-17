<?php
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\VoluntarioController;
use App\Http\Controllers\GaleriaController;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\EventoGaleriaController;


//Usuarios
Route::post('/usuarios', [UsuarioController::class, 'store'])->name('criar');
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::get('/usuarios/{id}', [UsuarioController::class, 'index']);
Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);
Route::post('/login', [UsuarioController::class, 'authenticate'])->name('login');
Route::delete('/deletar/{id}', [UsuarioController::class, 'destroy'])->name('delete');
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});


// Voluntários
Route::get('/voluntarios', [VoluntarioController::class, 'index']); //Listar todos
Route::post('/voluntarios', [VoluntarioController::class, 'store']); // Novo voluntario
Route::get('/voluntarios/{id}', [VoluntarioController::class, 'show']); // Listar voluntário pelo ID
Route::put('/voluntarios/{id}', [VoluntarioController::class, 'update']); // Editar voluntário
Route::delete('/voluntarios/{id}', [VoluntarioController::class, 'destroy']); // Deletar voluntário


// Rotas para Galeria
Route::get('/galeria', [GaleriaController::class, 'index']); // Listar todas as imagens
Route::post('/galeria', [GaleriaController::class, 'store']); // Criar nova imagem
Route::get('/galeria/{id}', [GaleriaController::class, 'show']); // Mostrar imagem específica
Route::put('/galeria/{id}', [GaleriaController::class, 'update']); // Atualizar imagem
Route::delete('/galeria/{id}', [GaleriaController::class, 'destroy']); // Deletar imagem


// Rotas de Evento
Route::get('eventos', [EventoController::class, 'index']); // Exibe todos os eventos
Route::post('eventos', [EventoController::class, 'store']); // Cria um novo evento
Route::get('eventos/{id}', [EventoController::class, 'show']); // Exibe um evento específico pelo id
Route::put('eventos/{id}', [EventoController::class, 'update']); // Atualiza um evento específico pelo id
Route::delete('eventos/{id}', [EventoController::class, 'destroy']); // Deleta um evento específico pelo id



// Associar uma galeria a um evento
Route::post('eventos/{eventoId}/galerias', [EventoGaleriaController::class, 'store']);

// Remover uma galeria de um evento
Route::delete('eventos/{eventoId}/galerias/{galeriaId}', [EventoGaleriaController::class, 'destroy']);

// Listar as galerias de um evento
Route::get('eventos/{eventoId}/galerias', [EventoGaleriaController::class, 'show']);
