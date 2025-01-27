<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'nullable|in:practice,lecture',
            'subject' => 'nullable|string',
            'room' => 'nullable|string|max:255',
            'teacher' => 'nullable|string|max:255',
            'order' => 'nullable|integer|between:1,8',
            'date' => 'nullable|date',
            'homework' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'test' => 'nullable|boolean',
            'project' => 'nullable|boolean',
            'colloquium' => 'nullable|boolean',
        ];
    }
}
