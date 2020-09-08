<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ForestProblem extends Model
{
    public $timestamps = false;
    protected $table = 'forest_problem';

    protected $fillable = [
        'problem_type'
    ];
}
