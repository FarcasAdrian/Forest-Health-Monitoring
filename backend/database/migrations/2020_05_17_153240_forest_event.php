<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ForestEvent extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forest_event', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('forest_id');
            $table->integer('forest_problem_id');
            $table->text('description');
            $table->string('photo')->nullable();
            $table->enum('validated', ['New', 'Declined', 'Confirmed']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forest_event');
    }
}
