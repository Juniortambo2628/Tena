<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Dynamically determine the core path based on environment
$corePath = __DIR__.'/..';
if (isset($_SERVER['DOCUMENT_ROOT']) && strpos($_SERVER['DOCUMENT_ROOT'], 'tena.okjtech.co.ke') !== false) {
    $corePath = '/home/zhpebukm/tena-core';
} elseif (isset($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'api-dntwed.okjtech.co.ke') !== false) {
    $corePath = '/home/zhpebukm/tena-core';
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = $corePath.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require $corePath.'/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
(require_once $corePath.'/bootstrap/app.php')
    ->handleRequest(Request::capture());
