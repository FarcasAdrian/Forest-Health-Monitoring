<?php

namespace App\Http\Controllers;

use App\Forest;
use App\ForestEvent;
use App\ForestEventHistory;
use App\TreeType;
use App\ForestType;
use App\User;
use App\UserForestRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Grimzy\LaravelMysqlSpatial\Types\Polygon;
use Grimzy\LaravelMysqlSpatial\Types\Point;
use Grimzy\LaravelMysqlSpatial\Types\LineString;

class ForestController extends Controller
{
    /**
     * Display a listing with all forests.
     *
     * @return string
     */
    public function index()
    {
        $forests = Forest::all();
        foreach ($forests as $forest) {
            $newForests = Forest::getForests($forest->id);
            $forestData = array();
            foreach ($newForests as $newForest) {
                $forestData[] = $newForest->type;
            }
            $forest->tree_type = $forestData;
        }
        return response()->json(array('forests' => $forests), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'forest_name' => 'required|string',
            'location' => 'required',
            'surface' => 'required|float'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $forest = new Forest([
            'forest_name' => $request->get('forest_name'),
            'location' => $request->get('location'),
            'surface' => $request->get('surface'),
            'unit' => 'ha',
        ]);
        $forest->save();

        return response()->json(array('message' => 'Forest created successfully.'), 201);
    }

    /**
     * Display the assigment forest.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id)
    {
        return response()->json(array(
            'forest' => Forest::find($id),
            'treeTypes' => TreeTypeController::treeTypes($id)
        ), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        $forest = Forest::find($id);
        return response()->json(compact('forest'), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $location_coordinates = $request->get('location')['coordinates'][0];
        $points = array();

        foreach ($location_coordinates as $coordinates) {
            array_push($points, new Point($coordinates[1], $coordinates[0]));
        }

        $polygon = new Polygon([new LineString($points)]);

        $forest = Forest::find($id);
        $forest->forest_name = $request->get('forest_name');
        $forest->location = $polygon;
        $forest->surface = $request->get('surface');
        $forest->save();

        // remove all tree types for current forest
        DB::table('forest_type')->where('forest_id', $id)->delete();

        $tree_types = $request->get('tree_type');

        foreach ($tree_types as $tree_type) {
            $tree_type_id = TreeType::select('id')->where('type', '=', $tree_type)->first();
            $forest_type = new ForestType([
                'forest_id' => $id,
                'tree_type_id' => $tree_type_id->id
            ]);
            $forest_type->save();
        }

        return response()->json(array('message' => 'Forest data updated!'), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        
        Forest::find($id)->delete();
        UserForestRequest::where('forest_id', '=', $id)->delete();
        ForestEvent::where('forest_id', '=', $id)->delete();
        ForestEventHistory::where('forest_id', '=', $id)->delete();
        ForestType::where('forest_id', '=', $id)->delete();

        $users = User::select('id')->where('forest_id', '=', $id)->get();
        foreach($users as $user) {
            $currentUser = User::find($user->id);
            $currentUser->forest_id = NULL;
            
            if ($currentUser->user_type_id == 2) {
                $currentUser->user_type_id = 1;
            }
            $currentUser->save();
        }

        return response()->json(array('message' => 'Forest deleted!'), 200);
    }


    public function coordinates()
    {
        $locations = DB::select('SELECT ST_AsGeoJSON(location) as location FROM forest');

        if (!$locations) {
            return response('Failed to get forests locations.');
        }

        $coordinates = array();
        foreach ($locations as $location) {
            $forest_coordinates = json_decode($location->location)->coordinates[0];
            $points = array();
            foreach ($forest_coordinates as $forest_coordinate) {
                array_push($points, array('lat' => $forest_coordinate[0], 'lng' => $forest_coordinate[1]));
            }
            array_push($coordinates, $points);
        }

        $coordinates = json_encode(array(
            'geometry' => array(
                'coordinates' => $coordinates
            )
        ));

        return $coordinates;
    }

    public function forestsName()
    {
        return DB::table('forest')->pluck('forest_name');
    }

    public static function getForestID($forestName)
    {
        return DB::table('forest')->select('id')->where('forest_name', '=', $forestName)->first();
    }
}
