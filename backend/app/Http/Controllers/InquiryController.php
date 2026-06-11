<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InquiryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'type' => 'required|string',
            'message' => 'nullable|string',
        ]);

        $inquiry = \App\Models\Inquiry::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'type' => $validated['type'],
            'message' => $validated['message'] ?? null,
            'status' => 'new',
        ]);

        // TODO: Send notification email to admin

        return response()->json([
            'message' => 'Inquiry submitted successfully.',
            'inquiry' => $inquiry
        ], 201);
    }
}
