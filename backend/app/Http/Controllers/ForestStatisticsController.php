<?php

namespace App\Http\Controllers;

use App\ForestEventHistory;
use App\ForestStatistics;
use App\ForestProblem;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ForestStatisticsController extends Controller
{
    public function showStatistics(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fromDate' => 'required',
            'untilDate' => 'required',
            'forestID' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $statistics = ForestStatistics::where('forest_id', '=', $request['forestID'])
            ->whereBetween('modified_at', [$request['fromDate'], $request['untilDate']])
            ->join('forest', 'forest.id', 'forest_statistics.forest_id')
            ->select('forest_statistics.surface', 'modified_at', 'reported_problems', 'confirmed_problems', 'declined_problems')
            ->orderBy('modified_at', 'asc')
            ->get();

        return response()->json(array('statistics' => $statistics), 200);
    }

    public function forestTreeTypeProblemStatistics(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fromDate' => 'required',
            'untilDate' => 'required',
            'forestID' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $forest_problems = ForestProblem::all();

        $statistics = array();

        $query = DB::select('SELECT at_date, problem_type, COUNT(*) as total_problems 
        FROM forest_event_history 
        LEFT JOIN forest_problem ON forest_problem.id = forest_event_history.forest_problem_id 
        WHERE forest_id = ' . $request['forestID'] . ' AND at_date >= ' . $request['fromDate'] . ' AND at_date <= "' . $request['untilDate'] . '" GROUP BY at_date');

        $dates = $this->getDatesFromRange($request['fromDate'], $request['untilDate']);

        foreach ($dates as $date) {
            $statistics[$date]['at_date'] = $date;
            foreach ($forest_problems as $forest_problem) {
                if ($forest_problem['problem_type'] == 'forest degradation') {
                    $statistics[$date]['forest_degradation'] = 0;
                } else if ($forest_problem['problem_type'] == 'getting older') {
                    $statistics[$date]['getting_older'] = 0;
                } else {
                    $statistics[$date][$forest_problem['problem_type']] = 0;
                }
            }
        }

        foreach ($query as $result) {
            foreach ($statistics as $key => $data) {
                if ($data['at_date'] == $result->at_date) {
                    $statistics[$key][$result->problem_type] = $result->total_problems;
                }
            }
        }

        return response()->json(array('statistics' => $statistics), 200);
    }

    public function getDatesFromRange($start, $end, $format = 'Y-m-d')
    {

        $array = array();

        // Variable that store the date interval 
        // of period 1 day 
        $interval = new DateInterval('P1D');

        $realEnd = new DateTime($end);
        $realEnd->add($interval);

        $period = new DatePeriod(new DateTime($start), $interval, $realEnd);

        foreach ($period as $date) {
            $array[] = $date->format($format);
        }

        return $array;
    }
}
