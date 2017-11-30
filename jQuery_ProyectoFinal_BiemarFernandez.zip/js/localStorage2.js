function editarEstudiantes(id) {
	var Estudiantes;
	for(var i = 0; i < localStorage.length; i++) {
		var clave = localStorage.key(i);
		if(clave == id) {
			estudiantes = $.parseJSON(localStorage.getItem(clave));

			$("#codigo").val(estudiantes.codigo);
			$("#nombre").val(estudiantes.nombre);
			$("#nota").val(estudiantes.nota);
		}
	}
}

function listarEstudiantes() {
	var tabla = "";
	var parrafo1 = $("#p1");

	tabla += '<table border="1">';
	tabla += '<tr>';
	tabla += '<th>CODIGO</th>';
	tabla += '<th>NOMBRE</th>';
	tabla += '<th>NOTA</th>';
	tabla += '<th>EDITAR</th>';
	tabla += '<th>ELIMINAR</th>';
	tabla += '</tr>';

	for(var i = 0; i < localStorage.length; i++) {
		var clave = localStorage.key(i);
		var estudiantes = $.parseJSON(localStorage.getItem(clave));

		tabla += '<tr>';
		tabla += '<td align="center">' + estudiantes.codigo + '</td>';
		tabla += '<td align="center">' + estudiantes.nombre + '</td>';
		tabla += '<td align="center">' + estudiantes.nota + '</td>';
		tabla += '<td align="center"><button id="boton1" onclick="editarEstudiantes(\'' + estudiantes.codigo + '\');">Editar</button></td>';
		tabla += '<td align="center"><button id="boton2" onclick="eliminarEstudiantes(\'' + estudiantes.codigo + '\');">Eliminar</button></td>';
		tabla += '</tr>';
	}
	tabla += '</table>';
	$(parrafo1).html(tabla);
}

function eliminarEstudiantes(codigo) {
	localStorage.removeItem(codigo);
	listarEstudiantes();
} 

$(document).ready(function() {
	var contador;
	if(localStorage.length > 0) {
		contador = localStorage.length + 1;
	}else{
		contador = 1;
	}

	$("#codigo").val(contador);

	$("#boton1").click(function() {
		var codigo = $("#codigo").val();
		var nombre = $("#nombre").val();
		var nota = $("#nota").val();

		var estudiantes = {
			codigo: codigo,
			nombre: nombre,
			nota: nota
		};

		localStorage.setItem(codigo, JSON.stringify(estudiantes));
		contador = localStorage.length + 1;

		listarEstudiantes();
		restablecer();

	});

	$("#boton2").click(function() {
		var promedio = 0;
		var sumatoria = 0;
		for(var i = 0; i < localStorage.length; i++) {
			var clave = localStorage.key(i);
			var estudiantes = JSON.parse(localStorage.getItem(clave));
			sumatoria += parseFloat(estudiantes.nota)
		}
		promedio = sumatoria/localStorage.length;

		if(localStorage.length == 0) {

			alert("No Ingresaste estudiantes!!");
		}else{
			alert("El promedio total de los estudiantes es: " + sumatoria/localStorage.length);
		}

	});

	$("#boton3").click(function() {
		var notaMayor;
		var nombre = "";
		for(var i = 0; i < localStorage.length; i++) {
			var clave = localStorage.key(i);
			var estudiantes = $.parseJSON(localStorage.getItem(clave));
			var nota = parseInt(estudiantes.nota);

			if(isNaN(notaMayor)) {
				notaMayor = nota;
			}else if(notaMayor < nota) {

				notaMayor = estudiantes.nota;
				nombre = estudiantes.nombre;
			}
		}
		if(localStorage.length <= 0) {
			alert("No hay estudiantes con nota mayor!!");
		}else{
			alert("La nota Mayor es: " + notaMayor + " " + nombre);
		}
	});

	$("#boton4").click(function() {
		var notaMenor;
		var nombre = "";
		for(var i = 0; i < localStorage.length; i++) {
			var clave = localStorage.key(i);
			var estudiantes = $.parseJSON(localStorage.getItem(clave));
			var nota = parseInt(estudiantes.nota);

			if(isNaN(notaMenor)) {
				notaMenor = nota;
			}else if(notaMenor > nota) {

				notaMenor = estudiantes.nota;
				nombre = estudiantes.nombre;
			}
		}
		if(localStorage.length <= 0) {
			alert("No hay registro nota menor!!");
		}else{
			alert("La nota Menor es: " + notaMenor + " " + nombre);
		}
	});

	function restablecer() {
		$("#codigo").val(contador);
		$("#nombre").val("");
		$("#nota").val("");
	}

	listarEstudiantes();
	$("nota").val();

});