import React, { useState } from "react";
// import { Container, Logo, LogoutBtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/title.png";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import LogoImg from "../../assets/logo.jpg";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  const user = {
    name: "Atharv Gupta",
    email: "workinatharv@gmail.com",
  };

  const navigation = [
    { name: "Home", slug: "/", active: true, current: false},
    { name: "Login", slug: "/login", active: !authStatus, current: false },
    { name: "Signup", slug: "/signup", active: !authStatus, current: false },
    { name: "My Posts", slug: "/my-posts", active: authStatus, current: false },
    { name: "Add Post", slug: "/add-post", active: authStatus, current: false },
  ];

  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: location.pathname === item.slug
  }));


  const handleNavigation = (slug) => {
    navigate(slug);
  };

  const handleAboutMe = () => {
    window.location.href =
      "https://www.linkedin.com/in/atharv-gupta-0885b1230/";
  };

  return (
    <>
      <div>
        <Disclosure as="nav" className="bg-gray-500 border-b md:border-b-2 border-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img alt="Your Company" src={Image} className="h-6 w-100" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {updatedNavigation.map(
                      (item) =>
                        item.active && (
                          <button
                            key={item.name}
                            onClick={() => handleNavigation(item.slug)}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white text-xl"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white text-xl",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </button>
                        )
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src={LogoImg}
                          className="h-10 w-11 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <MenuItem key="aboutme">
                        <button
                          onClick={handleAboutMe}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          About Me
                        </button>
                      </MenuItem>

                    {authStatus&&  <MenuItem key="logout">
                        <button
                          onClick={logoutHandler}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          Logout
                        </button>
                      </MenuItem> }
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {updatedNavigation.map(
                (item) =>
                  item.active && (
                    <DisclosureButton
                      key={item.name}
                      as="button"
                      onClick={() => handleNavigation(item.slug)}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                    >
                      {item.name}
                    </DisclosureButton>
                  )
              )}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    alt=""
                    src={LogoImg}
                    className="h-10 w-11 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="flex justify-start text-base font-medium leading-none text-white">
                    {user.name}
                  </div>
                  <div className=" text-sm font-medium leading-none text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <DisclosureButton
                  key="aboutme"
                  as="button"
                  onClick={handleAboutMe}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  About Me
                </DisclosureButton>

              {authStatus&&  <DisclosureButton
                  key="Logout"
                  as="button"
                  onClick={logoutHandler}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Logout
                </DisclosureButton>  }
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </>
  );
}

export default Header;
