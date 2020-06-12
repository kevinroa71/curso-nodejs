var socket = io(),
    params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala'),
    img: Math.floor((Math.random() * 8) + 1)
};

socket.on('connect', function() {
    socket.emit('entrarChat', usuario);
});

socket.on('notificacion', function(mensaje) {
    alert(mensaje);
});

socket.on('usuariosconectados', function(usuarios) {
    renderizarUsuarios(usuarios);
});

socket.on('mensaje', function(data) {
    renderizarMensaje(data.mensaje, data.usuario);
});

// Funciones JQUERY
$("#title-sala").text(params.get('sala'));
var divUsuarios = $('#divUsuarios');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

function scrollBottom() {
    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

function renderizarUsuarios(usuarios) {
    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> '+params.get('sala')+'</span></a>';
    html += '</li>';

    usuarios.forEach(function(usuario) {
        html += '<li>';
        html += '    <a data-id="'+usuario.id+'" href="javascript:void(0)"><img src="assets/images/users/'+usuario.img+'.jpg" alt="user-img" class="img-circle"> <span>'+usuario.nombre+'<small class="text-success">online</small></span></a>';
        html += '</li>';
    });

    divUsuarios.html(html);
    scrollBottom();
}

function renderizarMiMensaje(mensaje) {
    var html = '';

    html += '<li class="reverse">';
    html += '    <div class="chat-content">';
    html += '        <h5>'+params.get('nombre')+'</h5>';
    html += '        <div class="box bg-light-inverse">'+mensaje+'</div>';
    html += '    </div>';
    html += '    <div class="chat-img"><img src="assets/images/users/'+usuario.img+'.jpg" alt="user" /></div>';
    html += '    <div class="chat-time">10:57 am</div>';
    html += '</li>';

    divChatbox.append(html);
    scrollBottom();
}

function renderizarMensaje(mensaje, usuario) {
    var html = '';

    html += '<li>';
    html += '    <div class="chat-img"><img src="assets/images/users/'+usuario.img+'.jpg" alt="user" /></div>';
    html += '    <div class="chat-content">';
    html += '        <h5>'+usuario.nombre+'</h5>';
    html += '        <div class="box bg-light-info">'+mensaje+'</div>';
    html += '    </div>';
    html += '    <div class="chat-time">10:56 am</div>';
    html += '</li>';

    divChatbox.append(html);
}

divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

$("#formularioMensaje").on('submit', function(e) {
    e.preventDefault();
    var mensaje = txtMensaje.val().trim();
    if (mensaje) {
        socket.emit('mensaje', mensaje, function() {
            txtMensaje.val('').focus();
            renderizarMiMensaje(mensaje);
        });
    }
});