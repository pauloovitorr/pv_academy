import "../style_componentes/Login.css";
import { useEffect } from "react";

export default function Login() {

  useEffect(() => {
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

          <form action="">

            <div className="componente_form">

              <div>
                <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>
            </div>  
              <input type="email" id="email" placeholder="E-mail" required autoComplete="off" />
              
            </div>

            <div className="componente_form">

            <div>
               <label htmlFor="senha"> <i className="fa-solid fa-key"></i></label>
            </div> 

              <input type="password" id="senha" placeholder="Senha" required autoComplete="off" />

            </div>

            <div className="componente_form">
                <a href="">Não tem conta? Cadastre-se agora mesmo!</a>
            </div>

            <div className="componente_form">
                <button type=""> ENTRAR </button>
            </div>


          </form>

        </div>
      </div>
    </div>
  );
}
