<?php

namespace App\Helpers;

class ApiFormatter {
    protected static $response = [
        'meta' => [
            'code' => null,
            'message' => null,
            'status' => null
        ],
        'data' => null
    ];

    public static function createApi($code = null, $message = null, $data = null, $status = null) {
        self::$response['meta']['code'] = $code;
        self::$response['meta']['message'] = $message;
        self::$response['data'] = $data;
        self::$response['status'] = $status;

        return response()->json(self::$response, self::$response['code']);
    }
}