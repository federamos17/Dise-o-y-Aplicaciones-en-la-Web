// ===== FUNCIONES REQUERIDAS =====

// 1. Validar email
function validarEmail(email) {
  const regex = /.+@.+\..+/;
  return regex.test(email);
}

// 2. Calcular descuento
function calcularDescuento(precio, porcentaje) {
  return precio - (precio * porcentaje / 100);
}

// 3. Generar mensaje
function generarMensaje(nombre, asunto) {
  return `Gracias ${nombre} por contactarnos sobre ${asunto}. Te responderemos pronto.`;
}

// ===== DOM Y EVENTOS =====

document.addEventListener('DOMContentLoaded', () => {
  // Formulario
  //const formulario = document.getElementById('formulario-contacto');
  
  // Contador de caracteres
  const textarea = document.getElementById('mensaje');
  const contador = document.getElementById('contador-caracteres');
  
  textarea.addEventListener('input', () => {
    contador.textContent = `${textarea.value.length} caracteres`;
  });

  // Efecto hover en caja
  const caja = document.querySelector('.caja');
  
  caja.addEventListener('mouseover', () => {
    caja.style.backgroundColor = 'lightblue';
  });
  
  caja.addEventListener('mouseout', () => {
    caja.style.backgroundColor = 'lightgray';
  });

  // Validar formulario al enviar
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    
    // Validar email
    if (!validarEmail(email)) {
      alert('Por favor ingrese un email válido');
      return;
    }
    
    // Mostrar mensaje de confirmación
    const mensaje = generarMensaje(nombre, asunto);
    console.log(mensaje); // Requerimiento de consigna
    alert(mensaje);
    
    // Resetear formulario
    formulario.reset();
    contador.textContent = '0 caracteres';
  });

  // Probar función de descuento (requerimiento)
  console.log("Descuento 1:", calcularDescuento(100, 10)); // 90
  console.log("Descuento 2:", calcularDescuento(200, 25)); // 150
  console.log("Descuento 3:", calcularDescuento(500, 50)); // 250
});