function valor(){
    var usuario = document.getElementById('usuario').value;
    if( document.getElementById('usuario').value ==""){
        swal({
            title: "Cuidado!",
            text: "Ingrese Usuario",
            icon: "warning",
            button: "OK",
          });
    }else{
        url = "http://localhost:3000/ubicaciones/"+usuario;
        fetch(url, {
            method:'GET'
        })
            .then(response => response.json())
            .then(data => localizar(data))
            .catch(error => {
                swal({
                    title: "Error!",
                    text: "Usuario no Existe",
                    icon: "error",
                    button: "OK",
                  });
                  console.log(error);
              });
    }         
};


function localizar(dato){
    var id_usuario = dato.id;
    const url = 'http://localhost:3000/ubicaciones';
    const id = document.getElementById('id').value;
    if('geolocation' in navigator){
		navigator.geolocation.getCurrentPosition( position =>{
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
            const latitud = lat.toString();
            const longitud = lon.toString();
	        const data = {id, id_usuario , latitud, longitud};
	        //alert(JSON.stringify(data));
	            fetch(url, {
	            	method: 'POST', 
		            headers:{
		              'Content-Type': 'application/json',
		            },
	            	body: JSON.stringify(data),
	                }).then(res => res.json())
	                .then (res => {
                        swal({
                            title: "Insertado!",
                            text: "Se Guardo el Registro",
                            icon: "success",
                            button: "OK",
                          });
                        document.getElementById('usuario').value="";
		              console.log(res)}
		              )
                      .catch(error => {
                        swal({
                            title: "Error!",
                            text: "Error:"+error,
                            icon: "error",
                            button: "OK",
                          });
                          console.log(error);
                      });
		});
	};
}
