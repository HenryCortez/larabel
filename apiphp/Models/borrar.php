<?php

include_once 'conexion.php';
class borrar{
    public static function borrar()
{
    $con = new conexion();
    $conexion = $con->conectar();
    $id= $_GET['id'];
    $borrarSql = "DELETE FROM estudiantes WHERE id = '$id'";
    
    $borrar = $conexion->prepare($borrarSql);
    
    $borrar->execute();
    if (!$borrar) {
        return 'Error al borrar el estudiante';
    }
    return 'Estudiante borrado con exito';
}
}

