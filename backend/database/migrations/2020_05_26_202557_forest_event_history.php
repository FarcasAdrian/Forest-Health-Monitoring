<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ForestEventHistory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forest_event_history', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('forest_id');
            $table->integer('validator_id');
            $table->integer('forest_problem_id');
            $table->text('description');
            $table->enum('action', ['Declined', 'Confirmed']);
            $table->date('at_date');
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
