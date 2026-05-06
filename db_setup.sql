-- db_setup.sql
  -- Run this SQL in your Hostinger hPanel → phpMyAdmin to create the tables.
  -- Go to: hPanel → Databases → phpMyAdmin → Select your database → SQL tab → paste and run.

  -- ─── Posts table ──────────────────────────────────────────────────────────
  CREATE TABLE IF NOT EXISTS `posts` (
    `id`          INT(11)      NOT NULL AUTO_INCREMENT,
    `title`       VARCHAR(255) NOT NULL,
    `description` TEXT         NOT NULL,
    `image_url`   TEXT         NOT NULL,
    `image_key`   TEXT         DEFAULT NULL,
    `link`        TEXT         DEFAULT NULL,
    `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

  -- ─── Users table (for future use — admin auth is currently via .env) ───────
  CREATE TABLE IF NOT EXISTS `users` (
    `id`         INT(11)      NOT NULL AUTO_INCREMENT,
    `username`   VARCHAR(50)  NOT NULL UNIQUE,
    `password`   VARCHAR(255) NOT NULL,
    `is_admin`   TINYINT(1)   NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  