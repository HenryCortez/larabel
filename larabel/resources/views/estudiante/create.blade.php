@extends('estudiante/template')
@section('title', 'Crear Estudiante')
@section('content')

<form action="{{ url('/estudiantes')}}" method="post">
@csrf
<div>
            <label for="cedula">ID:</label><br>
            <input type="text" id="id" name="id"><br>
</div>
    <div>
            <label for="nombre">Nombre:</label><br>
            <input type="text" id="nombre" name="nombre"><br>
    </div>
            <div>
            <label for="apellido">Apellido:</label><br>
            <input type="text" id="apellido" name="apellido"><br>
            </div>
            <div>
            <label for="direccion">Direccion:</label><br>
            <input type="text" id="direccion" name="direccion"><br>
            </div>
            <div>
            <label for="telefono">Telefono:</label><br>
            <input type="text" id="telefono" name="telefono"><br>
            </div>
            
            
           
            <input type="submit" value="Crear Estudiante">
</form>