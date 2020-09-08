<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ForestEvent extends Model
{
    public $timestamps = false;
    protected $table = 'forest_event';

    protected $fillable = [
        'user_id', 'forest_id', 'forest_problem_id', 'description', 'photo', 'validated'
    ];
}
