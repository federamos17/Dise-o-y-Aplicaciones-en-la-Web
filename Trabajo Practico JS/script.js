// CONSTANTES Y VARIABLES GLOBALES
const MAX_CARACTERES = 500;
let tiempoUltimaTecla = 0;

// ELEMENTOS DEL DOM

const formulario = document.getElementById('formulario-contacto');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const asuntoSelect = document.getElementById('asunto');
const mensajeTextarea = document.getElementById('mensaje');
const contadorCaracteres = document.getElementById('contador-caracteres');
const cajaInteractiva = document.getElementById('caja-interactiva');
const precioInput = document.getElementById('precio');
const porcentajeInput = document.getElementById('porcentaje');
const btnCalcular = document.getElementById('btn-calcular');
const resultadoDescuento = document.getElementById('resultado-descuento');

// FUNCIONES REQUERIDAS

/**
 * Valida un email usando expresión regular
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido, false si no
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
}

/**
 * Calcula el precio con descuento aplicado
 * @param {number} precio - Precio original
 * @param {number} porcentaje - Porcentaje de descuento (0-100)
 * @returns {number} - Precio final con descuento
 * @throws {Error} - Si los parámetros son inválidos
 */
function calcularDescuento(precio, porcentaje) {
    // Validaciones de entrada
    if (typeof precio !== 'number' || typeof porcentaje !== 'number') {
        throw new Error('Ambos parámetros deben ser números');
    }
    if (precio <= 0) {
        throw new Error('El precio debe ser mayor a cero');
    }
    if (porcentaje < 0 || porcentaje > 100) {
        throw new Error('El porcentaje debe estar entre 0 y 100');
    }

    // Cálculo del descuento
    const descuento = precio * (porcentaje / 100);
    const precioFinal = precio - descuento;
    
    // Redondeo a 2 decimales para valores monetarios
    return parseFloat(precioFinal.toFixed(2));
}

/**
 * Genera un mensaje personalizado de agradecimiento
 * @param {string} nombre - Nombre del usuario
 * @param {string} asunto - Asunto seleccionado
 * @returns {string} - Mensaje personalizado
 * @throws {Error} - Si faltan parámetros
 */
function generarMensaje(nombre, asunto) {
    if (!nombre || !nombre.trim()) {
        throw new Error('El nombre es requerido');
    }
    if (!asunto) {
        throw new Error('El asunto es requerido');
    }
    
    return `Gracias ${nombre.trim()} por contactarnos sobre ${asunto}. Te responderemos a la brevedad.`;
}

/*MANIPULACIÓN DEL DOM - FORMULARIO*/

// Contador de caracteres para el textarea
function actualizarContador() {
    const longitud = mensajeTextarea.value.length;
    const caracteresRestantes = MAX_CARACTERES - longitud;
    
    contadorCaracteres.textContent = `${longitud}/${MAX_CARACTERES} caracteres`;
    contadorCaracteres.style.color = caracteresRestantes < 20 ? 'var(--error-color)' : 'var(--gray-color)';
    
    if (longitud >= MAX_CARACTERES) {
        mensajeTextarea.value = mensajeTextarea.value.substring(0, MAX_CARACTERES);
    }
}

// Evento con debounce para mejor performance
mensajeTextarea.addEventListener('input', () => {
    clearTimeout(tiempoUltimaTecla);
    tiempoUltimaTecla = setTimeout(actualizarContador, 300);
});

// Caja interactiva
cajaInteractiva.addEventListener('mouseenter', () => {
    cajaInteractiva.style.backgroundColor = 'var(--primary-color)';
    cajaInteractiva.querySelector('span').style.color = '#fff';
    cajaInteractiva.style.transform = 'scale(1.05)';
});

cajaInteractiva.addEventListener('mouseleave', () => {
    cajaInteractiva.style.backgroundColor = 'var(--light-color)';
    cajaInteractiva.querySelector('span').style.color = 'var(--gray-color)';
    cajaInteractiva.style.transform = 'scale(1)';
});

/*VALIDACIÓN DE FORMULARIO*/
function mostrarError(elemento, mensaje) {
    // Limpiar errores previos
    limpiarError(elemento);
    
    // Crear elemento de error
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = mensaje;
    
    // Aplicar estilos de error
    elemento.style.borderColor = 'var(--error-color)';
    elemento.insertAdjacentElement('afterend', errorElement);
}

