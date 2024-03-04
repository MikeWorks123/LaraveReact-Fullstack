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
        Schema::create('comments_suggestions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(); // Assumes a users table with 'id' column.
            $table->text('comment');
            $table->text('suggestion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments_suggestions');
    }
};