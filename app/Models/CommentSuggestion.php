<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentSuggestion extends Model
{
    protected $fillable = ['comment', 'suggestion'];

    // Define relationships or any other configurations here
}
