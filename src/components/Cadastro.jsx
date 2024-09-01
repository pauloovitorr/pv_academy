import "../style_componentes/Cadastro.css";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import React, { useEffect, useState } from "react";

export default function CadastroCad() {

  const [Email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');

  const [Notifica_email, setotifica_email] = useState('');
  const [Notifica_senha, setNotifica_senha] = useState('');

  useEffect(() => {
    NProgress.configure({ parent: '.container_login_cad' });

    const inputs = document.querySelectorAll('.componente_form_cad input');
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

    setotifica_email('');
    setNotifica_senha('');

    NProgress.start();

    if (email === '') {
      setotifica_email('Preencha o campo de e-mail!');
      bg_red('email');
      NProgress.done(); 
      return;
    }

    if (senha === '') {
      setNotifica_senha('Preencha o campo da senha');
      bg_red('senha');
      NProgress.done(); 
      return;
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

        if (res.status === 'error') {
          setNotifica_senha(res.message);
          bg_red('senha');
          bg_red('email');
        } else {
          alert('login');
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

  const bg_red = (campo) => {
    if (campo === 'email') {
      document.querySelector('.componente_form_cad input[type="email"]').value = '';
      document.querySelector('.componente_form_cad:nth-child(1)').style.border = '1px solid red';
      document.querySelector('#root > div > div > div.form_login_cad > div.formulario_login_cad > form > div:nth-child(1) > div:nth-child(1) > label > i').style.color = 'red';
    }

    if (campo === 'senha') {
      document.querySelector('.componente_form_cad input[type="password"]').value = '';
      document.querySelector('.componente_form_cad:nth-child(2)').style.border = '1px solid red';
      document.querySelector('#root > div > div > div.form_login_cad > div.formulario_login_cad > form > div:nth-child(2) > div:nth-child(1) > label > i').style.color = 'red';
    }
  }

  return (
    <div className="container_login_cad">
      <div className="pai_img_cad">
        <div>
          <h2>Cadastre-se agora mesmo!</h2>
          <span>Faça parte da nossa comunidade.</span>
        </div>
        <img src="/cad.jpg" alt="Imagem de login" loading="lazy" />
      </div>

      <div className="form_login_cad">
        <div className="texto_login_cad">
          <h1>Faça seu cadastro</h1>
          <span>Preencha os campos abaixo</span>
        </div>

        <div className="formulario_login_cad">
          <form action="" onSubmit={(e)=> { PostLogin(e,Email, Senha) }}>
            <div className="componente_form_cad">
              <div>
                <label htmlFor="nome"><i className="fa-solid fa-user"></i></label>
              </div>
              <input type="text" id="nome" placeholder="Nome" required autoComplete="off"/>

              <div className="notificacao_cad">
                <p> {Notifica_email !== '' ? Notifica_email: ''} </p>
              </div>
            </div>

            <div className="componente_form_cad">
              <div>
                <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
              </div>
              <input type="email" id="email" placeholder="E-mail" required autoComplete="off" onChange={(e)=> { setEmail(e.target.value) }} />

              <div className="notificacao_cad">
                <p> {Notifica_email !== '' ? Notifica_email: ''} </p>
              </div>
            </div>
            
            <div className="componente_form_cad">
              <div>
                <label htmlFor="senha"> <i className="fa-solid fa-key"></i></label>
              </div>
              <input type="password" id="senha" placeholder="Senha" required autoComplete="off" onChange={(e)=> { setSenha(e.target.value) }} />
              <div className="notificacao_cad">
                <p> {Notifica_senha !== '' ? Notifica_senha: ''} </p>
              </div>
            </div>

            <div className="componente_form_cad">
              <div>
                <label htmlFor="senha_confirmacao"> <i className="fa-solid fa-key"></i></label>
              </div>
              <input type="password" id="senha_confirmacao" placeholder="Confirme a senha" required autoComplete="off" onChange={(e)=> { setSenha(e.target.value) }} />
              <div className="notificacao_cad">
                <p> {Notifica_senha !== '' ? Notifica_senha: ''} </p>
              </div>
            </div>

            <div className="componente_form_cad">
              <a href="/">Já possui conta? Faça login!</a>
            </div>

            <div className="componente_form_cad">
              <button type="submit">ENTRAR</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
