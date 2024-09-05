<?php

if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['uid'])){
    
    $token = $_COOKIE['token'] ?? null;

    $uid = $_POST['uid'];


    echo eliminarUsuario($uid, 'AIzaSyDEx11phpYJhl6QQqh4YsaQ4_d7K14PgII',$idCookie);
    
}
else{
    echo 'Error: Datos insuficientes';
}




function eliminarUsuario($uid, $apiKey, $cookieValue) {
    // URL de la API de Firebase Authentication
    $url = "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=$apiKey";

    // Datos de la solicitud
    $data = [
        'localId' => $uid
    ];

    // Inicializar cURL
    $ch = curl_init($url);

    // Configurar opciones de cURL
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Cookie: token=' . $cookieValue, // Incluir la cookie en la solicitud
      
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    // Ejecutar la solicitud
    $response = curl_exec($ch);

    // Verificar si hubo algún error
    if ($response === false) {
        return 'Error al realizar la solicitud: ' . curl_error($ch);
    } else {
        // Decodificar la respuesta JSON
        $responseData = json_decode($response, true);

        // Verificar si la solicitud fue exitosa
        if (isset($responseData['kind']) && $responseData['kind'] === 'identitytoolkit#DeleteAccountResponse') {
            return 'El usuario ha sido eliminado correctamente.';
        } else {
            // Si la solicitud no fue exitosa, retornar el mensaje de error
            return 'Error al eliminar el usuario: ' . $responseData['error']['message'];
        }
    }

    // Cerrar la conexión cURL
    curl_close($ch);
}

?>