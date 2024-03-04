<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CommentSuggestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentSuggestionController extends Controller
{
    public function submitCommentsSuggestions(Request $request)
    {
        $request->validate([
            'comment' => 'required|string',
            'suggestion' => 'required|string',
        ]);

        $user = Auth::user(); // Laravel's authentication

        $commentSuggestion = CommentSuggestion::create([
            'user_id' => $user->id,
            'comment' => $request->input('comment'),
            'suggestion' => $request->input('suggestion'),
        ]);

        return response()->json(['success' => true]);
    }

    // Add more methods as needed for managing comments and suggestions
}
