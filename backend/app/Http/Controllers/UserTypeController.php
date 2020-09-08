<?php

namespace App\Http\Controllers;

use App\UserType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserTypeController extends Controller
{
    public function index()
    {
        $usersType = UserType::all(['user_type']);
        return response()->json(array('usersType' => $usersType), 200);
    }

    public static function getUserTypeID($userType)
    {
        return DB::table('user_type')->select('id')->where('user_type', '=', $userType)->first();
    }
}
