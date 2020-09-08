<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TreeType extends Model
{
    public $timestamps = false;
    protected $table = 'tree_type';

    protected $fillable = [
        'type',
    ];
}
