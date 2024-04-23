<?php
include_once 'conexion.php';

class consulta{
    public static function consultar()
    {
        $con = new conexion();
        $conexion = $con->conectar();
        $consulta = "SELECT * FROM estudiantes";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        return $data;

    }
    public static function show($id)
    {
        $con = new conexion();
        $conexion = $con->conectar();
        $ced= $id;
        $consulta = "SELECT * FROM estudiantes where id = '$ced'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }
}


