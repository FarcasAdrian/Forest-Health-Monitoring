<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserForestRequest extends Model
{
    public $timestamps = false;
    protected $table = 'user_forest_request';

    protected $fillable = [
        'user_id', 'forest_id'
    ];
}
