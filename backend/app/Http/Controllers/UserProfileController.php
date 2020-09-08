<?php


namespace App\Http\Controllers;

use App\Rules\MatchOldPassword;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'current_password' => ['required', new MatchOldPassword],
            'new_password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|min:6|same:new_password'
        ]);
    }

    /**
     * Show the application dashboard.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', new MatchOldPassword],
            'new_password' => 'required|min:6|max:255|different:current_password',
            'password_confirmation' => 'same:new_password',
        ]);

        User::find(auth()->user()->id)->update(array('password' => Hash::make($request->new_password)));

        return response()->json(['message' => 'Password changed successfully.']);
    }

    public function changeName(Request $request)
    {
        $request->validate([
            'name' => ['required'],
        ]);

        User::find(auth()->user()->id)->update(array('name' => $request->name));

        return response()->json(['message' => 'Name changed successfully.']);
    }

    public function changeEmail(Request $request)
    {
        $request->validate([
            'email' => ['required'],
        ]);

        User::find(auth()->user()->id)->update(array('email' => $request->email));

        return response()->json(['message' => 'Email address changed successfully.']);
    }
}
