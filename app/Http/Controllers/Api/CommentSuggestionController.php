<?php

// app/Http/Controllers/Api/CommentSuggestionController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreCommentSuggestionRequest; // Add semicolon at the end
use Illuminate\Support\Facades\Log;
use App\Models\CommentSuggestion; // Make sure to import the CommentSuggestion model

class CommentSuggestionController extends Controller
{
    public function store(StoreCommentSuggestionRequest $request)
    {
        // Validate the request data as needed
        $request->validate([
            'comment' => 'required|string',
            'suggestion' => 'required|string',
            // Add any other validation rules
        ]);

        // Store the comment and suggestion
        CommentSuggestion::create([
            'comment' => $request->input('comment'),
            'suggestion' => $request->input('suggestion'),
            // Add any other fields you need
        ]);

        return response()->json(['message' => 'Submission successful'], 200);
    }
}