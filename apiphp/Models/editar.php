<?php
include_once 'conexion.php';
class editar{
    public static function editar($data){
        $con = new conexion();
        $conexion = $con->conectar();
        $cedula = $_GET['id'];
        
        $nombre = $data['nombre'];
        $apellido = $data['apellido'];
        $telefono = $data['telefono'];
        $direccion = $data['direccion'];
        
        $sql = "UPDATE estudiantes set nombre = '$nombre', apellido = '$apellido', direccion = '$direccion', telefono ='$telefono' where id = '$cedula'";
        
        $resultado = $conexion->prepare($sql);
        $resultado->execute();
        if (!$resultado) {
            return 'Error al guardar el estudiante';
        }
        return'Estudiante editado con exito' ;
    }
}