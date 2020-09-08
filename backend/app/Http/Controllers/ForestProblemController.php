<?php

namespace App\Http\Controllers;

use App\ForestProblem;
use Illuminate\Http\Request;

class ForestProblemController extends Controller
{
    public function index() {
        return response()->json(array('forestProblems' => ForestProblem::all()), 200);
    }
}
