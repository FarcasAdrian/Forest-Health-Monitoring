<?php

namespace App;

use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;
use Illuminate\Database\Eloquent\Model;

class Forest extends Model
{
    use SpatialTrait;

    public $timestamps = false;
    protected $table = 'forest';

    protected $fillable = [
        'forest_name', 'location', 'surface', 'unit'
    ];

    protected $spatialFields = [
        'location'
    ];

    public static function getForests($id)
    {
        return Forest::query()->select('tree_type.type')
            ->join('forest_type', 'forest_type.forest_id', '=', 'forest.id')
            ->join('tree_type', 'tree_type.id', '=', 'forest_type.tree_type_id')
            ->where('forest_type.forest_id', '=', $id)
            ->distinct()
            ->get();
    }
}
