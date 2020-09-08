<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UploadController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function emptyDirectory($path)
    {
        $files = glob($path . '/*');
        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file);
            }
        }
    }

    public function uploadUserProfileImage(Request $request)
    {
        $this->validate($request, [
            'image' => 'required|mimes:jpeg,png,jpg|max:2048',
        ],
            [
                'image.required' => 'You must to choose a image.',
                'image.mimes' => 'You can upload just images in format: jpeg, png, jpg.',
                'image.uploaded' => 'You can not upload images with more size than 2MB.',
            ]);

        $image = $request->file('image');
        $name = $image->getClientOriginalName();
        $user_id = auth()->user()->id;
        $local_path = '/uploads/avatars/' . $user_id . '/';
        $path = public_path() . $local_path;

        // remove old image and upload the new one
        $this->emptyDirectory($path);
        $image->move($path, $name);

        DB::table('user')->where('id', $user_id)->update(['profile_picture' => $name]);

        return response()->json(array('path' => $local_path . $name), 200);
    }

    public function uploadForestIssueImage(Request $request)
    {
        $this->validate($request, [
            'image' => 'mimes:jpeg,png,jpg|max:2048',
        ],
            [
                'image.mimes' => 'You can upload just images in format: jpeg, png, jpg.',
                'image.uploaded' => 'You can not upload images with more size than 2MB.',
            ]);

        $image = $request->file('image');
        $name = $image->getClientOriginalName();
        $user_id = auth()->user()->id;
        $local_path = '/uploads/forest_issues/' . $user_id . '/';
        $path = public_path() . $local_path;

        $image->move($path, $name);

        return response()->json(array('imageName' => $name), 200);
    }
}