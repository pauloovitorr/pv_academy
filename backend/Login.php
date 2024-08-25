<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  
    $json = file_get_contents('php://input');
    

    $dados = json_decode($json, true);

    $email = $dados['emaill'] ?? '';
    $senha = $dados['senhaa'] ?? '';


    $email_correto = 'paulo@gmail.com';
    $senha_correta = '123';

    if (!empty($email) && !empty($senha)) {
       
        if($email == $email_correto && $senha == $senha_correta){
            echo json_encode([
                'status' => 'success',
                'message' => 'Login efetuado com sucesso',
                'email' => $email,
                'senha' => $senha
            ]);
        } else{

            echo json_encode([
                'status' => 'error',
                'message' => 'Email ou senha inválidos'
            ]);
        }

    }
}

?>
