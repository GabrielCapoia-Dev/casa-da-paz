<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();
            $table->string('nome'); // Não nulo
            $table->date('data'); // Não nulo
            $table->string('cep')->nullable(); // Pode ser nulo
            $table->string('logradouro')->nullable(); // Pode ser nulo
            $table->string('complemento')->nullable(); // Pode ser nulo
            $table->string('bairro')->nullable(); // Pode ser nulo
            $table->string('cidade')->nullable(); // Pode ser nulo
            $table->string('estado')->nullable(); // Pode ser nulo
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eventos');
    }
};
