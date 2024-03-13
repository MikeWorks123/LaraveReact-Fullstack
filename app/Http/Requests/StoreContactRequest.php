<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'company' => 'required|string',
            'address' => 'required|string',
            'contact_person' => 'required|string',
            'phone_number' => 'required|string',
            'pdf_file' => 'file|mimes:pdf|max:10240',
        ];
    }

    public function messages()
    {
        return [
            // Add custom error messages if needed
        ];
    }
}
