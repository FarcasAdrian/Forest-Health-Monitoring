<?php

namespace App\Http\Controllers;

use App\Forest;
use App\ForestEvent;
use App\ForestEventHistory;
use App\User;
use App\UserForestRequest;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $users = DB::table('user')
            ->join('user_type', 'user.user_type_id', '=', 'user_type.id')
            ->select('user.id', 'user.forest_id', 'user.name', 'user.email', 'user_type.user_type')
            ->get();

        foreach ($users as $index => $user) {
            if ($users[$index]->forest_id) {
                $forest_name = Forest::find($users[$index]->forest_id)->forest_name;
                $users[$index]->forest_name = $forest_name;
            } else {
                $users[$index]->forest_name = NULL;
            }
        }

        return response()->json(compact('users'), 200);
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
            'user_type_id' => 'required',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:user',
            'password' => 'required|string|min:6|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = new User([
            'forest_id' => $request->get('forest_id'),
            'user_type_id' => $request->get('user_type_id'),
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'profile_picture' => 'default.jpg',
            'register_at' => Carbon::now()->format('Y-m-d')
        ]);
        $user->save();

        return response()->json(array('message' => 'User created successfully.'), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function edit($id)
    {
        $user = User::find($id);
        return response()->json(compact('user'), 200);
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
        $user = User::find($id);

        $user->forest_id = null;
        if ($request->get('forest_name')) {
            $user->forest_id = ForestController::getForestID($request->get('forest_name'))->id;
        }

        $user->user_type_id = UserTypeController::getUserTypeID($request->get('user_type'))->id;
        $user->save();

        return response()->json(array('message' => 'User updated!'), 200);
    }

    /**
     * Remove the specified user.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        User::find($id)->delete();
        UserForestRequest::where('user_id', '=', $id)->delete();
        ForestEvent::where('user_id', '=', $id)->delete();
        ForestEventHistory::where('user_id', '=', $id)->delete();

        return response()->json(array('message' => 'User deleted!'), 200);
    }
}
