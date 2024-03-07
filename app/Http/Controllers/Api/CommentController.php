<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index()
    {
        return Comment::all();
    }

    public function store(Request $request)
    {
        // Logic to store the submitted comment
        // For example:
        Comment::create([
            'comment' => $request->input('comment'),
            'suggestion' => $request->input('suggestion'),
        ]);

        return response()->json(['message' => 'Comment submitted successfully'], 201);
    }
}