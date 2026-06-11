<?php
$pdo = new PDO('mysql:host=127.0.0.1', 'root', '');
$pdo->exec('CREATE DATABASE IF NOT EXISTS tena_v2');
echo "Database created successfully.";
