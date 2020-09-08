<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ForestStatistics extends Model
{
    public $timestamps = false;
    protected $table = 'forest_statistics';

    protected $fillable = [
        'forest_id', 'surface', 'modified_at'
    ];
}
