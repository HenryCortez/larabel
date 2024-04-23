@extends('estudiante/template')
@section('title', 'Mostrar Estudiante')
@section('content')
<h1 class="mb-4">Mostrar Estudiante</h1>
    <table class="table table-striped">
        <thead class="thead-dark">
        <tr>
            <th scope="col">Cedula</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Direccion</th>
            <th scope="col">Telefono</th>
        </tr>
        </thead>
        <tbody>
            @foreach ($estudiantesArray as $estudiante)
                <tr>
                    <td>{{$estudiante['id']}}</td>
                    <td>{{$estudiante['nombre']}}</td>
                    <td>{{$estudiante['apellido']}}</td>
                    <td>{{$estudiante['direccion']}}</td>
                    <td>{{$estudiante['telefono']}}</td>
                 
                    <td><a href="{{ url('/estudiantes/' . $estudiante['id']) . '/edit' }}" class="btn btn-primary">Editar</a></td>
                  
                    <td>
                <form action="{{ url('/estudiantes/'.$estudiante['id']) }}" method="post">
                    @method('DELETE')
                    @csrf
                    <button type="submit" class="btn btn-danger">Eliminar</button>
                    </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
<a href="{{ url('/estudiantes/create') }}" class="btn btn-success">Nuevo</a>
@endsection