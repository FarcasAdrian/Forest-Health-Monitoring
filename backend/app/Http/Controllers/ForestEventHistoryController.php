<?php

namespace App\Http\Controllers;

use App\ForestEventHistory;
use Illuminate\Http\Request;

class ForestEventHistoryController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $events_history = ForestEventHistory::where('user_id', '=', $id)
            ->join('forest', 'forest.id', '=', 'forest_event_history.forest_id')
            ->join('user', 'user.id', '=', 'forest_event_history.validator_id')
            ->join('forest_problem', 'forest_problem.id', '=', 'forest_event_history.forest_problem_id')
            ->select('forest_name', 'name', 'problem_type', 'description', 'action', 'at_date')
            ->get();
        return response()->json(array('issues_historic' => $events_history), 200);
    }
}
