<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Nette\Schema\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
//    public function register(): void
//    {
//        $this->reportable(function (Throwable $e) {
//        });
//    }

    public function render($request, Throwable $e)
    {
        if($e instanceof ValidationException) {
            return response([
                'errors' => $e->errors()
            ], 400);
        }

        return response(['error' => $e->getMessage()], $e->getCode() ?: 400);
    }

}
