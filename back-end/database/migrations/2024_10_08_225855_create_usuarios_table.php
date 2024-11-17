<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->text('nome'); // Nome do cliente
            $table->string('email', 200)->unique(); // Email do cliente, deve ser único
            $table->string('senha'); // Senha do cliente
            $table->string('telefone')->nullable(); // Telefone do cliente (opcional)
            $table->string('permissao')->default('usuario');
            $table->timestamps(); // Campos de created_at e updated_at
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
