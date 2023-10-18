$(document).ready(function() {

    // Evento para cargar un archivo
    $('#submit-button').on('click', function () {
        var fileInput = $('#file-upload')[0].files[0];

        if (fileInput) {
            var formData = new FormData();
            formData.append('file', fileInput);

            $.ajax({
                url: 'http://elbback-1830897251.us-east-1.elb.amazonaws.com/upload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                }
            });
        } else {
            alert('Selecciona un archivo antes de cargarlo.');
        }
    });

    // Evento para actualizar la tabla de archivos
   $('#update-button').on('click', function () {
    $.ajax({
        url: 'http://elbback-1830897251.us-east-1.elb.amazonaws.com/list',
        type: 'GET',
        success: function (data) {
            // Limpiar la tabla antes de actualizar
            $('table tr:gt(0)').remove();

            // Iterar a través de la lista de archivos en 'files'
            data.files.forEach(function (item) {
                var row = '<tr>' +
                    '<td>' + item[1] + '</td>' +  // El segundo elemento es la descripción/nombre
                    '<td><a href="' + item[2] + '" download>Descargar</a></td>' +  // El tercer elemento es la URL
                    '</tr>';
                $('table').append(row);
            });
        }
    });
});

});
