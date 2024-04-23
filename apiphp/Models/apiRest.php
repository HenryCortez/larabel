<?php
include 'borrar.php';
include 'select.php';
include 'editar.php';
include 'guardar.php';

$opc = $_SERVER['REQUEST_METHOD'];
switch ($opc) {
    case 'GET':
        echo json_encode(consulta::consultar());
        break;  
    case 'POST':
        echo json_encode(guardar::guardar());
        break;
    case 'DELETE':
        echo json_encode(borrar::borrar());
        break;
    case 'PUT':
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        echo json_encode(editar::editar($data));
        break;
    default:
        echo json_encode('Error');
        break;
}