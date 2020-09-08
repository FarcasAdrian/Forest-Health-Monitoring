<?php

namespace App\Http\Controllers;

use App\TreeType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class TreeTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json(array('treeType' => TreeType::all()), 200);
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
            'forest_id' => 'required',
            'tree_type_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $forest_type = new TreeType([
            'type' => $request->get('type'),
        ]);
        $forest_type->save();

        return response()->json(array('message' => 'Tree type created successfully.'), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return void
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'forest_id' => 'required',
            'tree_type_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $forest_type = TreeType::find($id);
        $forest_type->forest_id = $request->get('forest_id');
        $forest_type->tree_type_id = $request->get('tree_type_id');
        $forest_type->save();

        return response()->json(array('message' => 'Tree type updated!'), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $forest_type = TreeType::find($id);
        $forest_type->delete();

        return response()->json(array('message' => 'Tree type deleted!'), 200);
    }

    public static function treeTypes($id)
    {
        return TreeType::select('type')
            ->join('forest_type', 'tree_type_id', '=', 'tree_type.id')
            ->where('forest_type.forest_id', '=', $id)->get();
    }
}
