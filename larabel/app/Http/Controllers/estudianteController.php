<?php

namespace App\Http\Controllers;
use Illuminate\Http\Client\PendingRequest;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class estudianteController extends Controller
{
    protected static $url = "http://localhost/Quinto/clase/controllers/apiRest.php";
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $estudiantes = Http::get(static::$url);
        $estudiantesArray = $estudiantes->json();
        return view('estudiante.mostrar', compact('estudiantesArray'));
    }

    /**
     * Show the form for creating a new resource.
     */
    //mostrar formulario
    public function create()
    {
        return view('estudiante.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    //guardar datos
    public function store(Request $request)
    {
        $response = Http::asForm()->post(static::$url, [
            'id' => $request->input('id'),
            'nombre' => $request->input('nombre'),
            'apellido' => $request->input('apellido'),
            'direccion' => $request->input('direccion'),
            'telefono' => $request->input('telefono'),
        ]);

        return redirect('/estudiantes');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $estudiante = Http::get(static::$url. "?id=".$id);
        $estudianteArray = $estudiante->json();
        return view('estudiante.show', compact('estudianteArray'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $response = Http::get(static::$url);
        $estudiantes = $response->json();
        $estudiante = collect($estudiantes)->firstWhere('id', $id);
        return view('estudiante.edit', compact('estudiante'));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = [
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'direccion' => $request->direccion,
            'telefono' => $request->telefono
        ];

        $response = Http::withHeaders([
            'Accept' => 'application/json',
        ])->put(static::$url.'?id='. $id, $data);

        if ($response->successful()) {
            return redirect('/estudiantes');
        } else {
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    //eliminar datos
    public function destroy(string $id)
    {
        $response = Http::delete(static::$url. "?id=".$id);
        return redirect('/estudiantes');

        
    }
}
