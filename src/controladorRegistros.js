function valorId(){
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
            .then(data => usuarioRegistros(data))
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

function usuarioRegistros(dato){
    var id_usuario = dato.id;
    url = "http://localhost:3000/lugares/"+id_usuario;
    if( document.getElementById('usuario').value ==""){
        swal({
            title: "Cuidado!",
            text: "Ingrese Usuario",
            icon: "warning",
            button: "OK",
          });
    }else{       
        fetch(url, {
            method:'GET'
        })
            .then(response => response.json())
            .then(data => llenar(data))
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

function llenar(dato){
    console.log(dato)
    let body='';
    for (let i=0; i< dato.length; i++){
        body +=`<tr><td>${dato[i].usuario}</td><td>${dato[i].latitud}</td><td>${dato[i].longitud}</td></tr>`
    }
    document.getElementById('registros').innerHTML = body;
}