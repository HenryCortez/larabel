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
}