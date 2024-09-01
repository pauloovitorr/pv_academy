import "../style_componentes/Login.css";
import "nprogress/nprogress.css"; 
import NProgress from "nprogress";
import React, { useEffect, useState } from "react";

export default function Login() {

  const [Email, setEmail] = useState('')
  const [Senha, setSenha] = useState('')

  const [Notifica_email, setotifica_email] = useState('')
  const [Notifica_senha, setNotifica_senha] = useState('')


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

    setotifica_email('')
    setNotifica_senha('')
  
    NProgress.start();


    if(email === ''){
      setotifica_email('Prencha o campo de e-mail!')
      bg_red('email')

      NProgress.done(); 
      return
    }

    if(senha === ''){
      setNotifica_senha('Prencha o campo da senha')
      bg_red('senha')

      NProgress.done(); 
      return
    }


  
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
        
        if(res.status == 'error'){
          setNotifica_senha(res.message)
          bg_red('senha')
          bg_red('email')
        }else{
          alert('login')
        }

       
      } else {
        console.error('Erro na requisição:', resposta.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error); 
    } finally {
      NProgress.done(); 
    }
  };



  const bg_red = (campo)=>{

    

    if(campo == 'email'){
      document.querySelector('.componente_form input[type="email"]').value = ''
       document.querySelector('.componente_form:nth-child(1)').style.border = '1px solid red';
       document.querySelector('#root > div > div > div.form_login > div.formulario_login > form > div:nth-child(1) > div:nth-child(1) > label > i').style.color = 'red';
    }

    if(campo == 'senha'){
      document.querySelector('.componente_form input[type="password"]').value = ''
      document.querySelector('.componente_form:nth-child(2)').style.border = '1px solid red';
      document.querySelector('#root > div > div > div.form_login > div.formulario_login > form > div:nth-child(2) > div:nth-child(1) > label > i').style.color = 'red';
    }

  }


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

              <div className="notificacao">
                  <p> {Notifica_email !== '' ? Notifica_email: ''} </p>
              </div>


            </div>
            

            <div className="componente_form">
              <div>
                <label htmlFor="senha"> <i className="fa-solid fa-key"></i></label>
              </div>
              <input type="password" id="senha" placeholder="Senha" required autoComplete="off" onChange={(e)=> { setSenha(e.target.value) }} />
              <div className="notificacao">
              <p> {Notifica_senha !== '' ? Notifica_senha: ''} </p>
              </div>
            
            </div>

            <div className="componente_form">
              <a href="/cadastro">Esqueceu sua senha? Clique aqui</a>
              <a href="/cadastro">Não tem conta? Cadastre-se agora!</a>
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
