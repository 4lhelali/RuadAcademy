<?php
  // api/posts.php
  // REST API for posts — supports GET, POST, DELETE
  // Deployed on Hostinger shared hosting with MySQL

  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');

  // Handle preflight OPTIONS request
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      http_response_code(200);
      exit();
  }

  require_once __DIR__ . '/config.php';

  // Helper: send JSON response
  function respond(int $code, mixed $data): void {
      http_response_code($code);
      echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
      exit();
  }

  // Helper: convert a DB row (snake_case) to camelCase Post object
  function formatPost(array $row): array {
      return [
          'id'          => (int) $row['id'],
          'title'       => $row['title'],
          'description' => $row['description'],
          'imageUrl'    => $row['image_url'],
          'imageKey'    => $row['image_key'],
          'link'        => $row['link'],
          'createdAt'   => $row['created_at'],
          'updatedAt'   => $row['updated_at'],
      ];
  }

  try {
      $db = getDB();
      $method = $_SERVER['REQUEST_METHOD'];
      $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
      $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : null;

      // ─── GET /api/posts.php ─────────────────────────────────────────────────
      if ($method === 'GET') {
          if ($id !== null) {
              // Single post by ID
              $stmt = $db->prepare('SELECT * FROM posts WHERE id = ? LIMIT 1');
              $stmt->execute([$id]);
              $row = $stmt->fetch();
              if (!$row) {
                  respond(404, ['error' => 'Post not found']);
              }
              respond(200, formatPost($row));
          } else {
              // All posts or limited recent posts
              if ($limit !== null && $limit > 0) {
                  $stmt = $db->prepare('SELECT * FROM posts ORDER BY created_at DESC LIMIT ?');
                  $stmt->bindValue(1, $limit, PDO::PARAM_INT);
                  $stmt->execute();
              } else {
                  $stmt = $db->query('SELECT * FROM posts ORDER BY created_at DESC');
              }
              $posts = array_map('formatPost', $stmt->fetchAll());
              respond(200, $posts);
          }
      }

      // ─── POST /api/posts.php ────────────────────────────────────────────────
      if ($method === 'POST') {
          $body = json_decode(file_get_contents('php://input'), true);
          if (!$body) {
              respond(400, ['error' => 'Invalid JSON body']);
          }

          $title       = trim($body['title'] ?? '');
          $description = trim($body['description'] ?? '');
          $imageUrl    = trim($body['image_url'] ?? '');
          $imageKey    = $body['image_key'] ?? null;
          $link        = $body['link'] ?? null;

          if (!$title || !$description || !$imageUrl) {
              respond(400, ['error' => 'title, description, and image_url are required']);
          }

          $stmt = $db->prepare(
              'INSERT INTO posts (title, description, image_url, image_key, link)
               VALUES (?, ?, ?, ?, ?)'
          );
          $stmt->execute([$title, $description, $imageUrl, $imageKey, $link]);
          $newId = (int) $db->lastInsertId();

          $stmt2 = $db->prepare('SELECT * FROM posts WHERE id = ?');
          $stmt2->execute([$newId]);
          respond(201, formatPost($stmt2->fetch()));
      }

      // ─── DELETE /api/posts.php?id=X ─────────────────────────────────────────
      if ($method === 'DELETE') {
          if ($id === null) {
              respond(400, ['error' => 'id query parameter is required']);
          }
          $stmt = $db->prepare('DELETE FROM posts WHERE id = ?');
          $stmt->execute([$id]);
          if ($stmt->rowCount() === 0) {
              respond(404, ['error' => 'Post not found']);
          }
          respond(200, ['success' => true, 'deleted_id' => $id]);
      }

      respond(405, ['error' => 'Method not allowed']);

  } catch (PDOException $e) {
      respond(500, ['error' => 'Database error: ' . $e->getMessage()]);
  } catch (Exception $e) {
      respond(500, ['error' => $e->getMessage()]);
  }
  