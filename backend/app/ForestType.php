<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ForestType extends Model
{
    public $timestamps = false;
    protected $table = 'forest_type';

    protected $fillable = [
        'forest_id', 'tree_type_id',
    ];
}
