<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserType extends Model
{
    public $timestamps = false;
    protected $table = 'user_type';

    protected $fillable = [
        'user_type',
    ];
}
