<?php

namespace App\Http\Controllers;

use App\ForestEvent;
use App\ForestEventHistory;
use App\User;
use App\UserForestRequest;
use Carbon\Carbon;

class UserStatisticsController extends Controller
{

    /** Get reports statistics for administrator access
     * 
     */
    public function getAdminReportsStatistics($userID)
    {
        $user = User::select('forest_id', 'user_type_id')->where('id', '=', $userID)->first();
        $userAccessType = $user->user_type_id;

        if ($userAccessType == 3) {
            return response()->json(array(
                'foresterRequests' => UserForestRequest::all()->count(),
                'issues' => ForestEvent::where('validated', '=', 'No')->count(),
                'newUsers' => self::getNewUsers()
            ), 200);
        };

        return response()->json(array('error' => 'Access denied!'), 400);
    }

    /** Get forest issues statistics for forester / administrator (if has a assigmented forest) access
     * 
     */
    public function getForesterIssuesStatistics($userID)
    {
        $user = User::select('forest_id', 'user_type_id')->where('id', '=', $userID)->first();
        $forestID = $user->forest_id;

        if ($user->user_type_id != 1) {
            return response()->json(array(
                'confirmed' => self::getConfirmedForestIssues($forestID),
                'declined' => self::getDeclinedForestIssues($forestID),
                'neconfirmed' => self::getNeconfirmedForestIssues($forestID)
            ), 200);
        };

        return response()->json(array('error' => 'Access denied!'), 400);
    }

    /** Get statistics for user
     * 
     */
    public function getUserStatistics($userID)
    {
        return response()->json(array(
            'confirmed' => self::getConfirmedIssues($userID),
            'declined' => self::getDeclinedIssues($userID),
            'neconfirmed' => self::getNeconfirmedYetIssues($userID)
        ), 200);
    }

    public static function getConfirmedIssues($userID)
    {
        return ForestEventHistory::where([
            ['user_id', '=', $userID],
            ['action', '=', 'Confirmed'],
        ])
            ->whereDate('at_date', '=', Carbon::now()->format('Y-m-d'))
            ->count();
    }

    public static function getDeclinedIssues($userID)
    {
        return ForestEventHistory::where([
            ['user_id', '=', $userID],
            ['action', '=', 'Declined'],
        ])
            ->whereDate('at_date', '=', Carbon::now()->format('Y-m-d'))
            ->count();
    }

    public static function getNeconfirmedYetIssues($userID)
    {
        return ForestEvent::where([
            ['user_id', '=', $userID],
            ['validated', '=', 'No']
        ])->count();
    }

    public static function getConfirmedForestIssues($forestID)
    {
        return ForestEvent::where([
            ['forest_id', '=', $forestID],
            ['validated', '=', 'Confirmed']
        ])->count();
    }

    public static function getDeclinedForestIssues($forestID)
    {
        return ForestEvent::where([
            ['forest_id', '=', $forestID],
            ['validated', '=', 'Declined']
        ])->count();
    }

    public static function getNeconfirmedForestIssues($forestID)
    {
        return ForestEvent::where([
            ['forest_id', '=', $forestID],
            ['validated', '=', 'No']
        ])->count();
    }

    public static function getNewUsers()
    {
        return User::where('register_at', '=', Carbon::now()->format('Y-m-d'))->count();
    }
}
