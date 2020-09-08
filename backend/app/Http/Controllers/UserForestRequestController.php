<?php

namespace App\Http\Controllers;

use App\Forest;
use App\User;
use App\UserForestRequest;
use Illuminate\Support\Facades\DB;

class UserForestRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $requests = DB::table('user_forest_request')
            ->leftJoin('user', 'user.id', '=', 'user_forest_request.user_id')
            ->leftJoin('forest', 'forest.id', '=', 'user_forest_request.forest_id')
            ->select('user_forest_request.id', 'user.name', 'user.email', 'forest.forest_name')
            ->get();
        return response()->json(array('requests' => $requests), 200);
    }

    /**
     * Save request access for a specific forest
     * 
     * @return JsonResponse
     */
    public function requestForestAccess()
    {
        $user_id = auth()->id();
        $forest_name = request('forest_name');
        $forest_id = Forest::select('id')->where('forest_name', '=', $forest_name)->first()->id;

        $forest_request = new UserForestRequest([
            'user_id' => $user_id,
            'forest_id' => $forest_id
        ]);
        $forest_request->save();

        return response()->json(array('message' => 'You request was sent. An administrator will contact you on your email address.'), 200);
    }

    /**
     * Check if the logged user have sent request access for a forest
     *
     * @return JsonResponse
     */
    public function checkIfRequestWasSent()
    {
        $request_id = UserForestRequest::select('id')->where('user_id', '=', auth()->id())->first();
        if (!$request_id) {
            return response()->json(array('message' => 'Request not found.'), 200);
        }
        return response()->json(array('message' => 'Request found.'), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function update($id)
    {
        $forest_request = UserForestRequest::find($id);
        $forest_name = Forest::find($forest_request->forest_id)->forest_name;
        $user = User::find($forest_request->user_id);
        $user->forest_id = $forest_request->forest_id;

        if ($user->user_type_id == 1) {
            $user->user_type_id = 2;
        }

        // after update user access, remove the request from user_forest_request table
        $user->save();
        $forest_request->delete();

        return response()->json(array('message' => $user->name . ' with the email address ' . $user->email . ' became a forester for ' . $forest_name . '!'), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $request_access = UserForestRequest::find($id);
        $request_access->delete();

        return response()->json(array('message' => 'Request declined.'), 200);
    }
}
