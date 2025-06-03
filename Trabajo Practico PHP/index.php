<!DOCTYPE html>
<html lang="es">
<head>
  <!-- META TAGS -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Restaurante de comida tradicional argentina en Apóstoles">
  <meta name="keywords" content="Restaurante, Pastas argentina, Misiones">
  <title>Restaurante Dña. Julia | Comida Casera en Apóstoles</title>

  <!-- Enlace al archivo CSS -->
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <div class="encabezado-fijo">
    <!-- Logo y texto a la izquierda -->
    <div class="logo" title="Logo Restaurante Dña Julia">
      <img src="fotos/Dna Julia-01.png" alt="Logo Restaurante Dña Julia">
      <p>Comida casera con auténtico sabor argentino</p>
    </div>

    <!-- Navegación a la derecha -->
    <nav aria-label="Navegación principal">
      <ul>
        <li><a href="#inicio" title="Ir a Inicio">Inicio</a></li>
        <li><a href="#menu" title="Ver nuestro menú">Menú</a></li>
        <li><a href="#promociones" title="Promociones especiales">Promociones</a></li>
        <li><a href="#contacto" title="Información de contacto">Contacto</a></li>
      </ul>
    </nav>
  </div>

  <!-- MAIN con secciones, artículo y aside -->
  <main>
    <div class="main-content">
      <!-- SECCIÓN 1 -->
      <section id="inicio">
        <h2>Bienvenidos a Dña Julia</h2>
        <p>Desde 2003, ofrecemos los platos más tradicionales de la cocina Misionera.</p>
        <img src="fotos/mesa04.jpg" alt="Mesa servida en el restaurante" loading="lazy" style="max-width: 70%; height: auto;">
      </section>

      <!-- SECCIÓN 2 con TABLA -->
      <section id="menu">
        <h2>Nuestro Menú</h2>
        <table>
          <thead>
            <tr>
              <th align="left">Plato</th>
              <th align="left">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Empanadas Misioneras (6 unidades)</td>
              <td>$1500</td>
            </tr>
            <tr>
              <td>Pastas Misioneras</td>
              <td>$2500</td>
            </tr>
            <tr>
              <td>Asado con ensalada</td>
              <td>$3200</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- ARTÍCULO -->
      <article id="promociones">
        <h3>Promoción Especial</h3>
        <p>Este mes disfruta de nuestro <strong>Menú Ejecutivo</strong> por solo $3500 incluye entrada, plato principal y postre.</p>
        <p>Válido de lunes a viernes de 12:00 a 15:00 hs.</p>
      </article>
    </div>

    <!-- ASIDE -->
    <aside>
      <h3>Destacados</h3>
      <ul class="features">
        <li>Ingredientes locales</li>
        <li>Cocina tradicional</li>
        <li>Ambiente familiar</li>
      </ul>
      <img src="fotos/mesa02.jpg" alt="Mesa servida" loading="lazy" style="max-width: 70%; height: auto;">
    </aside>
  </main>

  <section id="contacto-form">
    <h2>Contacto</h2>
    
    <?php
    // Variables y mensajes
    $nombre = $email = $asunto = $mensaje = "";
    $error = $confirmacion = "";
    
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
      // Sanitizar y validar datos
      $nombre = htmlspecialchars(trim($_POST["nombre"] ?? ""));
      $email = htmlspecialchars(trim($_POST["email"] ?? ""));
      $asunto = htmlspecialchars(trim($_POST["asunto"] ?? ""));
      $mensaje = htmlspecialchars(trim($_POST["mensaje"] ?? ""));
      
      // Validaciones
      if (empty($nombre) || empty($email) || empty($asunto) || empty($mensaje)) {
        $error = "⚠️ Todos los campos son obligatorios.";
      } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "⚠️ Por favor ingrese un email válido.";
      } else {
        // Procesamiento exitoso (aquí podrías enviar un correo o guardar en BD)
        $confirmacion = "✅ Gracias $nombre por tu mensaje sobre $asunto. Te responderemos a $email.";
        
        // Opcional: Reiniciar campos después del envío
        $nombre = $email = $asunto = $mensaje = "";
      }
    }
    ?>
    
    <!-- Mostrar mensajes de error/confirmación -->
    <?php if ($error): ?>
      <div class="mensaje-error"><?= $error ?></div>
    <?php elseif ($confirmacion): ?>
      <div class="mensaje-exito"><?= $confirmacion ?></div>
    <?php endif; ?>
  
    <!-- Formulario (mismo diseño pero con PHP) -->
    <form method="POST" action="">
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value="<?= $nombre ?>" required>
      </div>
      
      <div>
        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" value="<?= $email ?>" required>
      </div>
      
      <div>
        <label for="asunto">Asunto:</label>
        <select id="asunto" name="asunto" required>
          <option value="">Seleccione...</option>
          <option value="reserva" <?= $asunto === "reserva" ? "selected" : "" ?>>Reserva</option>
          <option value="consulta" <?= $asunto === "consultar" ? "selected" : "" ?>>Consulta</option>
          <option value="feedback" <?= $asunto === "feedback" ? "selected" : "" ?>>Feedback</option>
        </select>
      </div>
      
      <div>
        <label for="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" required><?= $mensaje ?></textarea>
        <p id="contador-caracteres">0 caracteres</p>
      </div>
      
      <button type="submit">Enviar</button>
    </form>
    <div class="caja"></div>
  </section>

  <!-- FOOTER con información de contacto -->
  <footer>
    <div class="footer-container">
      <div class="footer-contacto">
        <h3 id="contacto">Contacto</h3>
        <p>📍 Calle Falsa 123, Apóstoles</p>
        <p>📞 (0387) 123-4567</p>
        <p>📧 contacto@DñaJulia.com</p>
      </div>
      <div class="footer-horarios">
        <h3>Horarios</h3>
        <p>Lunes a Sábado</p>
        <p>12:00 - 15:30 / 20:00 - 23:30</p>
      </div>
    </div>
    <p class="footer-copy">&copy; 2025 Restaurante Dña Julia. Todos los derechos reservados.</p>
  </footer>  
  <script src="scripts.js"></script>
</body>
</html>