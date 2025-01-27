/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import logoHomeHobby from "../../assets/logo The Home Hobby.svg";
import { Link } from "react-router-dom";
import { validateRegistration } from "../../utils/validationRegister";

export const Register = () => {
  //* Direciones URL LocalHost y Produccion
  const isLocalhost = window.location.href.includes("localhost");
  const urlHome = isLocalhost
    ? "http://localhost:5173/"
    : "https://thehomehobby.com";

  const urlLogin = isLocalhost
    ? "http://localhost:5173/login"
    : "https://thehomehobby.com/login";

  const urlUserConfirm = isLocalhost
    ? "http://localhost:3001/users/confirm"
    : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  const urlUserRegister = isLocalhost
    ? "http://localhost:3001/users/register"
    : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  //* ---- HOOKs ---------
  const [errors, setErrors] = useState({});
  const [userRegister, setUserRegister] = useState({
    // token: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  // eslint-disable-next-line no-unused-vars
  // const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  //* -------- Validaciones de los Inputs en Form --------

  //* ----- HANDLEs ----------
  // Manejo los valores del formulario
  function handleInput(event) {
    const { name, value } = event.target;
    setUserRegister({
      ...userRegister,
      [name]: value,
    });
  }

  // Funcion para enviar el formulario
  async function handleSubmit(event) {
    event.preventDefault();

    const errorsObj = validateRegistration(userRegister);
    setErrors(errorsObj);

    if (Object.keys(errorsObj).length > 0) {
      console.log("Validation errors:", errorsObj);
      return;
    }

    try {
      const response = await axios.post(urlUserRegister, userRegister);
      console.log("Server response:", response.data);
      // Limpiar mensaje de error de registro al registrarse con éxito
      setRegistrationError("");
      setUserRegister({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });
      // Mostrar el modal de registro exitoso
      openModal();
    } catch (error) {
      console.error("Error sending request:", error);
      if (error.response.status === 420) {
        setRegistrationError("User already exists");
      } else {
        setRegistrationError("Error registering user");
      }
    }
  }

  console.log("DATOS DE USUARIO: ", userRegister);

  // ----- HANDLEs ----------

  return (
    <main
      className="main-wrapper bg-slate-100 flex items-center justify-center h-screen"
      id="app"
    >
      <div className="bg-white">
        <div className="">
          <div className="">
            {/* <div className="flex items-center justify-content-center"> */}
            <div className="">
              {/* <div className="md:w-8/12 xl:w-6/12 mx-auto"> */}
              <div className="card  lg:w-[800px] w-[300px]  flex-col justify-center shadow-lg">
                {/* Logo img */}
                <div className="transition-transform duration-300 hover:scale-105">
                  <Link to={urlHome}>
                    <div className="auth-side-wrapper flex justify-center justify-content-center p-4">
                      <img src={logoHomeHobby} alt="imagen home hobby" />
                    </div>
                  </Link>
                </div>
                {/* Titulo y form */}
                {/* <div className=""> */}
                <div className="px-3 py-5 ">
                  <Link
                    to={urlHome}
                    // href="https://thehomehobby.com"
                    className="noble-ui-logo block mb-2 transition-transform duration-300 hover:scale-105"
                  >
                    <h2 className="text-2xl font-bold text-center">
                      The <span className="text-red-700">Home Hobby </span>
                    </h2>
                  </Link>
                  {/* Formulario */}
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center "
                    // method="post"
                    // action="https://thehomehobby.com/register"
                  >
                    <input
                      type="hidden"
                      name="_token"
                      value="9H6SsrY2ZwuVG3vTc1LlMyioR9xl8XDh89IIuasX"
                      autoComplete="off"
                    />
                    {/* name */}
                    <div className="mb-3 ">
                      <label
                        htmlFor="userName"
                        className="form-label block transition-transform duration-500 hover:translate-x-2"
                      >
                        Name
                      </label>
                      <input
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                        type="text"
                        name="name"
                        id="userName"
                        placeholder="Name"
                        value={userRegister.name}
                        onChange={handleInput}
                        required=""
                        autoComplete="name"
                      />
                      {errors.name && (
                        <span className="flex w-[200px] lg:w-auto text-red-600  text-sm">
                          {errors.name}
                        </span>
                      )}
                    </div>
                    {/* Last name */}
                    <div className="mb-3">
                      <label
                        htmlFor="lastname"
                        className="form-label block transition-transform duration-500 hover:translate-x-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        onChange={handleInput}
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                        id="lastname"
                        placeholder="Last Name"
                        value={userRegister.lastName}
                        required=""
                        autoComplete="name"
                      />
                      {errors.lastName && (
                        <span className="flex w-[200px] lg:w-auto text-red-600  text-sm">
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                    {/* Phone */}
                    <div className="mb-3">
                      <label
                        htmlFor="phone"
                        className="form-label block transition-transform duration-500 hover:translate-x-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userRegister.phone}
                        onChange={handleInput}
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                        id="phone"
                        placeholder="Phone"
                        required=""
                        autoComplete="name"
                      />
                    </div>
                    {/* Email Addres */}
                    <div className="mb-3">
                      <label
                        htmlFor="userEmail"
                        className="form-label block transition-transform duration-500 hover:translate-x-2"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                        id="userEmail"
                        value={userRegister.email}
                        onChange={handleInput}
                        placeholder="Email"
                        // require=""
                        // autofocus=""
                      />
                      {errors.email && (
                        <span className="flex w-[200px] lg:w-auto text-red-600  text-sm">
                          {errors.email}
                        </span>
                      )}
                    </div>
                    {/* Password */}
                    <div className="mb-3">
                      <label
                        htmlFor="userPassword"
                        className="form-label block transition-transform duration-500 hover:translate-x-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={userRegister.password}
                        onChange={handleInput}
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                        id="userPassword"
                        placeholder="Password"
                        required=""
                      />
                      {errors.password && (
                        <span
                          className={`flex font-extralight w-[200px] lg:w-auto text-red-600 `}
                        >
                          {errors.password}
                        </span>
                      )}
                    </div>
                    {/* Password Confirm */}
                    <div className="mb-3 ">
                      <label
                        htmlFor="passwordConfirmation"
                        className="form-label block transition-transform duration-500 hover:translate-x-2"
                      >
                        Password Confirm
                      </label>
                      <input
                        type="password"
                        name="passwordConfirmation"
                        value={userRegister.passwordConfirmation}
                        onChange={handleInput}
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                        id="passwordConfirmation"
                        // autoComplete="current-password"
                        placeholder="Password"
                        required=""
                      />
                      {errors.passwordConfirmation && (
                        <span
                          className={`flex font-extralight w-[200px] lg:w-auto text-red-600`}
                        >
                          {errors.passwordConfirmation}
                        </span>
                      )}
                    </div>
                    {registrationError && (
                      <p className="text-red-600">{registrationError}</p>
                    )}
                    {showModal && (
                      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-md shadow-md">
                          <p className="text-center text-green-600 font-bold mb-4">
                            Registration Successful!
                          </p>
                          <p className="text-center mb-4">
                            Please check your email for the confirmation link.
                          </p>
                          <div className="flex justify-center">
                            <button
                              className="bg-red-600 text-white px-6 py-2 rounded-md mr-4"
                              onClick={closeModal}
                            >
                              Close
                            </button>
                            <Link
                              to={urlLogin}
                              className="bg-green-600 text-white px-6 py-2 rounded-md mr-4"
                            >
                              Go to Login
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Register */}
                    <button
                      type="submit"
                      className="text-center text-white px-6 mt-6 bg-red-600 py-1 rounded-sm cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg"
                    >
                      Register
                    </button>

                    {/* Codigo de Confirmacion */}

                    {/* I already have an account */}
                    <div className="text-center transition-transform duration-300 hover:scale-105 mt-3">
                      <Link
                        to={urlLogin}
                        className="text-dark hover:text-cyan-600 "
                      >
                        I already have an account
                      </Link>
                    </div>
                  </form>
                </div>
                {/* </div> */}
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};
