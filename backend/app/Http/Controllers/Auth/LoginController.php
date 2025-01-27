<?php

// LoginController

namespace App\Http\Controllers\Auth;

use App\Exceptions\AlreadyAuthenticatedException;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    use ApiResponses;

    public function __invoke(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::check()) {
            throw new AlreadyAuthenticatedException();
        }
        
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = $request->user();

            return $this->success('User logged in successfully', ['user'=>$user]);
        }

        throw ValidationException::withMessages([
            'email' => __('The provided credentials do not match our records.'),
        ]);
    }

    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        //$request->session()->regenerateToken();

        return response()->noContent();
    }
}