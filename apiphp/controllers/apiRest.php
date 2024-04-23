<?php
include '../models/borrar.php';
include '../models/consulta.php';
include '../models/guardar.php';
include '../models/update.php';

$opc = $_SERVER['REQUEST_METHOD'];
switch ($opc) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            echo json_encode(consulta::show($id));
        } else {
            echo json_encode(consulta::consultar());
        }
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