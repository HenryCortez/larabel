@extends('estudiante/template')
@section('title', 'Editar Estudiante')
@section('content')
    <h1>Editar Estudiante</h1>
    <form action="{{url('estudiantes/'.$estudiante['id'])}}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="id">id</label>
            <input type="text" class="form-control" id="id" name="id" value="{{$estudiante['id']}}">
        </div>
        <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" id="nombre" name="nombre" value="{{$estudiante['nombre']}}">
        </div>
        <div class="form-group">
            <label for="apellido">Apellido</label>
            <input type="text" class="form-control" id="apellido" name="apellido" value="{{$estudiante['apellido']}}">
        </div>
        <div class="form-group">
            <label for="direccion">Direccion</label>
            <input type="text" class="form-control" id="direccion" name="direccion" value="{{$estudiante['direccion']}}">
        </div>
        <div class="form-group">
            <label for="telefono">Telefono</label>
            <input type="text" class="form-control" id="telefono" name="telefono" value="{{$estudiante['telefono']}}">
        </div>
        <button type="submit" class="btn btn-primary">Guardar cambios</button>
    </form>
@endsection