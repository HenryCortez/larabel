$(document).ready(function () {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
    // Select/Deselect checkboxes
    var checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function () {
        if (this.checked) {
            checkbox.each(function () {
                this.checked = true;
            });
        } else {
            checkbox.each(function () {
                this.checked = false;
            });
        }
    });
    checkbox.click(function () {
        if (!this.checked) {
            $("#selectAll").prop("checked", false);
        }
    });
});

$(document).ready(function () {
    // Función para cargar los datos desde la base de datos

    $('#addEmployeeBtn').on('click', function () {
        // Obtener los datos del formulario
        var formData = $('#addEmployeeForm').serialize();

        // Realizar la solicitud Ajax
        $.ajax({
            type: 'POST',
            url: '../controllers/apiRest.php',
            data: formData,
            success: function (response) {
                // Cerrar el modal
                $('#addEmployeeModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();

                // Limpiar el formulario
                $('#addEmployeeForm')[0].reset();


                // Recargar los datos de la tabla
                loadEmployeeData();
            },
            error: function (error) {
                console.error('Error al guardar: ' + error.responseText);
            }
        });
    });

    $('table').on('click', '.edit', function () {
        // Obtener los datos de la fila
        var row = $(this).closest('tr');
        var ced = row.find('td:eq(0)').text();
        var nom = row.find('td:eq(1)').text();
        var ape = row.find('td:eq(2)').text();
        var dir = row.find('td:eq(3)').text();
        var tel = row.find('td:eq(4)').text();

        // Llenar el formulario de edición con los datos del estudiante
        $('#editEmployeeForm input[name="id"]').val(ced);
        $('#editEmployeeForm input[name="nombre"]').val(nom);
        $('#editEmployeeForm input[name="apellido"]').val(ape);
        $('#editEmployeeForm textarea[name="direccion]').val(dir);
        $('#editEmployeeForm input[name="telefono"]').val(tel);
    });
    
    $('#editEmployeeBtn').on('click', function () {
        // Obtener los datos del formulario
        var formDataArray = $('#editEmployeeForm').serializeArray();

        // Convertir el array de objetos en un objeto JavaScript
        var formData = {};
        formDataArray.forEach(function (item) {
            formData[item.name] = item.value;
        });

        console.log(formData);
        // Realizar la solicitud Ajax
        $.ajax({
            type: 'PUT',
            url: '../controllers/apiRest.php/?id=' + formData.id,
            data: JSON.stringify(formData),
            success: function (response) {
                // Cerrar el modal
                $('#editEmployeeModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();

                // Limpiar el formulario
                $('#editEmployeeForm')[0].reset();

                // Recargar los datos de la tabla
                loadEmployeeData();
            },
            error: function (error) {
                console.error('Error al editar: ' + error.responseText);
            }
        });
    });



    $('table').on('click', '.delete', function () {
        // Obtener la cédula del estudiante
        var row = $(this).closest('tr');
        var ced = row.find('td:eq(0)').text();

        // Llenar el formulario de eliminación con la cédula del estudiante
        $('#deleteEmployeeForm input[name="id"]').val(ced);
    });
    // Manejar el evento de clic en el botón "Eliminar" del formulario de eliminación
    $('#deleteEmployeeBtn').on('click', function () {
        // Obtener los datos del formulario
        var formDataArray = $('#deleteEmployeeForm').serializeArray();

        // Convertir el array de objetos en un objeto JavaScript
        var formData = {};
        formDataArray.forEach(function (item) {
            formData[item.name] = item.value;
        });

        console.log(formData);

        // Realizar la solicitud Ajax
        $.ajax({
            type: 'DELETE',
            url: '../controllers/apiRest.php/?id=' + formData.id,
            success: function (response) {
                // Cerrar el modal
                $('#deleteEmployeeModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();

                // Limpiar el formulario
                $('#deleteEmployeeForm')[0].reset();

                // Recargar los datos de la tabla
                loadEmployeeData();
            },
            error: function (error) {
                console.error('Error al eliminar: ' + error.responseText);
            }
        });
    });



    function loadEmployeeData() {
        $.ajax({
            url: '../controllers/apiRest.php', // Ruta al script que obtiene los datos desde la base de datos
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data && data.length > 0) {
                    var tableBody = $('#employeeTableBody');
                    tableBody.empty();

                    // Iterar sobre los datos y agregar filas a la tabla
                    $.each(data, function (index, employee) {
                        var row = '<tr>' +
                            '<td>' + employee.id + '</td>' +
                            '<td>' + employee.nombre + '</td>' +
                            '<td>' + employee.apellido + '</td>' +
                            '<td>' + employee.direccion + '</td>' +
                            '<td>' + employee.telefono + '</td>' +
                            '<td>' +
                            '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i><span></span></a>' +
                            '<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i><span></span></a>' +

                            '</td>' +
                            '</tr>';
                        tableBody.append(row);
                    });
                }
            },
            error: function (error) {
                console.error('Error al cargar los datos: ' + error.responseText);
            }
        });
    }

    // Llamada inicial para cargar los datos
    loadEmployeeData();

    // Resto de las funciones y llamadas a funciones jQuery modificadas aquí
});


/*
    $('#guardar').submit(function(event) {
        event.preventDefault();
        var formData = $(this).serialize();

        $.post('../controllers/apiRest.php', formData, function(data) {
            console.log(data);
            obtenerDatos();
        });

        $(this).hide();
    });

    $('#editar').submit(function(event) {
        event.preventDefault();
        var formData = $(this).serialize();

        $.ajax({
            url: '../controllers/apiRest.php?id=' + $('#editar input[name="id"]').val(),
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(data) {
                console.log(data);
                obtenerDatos();
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });

        $(this).hide();
    });

    $('#eliminar').submit(function(event) {
        event.preventDefault();

        $.ajax({
            url: '../controllers/apiRest.php?id=' + $('#eliminar input[name="id"]').val(),
            type: 'DELETE',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                obtenerDatos();
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });

        $(this).hide();
    });*/