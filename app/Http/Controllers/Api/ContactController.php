<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Contact;

use App\Http\Requests\StoreContactRequest;

class ContactController extends Controller
{

    public function index()
    {
        return Contact::all();
    }

    public function store(Request $request)
    {
        // Validation has already been performed at this point
        $pdfPath = $request->file('pdf_file') ? $request->file('pdf_file')->storeAs('src/pdfs', $request->file('pdf_file')->getClientOriginalName()) : null;


        Contact::create([
            'company' => $request->input('company'),
            'address' => $request->input('address'),
            'contact_person' => $request->input('contact_person'),
            'phone_number' => $request->input('phone_number'),
            'pdf_path' => $pdfPath,
        ]);

        return response()->json(['message' => 'Comment submitted successfully'], 201);
    }
}
