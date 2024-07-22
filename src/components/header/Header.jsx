import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "My Posts", slug: "/my-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex items-center justify-between'>
          <Link to="/" className='flex items-center'>
            <Logo width='70px'/>
          </Link>
          
          {/* Company Name */}
          <span className='flex-1 text-center lg:text-4xl font-bold text-gray-900 text-opacity-85 ' >
            BLOGGG
          </span>

          {/* Hamburger Icon */}
          <div className='md:hidden'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='p-2'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <ul className={`md:flex ml-auto ${isMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row`}>
            {navItems.map((item) => item.active && (
              <li key={item.name}>
                <button onClick={() => navigate(item.slug)} className='block px-6 py-2 rounded-full hover:bg-blue-100 transition-colors'>
                  {item.name}
                </button>
              </li>
            ))}

            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
