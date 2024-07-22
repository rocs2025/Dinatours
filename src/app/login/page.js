
// src/app/registration/page.js

'use client'; // Mantén esta línea si necesitas un Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [message, setMessage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para controlar la visibilidad de la contraseña
  const router = useRouter();

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
      const req = await fetch('http://localhost:1337/api/auth/local', reqOptions);
      const res = await req.json();

      if (res.error) {
        setMessage(res.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: res.error.message,
        });
        return;
      }
      if (res.jwt && res.user) {
        setMessage('You have successfully logged in');
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'You have successfully logged in',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          router.push('/auntheticated'); // Redirige a la página en otra carpeta
        });
      }
    } catch (error) {
      console.error('Error durante el registro:', error); 
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
    <div className="grid min-h-screen place-items-center">
      <form onSubmit={register} className='w-96 py-8 px-6 bg-white rounded-xl max-w-sm text-black'>
        <h1 className="block text-center font-bold mb-5">Log in</h1>
        <label htmlFor="identifier" className="block">Email</label>
        <input type="email" name="identifier" id="identifier" className="block border border-[#0A2913] py-3 px-4 rounded-lg outline-none focus:ring-1 mb-4 w-full" />

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
    </div>
  );
}
