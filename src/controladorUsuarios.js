
function enviar(){
	const url = 'http://localhost:3000/usuarios';
	const id = document.getElementById('id').value;
	const nombre = document.getElementById('nombre').value;
	const usuario = document.getElementById('usuario').value;
	const contraseña = document.getElementById('contraseña').value;
	//alert( id+' '+ ' '+nombre+ ' '+ usuario+ ' '+ contraseña);
	const data = {id , nombre, usuario, contraseña};
	//alert(JSON.stringify(data));
	if(document.getElementById('nombre').value =="" || document.getElementById('usuario').value ==""
	|| document.getElementById('contraseña').value =="" ){
		swal({
            title: "Cuidado!",
            text: "Ingrese Todos los Campos",
            icon: "warning",
            button: "OK",
          });
	}else{
		fetch(url, {
			method: 'POST', 
			headers:{
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		  }).then(res => res.json())
		  .then (res => {
			document.getElementById('nombre').value="";
			document.getElementById('usuario').value="";
			document.getElementById('contraseña').value="";
			  console.log(res)
			  //alert("Usuario Registrado")
			  swal({
				title: "Insertado!",
				text: "Se Guardo el Registro",
				icon: "success",
				button: "OK",
			  });
			}).catch(error => {
				swal({
                    title: "Error!",
                    text: "No se Inserto"+error,
                    icon: "error",
                    button: "OK",
                  });
				console.log(error);
				
			});
	}
};