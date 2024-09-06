import { IoMdLock, IoMdMail } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import logoURL from "../assets/logo-white.svg";
import imgLogin from "../assets/images/img-login.png";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    try {
     
    } catch (error) {
      setError("Email ou senha incorretos.");
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className="md:w-2/5 bg-blue-regular flex-col justify-between md:h-full bg-cover bg-center relative p-20 hidden sm:block"
        style={{ backgroundImage: `url(${imgLogin})` }}
      >
        <div>
          <img src={logoURL} alt="V-Projects" className="w-60" />
        </div>
        <div className="relative z-10">
          <h3 className="lg:text-3xl sm:text-2xl font-semibold text-white mt-5 sm:w-auto lg:w-96">
            Faça compras e cadastre produtos
          </h3>
        </div>
      </div>
      <div className="md:w-3/5 bg-white flex justify-center flex-col gap-5 items-center p-6 flex-grow">
        <div className="flex flex-col w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-3/5 space-y-2">
          <h1 className="text-3xl font-semibold text-gray-800">Bem-vindo!</h1>
          <p className="text-gray-500 text-sm">
            Faça login na sua conta e aproveito o app
          </p>
        </div>
        <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-3/5  space-y-3">
          <div className="relative">
            <span className="absolute border-r-2 px-2 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoMdMail className="text-blue-regular w-5 h-5" />
            </span>
            <input
              type="text"
              className="h-12 rounded-lg bg-gray-light w-full pl-14"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <span className="absolute  border-r-2 px-2 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoMdLock className="text-blue-regular w-5 h-5" />
            </span>
            <input
              type="password"
              className="h-12 rounded-lg bg-gray-light w-full pl-14"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end items-center">
            <a href="#" className="text-blue-regular text-sm">
              Esqueceu a senha?
            </a>
          </div>
          {error && <div className="text-red">{error}</div>}
          {success && <div className="text-blue-regular">{success}</div>}
          <button
            className="bg-blue-regular text-white w-full h-10 rounded-lg"
            onClick={handleLogin}
          >
            Entrar
          </button>

          <div className="flex items-center gap-2">
            <p className="text-sm">Seu primeiro acesso na plataforma?</p>
            <Link to="/first-access" className="text-blue-regular text-sm">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
