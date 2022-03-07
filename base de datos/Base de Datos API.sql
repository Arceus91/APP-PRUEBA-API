-- creacion de base de datos
create database apiDB;
use apiDB;

-- desactivar la opcion de autocommit
set autocommit=0;
SELECT @@AUTOCOMMIT;

-- en caso el usuario no acepte la conexion usar este comando
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'djmaster_21';

-- CREACION DE TABLAS
create table apidb.usuarios(
id int not null primary key auto_increment ,
nombre varchar(50),
usuario varchar(50) unique,
contraseña varchar(50)
);

create table apidb.ubicaciones(
id int not null primary key auto_increment,
id_usuario int,
latitud varchar(15),
longitud varchar(15),
foreign key (id_usuario) references apiDB.usuarios(id)
);

-- INSERTS DE PRUEBA EN LA TABLA DE USUARIOS
insert into apidb.usuarios( id, nombre, usuario, contraseña) values (1,'Joel Paiz', 'jpaiz','1234');
insert into apidb.usuarios( id, nombre, usuario, contraseña) values (2,'Salvador Ortiz', 'sortiz','4321');
select *from apidb.usuarios;

-- INSERT DE PRUEBA EN LA TABLA DE UBICACIONES
insert into apidb.ubicaciones(id_usuario,latitud,longitud) values(1,'14.2853031','-90.7947797');
insert into apidb.ubicaciones(id_usuario,latitud,longitud) values(2,'15.2853031','-90.7947792');
select * from apidb.ubicaciones;

-- DROPEO DE TABLAS SI ES NECESARIO
drop table apidb.usuarios;
drop table apidb.ubicaciones;

-- PROCEDIMIENTO ALMACENADO USUARIOS
CREATE DEFINER=`root`@`localhost` PROCEDURE `prueba`(
	in _id int,
    in _nombre varchar(50),
    in _usuario varchar(50),
    in _contraseña varchar(50)
    )
begin
    if _id = 0 then 
		insert into apidb.usuarios (nombre, usuario, contraseña)
        values (_nombre, _usuario, _contraseña); 
        set _id = last_insert_id();
        
	else 
        update apidb.usuarios set 
        nombre = _nombre,
        usuario = _usuario,
        contraseña = _contraseña
        where id = _id;
        
	end if; 
    select _id as id;
end;

-- PROCEDIMIENTO ALMACENADO UBICACIONES
CREATE DEFINER=`root`@`localhost` PROCEDURE `ingresoUbicaciones`(
	in _id int,
    in _idUser int,
    in _latitud varchar(15),
    in _longitud varchar(15)
)
begin
	 if _id = 0 then 
		insert into apidb.ubicaciones (id_usuario, latitud, longitud)
        values (_idUser, _latitud, _longitud); 
        set _id = last_insert_id();
	else 
        update apidb.ubicaciones set 
        id_usuario = _idUser,
        latitud = _latitud,
        longitud = _longitud
        where id = _id;
	end if; 
    select _id as id;
end;

-- LLAMADAS DE PROCEDIMIENTOS
CALL ingresoUsuarios(0,'Carlos Gomez','cgomez','12345');
CALL ingresoUbicaciones(0,1,'14.2853031','-90.7947797');

-- CONSULTAS
	select id from usuarios where usuario = 'jpaiz'; 
    
    select ub.id_usuario, u.usuario, ub.latitud, ub.longitud 
    from usuarios u, ubicaciones ub 
    where u.id = ub.id_usuario and ub.id_usuario =1;

-- COMMIT Y ROLLBACK
commit;
rollback;
