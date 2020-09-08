<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Forest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forest', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('forest_type_id');
            $table->integer('tree_type_id');
            $table->string('forest_name');
            $table->polygon('location');
            $table->float('surface');
            $table->string('unit');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('table');
    }
}
