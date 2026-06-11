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
        Schema::table('services', function (Blueprint $table) {
            $table->decimal('price', 10, 2)->nullable()->after('image');
            $table->text('suited_for')->nullable()->after('price');
            $table->text('expected_results')->nullable()->after('suited_for');
            $table->string('paystack_plan_id')->nullable()->after('expected_results');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['price', 'suited_for', 'expected_results', 'paystack_plan_id']);
        });
    }
};
