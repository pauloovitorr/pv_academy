import "../style_componentes/Login.css";
import "nprogress/nprogress.css"; 
import NProgress from "nprogress";
import React, { useEffect, useState } from "react";

export default function Login() {

  const [Email, setEmail] = useState('')
  const [Senha, setSenha] = useState('')


  useEffect(() => {
    
    NProgress.configure({ parent: '.container_login' });
 
    const inputs = document.querySelectorAll('.componente_form input');
    inputs.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    
    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
    };

  }, []);

  const handleFocus = (event) => {
    event.target.parentElement.classList.add('focused');
  };

  const handleBlur = (event) => {
    event.target.parentElement.classList.remove('focused');
  };





  const PostLogin = async (e, email, senha) => {
    e.preventDefault(); 
  
    NProgress.start();
  
    let dados = {
      emaill: email,
      senhaa: senha
    };
  
    try {
   
      const resposta = await fetch('http://localhost/pv_academy/backend/Login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados) 
      });
  
      
      if (resposta.ok) {
        const res = await resposta.json();
       
      } else {
        console.error('Erro na requisição:', resposta.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error); 
    } finally {
      NProgress.done(); 
    }
  };



  return (
    <div className="container_login">
      <div className="pai_img">
        <div>
          <h2>Bem-vindo de Volta!</h2>
          <span>Acesse sua conta agora mesmo.</span>
        </div>
        <img src="/login.jpg" alt="Imagem de login" />
      </div>

      <div className="form_login">
        <div className="texo_login">
          <h1>LOGIN</h1>
          <span>Preencha os campos abaixo</span>
        </div>

        <div className="formulario_login">

          <form action="" onSubmit={(e)=> { PostLogin(e,Email, Senha) }}>
            <div className="componente_form">
              <div>
                <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
              </div>
              <input type="email" id="email" placeholder="E-mail" required autoComplete="off" onChange={(e)=> { setEmail(e.target.value) }} />
            </div>

            <div className="componente_form">
              <div>
                <label htmlFor="senha"> <i className="fa-solid fa-key"></i></label>
              </div>
              <input type="password" id="senha" placeholder="Senha" required autoComplete="off" onChange={(e)=> { setSenha(e.target.value) }} />
            </div>

            <div className="componente_form">
              <a href="">Não tem conta? Cadastre-se agora mesmo!</a>
            </div>

            <div className="componente_form">
              <button type="submit">ENTRAR</button>
            </div>

          </form>
          
        </div>
      </div>
    </div>
  );
}
