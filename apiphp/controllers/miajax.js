    document.addEventListener('DOMContentLoaded', function () {

  const newbutton = document.getElementById('nuevo');
  newbutton.addEventListener('click', function () {
    const form1 = document.getElementById('guardar');
    if (form1.style.display === 'block') {
      form1.style.display = 'none';
    } else {
      form1.style.display = 'block';
    }
  });
  function obtenerDatos() {
    fetch('controllers/apiRest.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const table = document.getElementById('tbody');

        // Limpia la tabla
        table.innerHTML = '';

        // Crea una nueva fila para cada objeto en los datos
        data.forEach(item => {
          const row = document.createElement('tr');

          // Crea una nueva celda para cada propiedad en el objeto
          for (const key in item) {
            const cell = document.createElement('td');
            cell.textContent = item[key];
            row.appendChild(cell);
          }
          // Crea los botones de "update" y "delete"
          const updateButton = document.createElement('button');
          updateButton.textContent = 'Update';
          updateButton.addEventListener('click', function () {
            const form3 = document.getElementById('editar');
            if (form3.style.display === 'block') {
              form3.style.display = 'none';
            } else {
              form3.style.display = 'block';
              const inputs = form3.getElementsByTagName('input');
              for (let i = 0; i < inputs.length-1; i++) {
                inputs[i].value = item[inputs[i].name];
              }
            }
          });

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', function () {
            const form2 = document.getElementById('eliminar');
            if (form2.style.display === 'block') {
              form2.style.display = 'none';
            } else {
              form2.style.display = 'block';
              const inputs = form2.getElementsByTagName('input');
              for (let i = 0; i < inputs.length-1; i++) {
                inputs[i].value = item[inputs[i].name];
              }
            }

          });

          // Crea celdas para los botones y añade los botones a las celdas
          const updateCell = document.createElement('td');
          updateCell.appendChild(updateButton);
          row.appendChild(updateCell);

          const deleteCell = document.createElement('td');
          deleteCell.appendChild(deleteButton);
          row.appendChild(deleteCell);

          table.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }
  obtenerDatos();

  document.getElementById('guardar').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('controllers/apiRest.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        obtenerDatos();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    event.target.style.display = 'none';
  });

  document.getElementById('editar').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData2 = new FormData(this);

    // Convertir formData2 a un objeto JavaScript
    const formDataObject = Object.fromEntries(formData2);
    fetch('controllers/apiRest.php?id=' + formData2.get('id'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' // Usamos este tipo de contenido para enviar datos JSON
      },
      body: JSON.stringify(formDataObject)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        obtenerDatos();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    event.target.style.display = 'none';
  });

  document.getElementById('eliminar').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch('controllers/apiRest.php?id=' + formData.get('id'), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('No se elimino')
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        obtenerDatos();
      })
      .catch(error => {
        console.error('Error:', error);
      })
    event.target.style.display = 'none';
  })
});

