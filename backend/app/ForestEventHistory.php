<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ForestEventHistory extends Model
{
    public $timestamps = false;
    protected $table = 'forest_event_history';

    protected $fillable = [
        'user_id', 'forest_id', 'validator_id', 'forest_problem_id', 'description', 'action', 'at_date'
    ];
}