function limpiarError(elemento) {
    // Eliminar mensaje de error si existe
    const errorElement = elemento.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    
    // Restaurar estilo normal
    elemento.style.borderColor = '#ddd';
}

function validarFormulario() {
    let valido = true;
    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const asunto = asuntoSelect.value;
    const mensaje = mensajeTextarea.value.trim();

    // Validar nombre
    if (nombre.length < 3) {
        mostrarError(nombreInput, 'El nombre debe tener al menos 3 caracteres');
        valido = false;
    } else {
        limpiarError(nombreInput);
    }

    // Validar email
    if (!email) {
        mostrarError(emailInput, 'El email es requerido');
        valido = false;
    } else if (!validarEmail(email)) {
        mostrarError(emailInput, 'Ingrese un email válido (ej: usuario@dominio.com)');
        valido = false;
    } else {
        limpiarError(emailInput);
    }

    // Validar asunto
    if (!asunto) {
        mostrarError(asuntoSelect, 'Por favor seleccione un asunto');
        valido = false;
    } else {
        limpiarError(asuntoSelect);
    }

    // Validar mensaje
    if (!mensaje) {
        mostrarError(mensajeTextarea, 'El mensaje es requerido');
        valido = false;
    } else if (mensaje.length > MAX_CARACTERES) {
        mostrarError(mensajeTextarea, `El mensaje no debe exceder ${MAX_CARACTERES} caracteres`);
        valido = false;
    } else {
        limpiarError(mensajeTextarea);
    }

    return valido;
}

/*CALCULADORA DE DESCUENTOS*/
btnCalcular.addEventListener('click', () => {
    try {
        const precio = parseFloat(precioInput.value);
        const porcentaje = parseFloat(porcentajeInput.value);
        
        const precioFinal = calcularDescuento(precio, porcentaje);
        
        resultadoDescuento.textContent = 
            `Precio final: $${precioFinal.toFixed(2)} (${porcentaje}% de descuento aplicado)`;
        resultadoDescuento.className = 'resultado';
        
    } catch (error) {
        resultadoDescuento.textContent = error.message;
        resultadoDescuento.className = 'resultado error';
    }
});

/* EVENTO SUBMIT DEL FORMULARIO*/
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validar formulario
    if (!validarFormulario()) return;
    
    // Mostrar estado de carga
    const submitBtn = formulario.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Enviando... <span class="spinner"></span>';
    submitBtn.disabled = true;
    
    // Simular envío (en una aplicación real sería una petición AJAX)
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generar y mostrar mensaje de confirmación
        const mensajeConfirmacion = generarMensaje(
            nombreInput.value.trim(),
            asuntoSelect.options[asuntoSelect.selectedIndex].text
        );
        
        alert(mensajeConfirmacion);
        console.log('Formulario enviado:', mensajeConfirmacion);
        
        // Resetear formulario
        formulario.reset();
        actualizarContador();
        
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Ocurrió un error al enviar el formulario');
    } finally {
        // Restaurar botón
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

/* VALIDACIÓN EN TIEMPO REAL*/
emailInput.addEventListener('blur', () => {
    if (emailInput.value && !validarEmail(emailInput.value)) {
        mostrarError(emailInput, 'Ingrese un email válido (ej: usuario@dominio.com)');
    }
});

// Limpiar errores al enfocar
[nombreInput, emailInput, asuntoSelect, mensajeTextarea, precioInput, porcentajeInput].forEach(elemento => {
    elemento.addEventListener('focus', () => limpiarError(elemento));
});

/*INICIALIZACIÓN*/
document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicación inicializada');
    actualizarContador();
    
    // Pruebas automáticas de las funciones
    console.group("Pruebas de calcularDescuento");
    console.log("Precio: 100, Descuento: 10% →", calcularDescuento(100, 10)); // 90
    console.log("Precio: 50, Descuento: 20% →", calcularDescuento(50, 20)); // 40
    console.log("Precio: 200, Descuento: 15% →", calcularDescuento(200, 15)); // 170
    console.groupEnd();
});