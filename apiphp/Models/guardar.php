<?php

include_once 'conexion.php';
class guardar{
    public static function guardar(){
        $con = new conexion();
        $conexion = $con->conectar();
        $cedula = $_POST['id'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $telefono = $_POST['telefono'];
        $direccion = $_POST['direccion'];
        
        $sql = "INSERT INTO estudiantes (id, nombre, apellido, direccion, telefono) VALUES ('$cedula', '$nombre', '$apellido', '$direccion', '$telefono')";
        
        $resultado = $conexion->prepare($sql);
        $resultado->execute();
        if (!$resultado) {
            return 'Error al guardar el estudiante';
        }
        return 'Estudiante guardado con exito';
    }
}


