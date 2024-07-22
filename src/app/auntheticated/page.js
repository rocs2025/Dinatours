"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

export default function App() {
  const router = useRouter();
  const Menu = [ { name: 'Profile', path: '/' },
    { name: 'Favorites', path: '/' },
    { name: 'Log out', path: '/'}

];
    const handleNavigation = (path) => {
      router.push(path);
    };
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white text-black">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div className="">
          <a href="index.html">Logo</a>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <ul className="flex items-center gap-6 text-black">
            <a href=""><li className="relative after:bg-black after:absolute after:h-0.5 after:rounded-full after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">Home</li></a>
            <a href=""><li className="relative after:bg-black after:absolute after:h-0.5 after:rounded-full after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">About Us</li></a>
            <a href=""><li className="relative after:bg-black after:absolute after:h-0.5 after:rounded-full after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">Contact Us</li></a>
          </ul> 
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center shadow-lg p-2 rounded-full h-11 border-0">
            <input type="text" placeholder="Search" className="p-2 border-0 max-w-48 outline-none rounded-full"/>
          </div>
          <span className="w-[2px] h-8 bg-black rounded-md"></span>
          <div className="flex items-center bg-zinc-300 rounded-full p-2">
            <FontAwesomeIcon icon={faUserCircle} className="text-2xl cursor-pointer" onClick={() => setOpen(!open)} />
          </div>
          {
            open && (
              <div className="bg-white p-4 w-40 shadow-lg rounded-lg absolute top-12 right-0 z-10">
                <ul>
                  {
                    Menu.map((menu) => (
                      <li className="p-2 text-lg cursor-pointer rounded hover:bg-zinc-200" onClick={() => handleNavigation(menu.path)} key={menu.name}>{menu.name}</li>
                    ))
                  }
                </ul>
              </div>
            )
          }
        </div>
      </nav>
    </header>
  );
}
