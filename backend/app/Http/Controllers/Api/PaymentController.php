<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    /**
     * Verify a Paystack transaction
     */
    public function verify(Request $request)
    {
        $request->validate([
            'reference' => 'required|string',
            'service_id' => 'required|exists:services,id',
        ]);

        $reference = $request->reference;
        $secretKey = config('services.paystack.secret_key') ?? env('PAYSTACK_SECRET_KEY');

        try {
            $response = Http::withToken($secretKey)
                ->get("https://api.paystack.co/transaction/verify/" . $reference);

            if (!$response->successful()) {
                return response()->json([
                    'message' => 'Failed to verify transaction with Paystack.'
                ], 400);
            }

            $data = $response->json()['data'];

            if ($data['status'] !== 'success') {
                return response()->json([
                    'message' => 'Transaction was not successful.',
                    'status' => $data['status']
                ], 400);
            }

            // Check if payment already exists
            $existing = Payment::where('reference', $reference)->first();
            if ($existing) {
                return response()->json([
                    'message' => 'Payment already processed.',
                    'payment' => $existing
                ]);
            }

            // Create payment record
            $payment = Payment::create([
                'user_id' => auth()->id() ?? 1, // Fallback for dev
                'service_id' => $request->service_id,
                'reference' => $reference,
                'amount' => $data['amount'] / 100, // Convert from kobo/cents
                'currency' => $data['currency'],
                'status' => 'success',
                'channel_details' => [
                    'channel' => $data['channel'],
                    'card_type' => $data['authorization']['brand'] ?? null,
                    'last4' => $data['authorization']['last4'] ?? null,
                ]
            ]);

            return response()->json([
                'message' => 'Payment verified successfully.',
                'payment' => $payment
            ], 201);

        } catch (\Exception $e) {
            Log::error('Paystack Verification Error: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred during verification.'
            ], 500);
        }
    }

    /**
     * Get user payment history
     */
    public function history()
    {
        $payments = Payment::with('service')
            ->where('user_id', auth()->id())
            ->orderByDesc('created_at')
            ->get();

        return response()->json($payments);
    }
}
