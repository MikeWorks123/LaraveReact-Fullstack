<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this -> id,
            'name' => $this -> name,
            'email' => $this -> email,
            'occupation' => $this->occupation, // assuming these fields exist in the users table
            'address' => $this->address,
            'created_at' => $this -> created_at->format('Y-m-d H:i:s'),
        ];
    }
}
