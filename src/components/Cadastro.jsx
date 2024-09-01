import "../style_componentes/Cadastro.css";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import React, { useEffect, useState } from "react";

export default function CadastroCad() {

  const [Nome, setNome] = useState('');
  const [Email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');
  const [Confirma_Senha, setConfirma_Senha] = useState('');

  const [Notifica_nome, setNotifica_nome] = useState('');
  const [Notifica_email, setNotifica_email] = useState('');
  const [Notifica_senha, setNotifica_senha] = useState('');
  const [Notifica_confirma, setNotifica_confirma] = useState('');

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

  const PostCadastro = async (e,nome, email, senha, confirma_senha) => {
    e.preventDefault(); 

    setNotifica_nome('');
    setNotifica_email('');
    setNotifica_senha('');
    setNotifica_confirma('')
    
    NProgress.start();

    if (nome === '') {
      setNotifica_nome('Preencha o campo de nome!');
      bg_red('nome');
      NProgress.done(); 
      return;
    }

    if (email === '') {
      setNotifica_email('Preencha o campo de e-mail!');
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

    if (confirma_senha === '') {
      setNotifica_confirma('Preencha o campo de confirmação de senha');
      bg_red('confirma');
      NProgress.done(); 
      return;
    }

    if( !verifica_senha() ){
      setNotifica_confirma('A senha não confere!');
      bg_red('confirma');
      NProgress.done(); 
      return
    }


    let dados = {
      emaill: email,
      senhaa: senha
    };

    try {
      const resposta = await fetch('http://localhost/pv_academy/backend/Cadastro.php', {
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

    if (campo === 'nome') {
      document.querySelector('#nome').value = '';
      document.querySelector('.componente_form_cad:nth-child(1)').style.border = '1px solid red';
      document.querySelector('form > div:nth-child(1) > div:nth-child(1) > label > i').style.color = 'red';
    }


    if (campo === 'email') {
      document.querySelector('#email').value = '';
      document.querySelector('.componente_form_cad:nth-child(2)').style.border = '1px solid red';
      document.querySelector('form > div:nth-child(2) > div:nth-child(1) > label > i').style.color = 'red';
    }

    if (campo === 'senha') {
      document.querySelector('#senha').value = '';
      document.querySelector('.componente_form_cad:nth-child(3)').style.border = '1px solid red';
      document.querySelector('form > div:nth-child(3) > div:nth-child(1) > label > i').style.color = 'red';
    }

    if (campo === 'confirma') {
      document.querySelector('#senha_confirmacao').value = '';
      document.querySelector('.componente_form_cad:nth-child(4)').style.border = '1px solid red';
      document.querySelector('form > div:nth-child(4) > div:nth-child(1) > label > i').style.color = 'red';
    }


  }

  const remover_bg = (e)=>{
    if(e.target.value !== '' && e.target.value.length > 3){
      e.target.parentElement.style = 'border:none'
      e.target.parentElement.querySelector('i').style.color = ' #bdbdbd'
      
      let id_elemento = e.target.parentElement.querySelector('input').getAttribute('id')
      
      switch (id_elemento){
        case 'nome':
          setNotifica_nome('')
          break
          case 'email':
          setNotifica_email('')
          break
          case 'senha':
          setNotifica_senha('')
          break
          case 'confirma_senha':
          setNotifica_confirma('')
          break
      }
      
    }  
  }

  const verifica_senha = ()=>{
    if(Senha === Confirma_Senha ){
      return true
    }
    else{
      return false
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
          <form action="" onSubmit={(e)=> { PostCadastro(e,Nome,Email, Senha, Confirma_Senha) }}>
            <div className="componente_form_cad">
              <div>
                <label htmlFor="nome"><i className="fa-solid fa-user"></i></label>
              </div>
              <input type="text" id="nome" minLength={4} placeholder="Nome" autoComplete="off" onChange={(e)=> { setNome(e.target.value) } } onBlur={(e) => { remover_bg(e) } } required/>

              <div className="notificacao_cad">
                <p> {Notifica_nome !== '' ? Notifica_nome: ''} </p>
              </div>
            </div>

            <div className="componente_form_cad">
              <div>
                <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
              </div>
              <input type="email" id="email" placeholder="E-mail" minLength={4} autoComplete="off" onChange={(e)=> { setEmail(e.target.value) }} onBlur={(e) => { remover_bg(e) } } required/>

              <div className="notificacao_cad">
                <p> {Notifica_email !== '' ? Notifica_email: ''} </p>
              </div>
            </div>
            
            <div className="componente_form_cad">
              <div>
                <label htmlFor="senha"> <i className="fa-solid fa-key"></i></label>
              </div>
              <input type="password" id="senha" placeholder="Senha" minLength={6} autoComplete="off" onChange={(e)=> { setSenha(e.target.value) }} onBlur={(e) => { remover_bg(e) } } required />
              <div className="notificacao_cad">
                <p> {Notifica_senha !== '' ? Notifica_senha: ''} </p>
              </div>
            </div>

            <div className="componente_form_cad">
              <div>
                <label htmlFor="senha_confirmacao"> <i className="fa-solid fa-key"></i></label>
              </div>
              <input type="password" id="senha_confirmacao" placeholder="Confirme a senha" minLength={6} autoComplete="off" onChange={(e)=> { setConfirma_Senha(e.target.value) }}  onBlur={(e) => { remover_bg(e) }} required/>
              <div className="notificacao_cad">
                <p> {Notifica_confirma !== '' ? Notifica_confirma: ''} </p>
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
