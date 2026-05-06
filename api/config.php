<?php
  // api/config.php
  // ─── MySQL Database Configuration for Hostinger ───────────────────────────
  // Fill in these values from your Hostinger hosting panel → MySQL Databases
  // hPanel → Databases → MySQL Databases

 define('DB_HOST', 'localhost');           // Always 'localhost' on Hostinger shared hosting
  define('DB_NAME', 'u555257237_ruadacademy'); // e.g. u123456789_ruad
  define('DB_USER', 'u555257237_ruaday'); // e.g. u123456789_ruaduser
  define('DB_PASS', 'Ruadruad2026'); // Your MySQL password
  define('DB_CHARSET', 'utf8mb4');

  // ─── Create PDO connection ────────────────────────────────────────────────
  function getDB(): PDO {
      $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
      $options = [
          PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
          PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
          PDO::ATTR_EMULATE_PREPARES   => false,
      ];
      return new PDO($dsn, DB_USER, DB_PASS, $options);
  }
  