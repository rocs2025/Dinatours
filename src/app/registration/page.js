// src/app/registration/page.js

'use client'; // Mantén esta línea si necesitas un Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Registration() {
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const register = async (event) => {
    event.preventDefault();
    setMessage(null);
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);

    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    };

    try {
      const req = await fetch('http://localhost:1337/api/auth/local/register', reqOptions);
      const res = await req.json();

      if (res.error) {
        setMessage(res.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Registration Error',
          html: `${res.error.message} <br/> <a href="#" id="redirectToLogin" style="color: blue; text-decoration: underline;">Go to login</a>`,
          didOpen: () => {
            const link = document.getElementById('redirectToLogin');
            if (link) {
              link.addEventListener('click', (e) => {
                e.preventDefault();
                router.push('/login'); // Cambia '/login' por la ruta correcta a la página de inicio de sesión
                Swal.close();
              });
            }
          }
        });
        return;
      }
      if (res.jwt && res.user) {
        setMessage('Successful registration');
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered.',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          router.push('/auntheticated');
        });
      }
    } catch (error) {
      console.error('Error durante el registro:', error); // Maneja errores de fetch
      setMessage('Error durante el registro. Inténtalo de nuevo.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error durante el registro. Inténtalo de nuevo.',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form onSubmit={register} className='w-80 py-8 px-6 bg-white rounded-xl max-w-sm mt-7 text-black'>
      <h1 className="block text-center font-bold mb-5">Sign Up</h1>
      <label htmlFor="username" className="block">Username</label>
      <input type="text" id="username" name="username" className="border border-[#0A2913] py-3 px-4 rounded-lg outline-none focus:ring-1 mb-4 w-full" />

      <label htmlFor="email" className="block">Email</label>
      <input type="email" name="email" id="email" className="block border border-[#0A2913] py-3 px-4 rounded-lg outline-none focus:ring-1 mb-4 w-full" />

      <label htmlFor="password" className="block">Password</label>
      <div className="relative w-full">
        <input 
          type={passwordVisible ? "text" : "password"} 
          name="password" 
          id="password" 
          className="block border border-[#0A2913] py-3 px-4 rounded-lg outline-none focus:ring-1 mb-4 w-full" 
        />
        <button 
          type="button" 
          onClick={togglePasswordVisibility} 
          className="absolute inset-y-0 right-0 px-4 py-3 text-sm text-gray-700"
        >
          <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
        </button>
      </div>

      <button type="submit" className='text-center bg-[#0A2913] hover:bg-[#42594C] text-white w-[150px] py-2 rounded-lg font-semibold mt-2 mx-auto block'>Submit</button>
      <div>{message}</div>
    </form>
  );
}
