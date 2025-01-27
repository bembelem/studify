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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['', 'practice', 'lecture'])->default('');
            $table->string('subject');
            $table->string('room');
            $table->string('teacher')->nullable();

            $table->date('date');
            $table->unsignedTinyInteger('order');
            $table->enum('day', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);

            $table->string('homework')->nullable();
            $table->text('notes')->nullable();

            $table->boolean('test')->default(false);
            $table->boolean('project')->default(false);
            $table->boolean('colloquium')->default(false);

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
