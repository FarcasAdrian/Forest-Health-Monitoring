<?php

namespace App\Http\Controllers;

use App\ForestEvent;
use App\User;
use App\Forest;
use App\ForestEventHistory;
use App\ForestProblem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class ForestEventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $events = ForestEvent::all();

        foreach ($events as $index => $event) {
            $userEmail = User::select('email')->where('id', '=', $events[$index]->user_id)->first();
            $events[$index]['userEmail'] = $userEmail->email;

            $forestProblem = ForestProblem::select('problem_type')->where('forest_problem.id', '=', $events[$index]->forest_problem_id)->first();
            $events[$index]['forestProblem'] = $forestProblem['problem_type'];

            $forestName = Forest::select('forest_name')->where('id', '=', $events[$index]->forest_id)->first();
            $events[$index]['forestName'] = $forestName->forest_name;

            if ($events[$index]->photo) {
                $events[$index]->photo = '/uploads/forest_issues/' . $events[$index]->user_id . '/' . $events[$index]->photo;
            }
        }
        return response()->json(array('issues' => $events), 200);
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
            'userID' => 'required',
            'forestID' => 'required',
            'forestProblemID' => 'required',
            'description' => 'required',
            'validated' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $forest = new ForestEvent([
            'user_id' => $request->get('userID'),
            'forest_id' => $request->get('forestID'),
            'forest_problem_id' => $request->get('forestProblemID'),
            'description' => $request->get('description'),
            'photo' => $request->get('photo'),
            'validated' => 'New',
        ]);
        $forest->save();

        return response()->json(array('message' => 'Your report was sent! If we will need more informations we will contact you on your email address.'), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $events = ForestEvent::all()->where('forest_id', '=', $id);

        foreach ($events as $index => $event) {
            $userEmail = User::select('email')->where('id', '=', $events[$index]->user_id)->first();
            $events[$index]['userEmail'] = $userEmail->email;

            $forestProblem = ForestProblem::select('problem_type')->where('forest_problem.id', '=', $events[$index]->forest_problem_id)->first();
            $events[$index]['forestProblem'] = $forestProblem['problem_type'];

            if ($events[$index]->photo) {
                $events[$index]->photo = '/uploads/forest_issues/' . $events[$index]->user_id . '/' . $events[$index]->photo;
            }
        }
        return response()->json(array('issues' => $events), 200);
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
        $forest_event = ForestEvent::find($id);
        $forest_event->validated = $request->get('validated');
        $forest_event->save();

        $forest_event_history = new ForestEventHistory([
            'user_id' => $forest_event->user_id,
            'forest_id' => $forest_event->forest_id,
            'validator_id' => auth()->id(),
            'description' => $forest_event->description,
            'action' => $forest_event->validated,
            'at_date' => date('Y/m/d h:m:s'),
        ]);
        $forest_event_history->save();

        return response()->json(array('message' => 'The issue was ' . $request->get('validated') .  '!'), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $forest = ForestEvent::find($id);
        $forest->delete();

        return response()->json(array('message' => 'Event deleted!'), 200);
    }
}
