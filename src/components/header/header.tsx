import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logoWhiteURL from "../../assets/logo-white.svg";
import logoURL from "../../assets/logo.svg";
import { NavbarItem } from "./navBarItem";
import { IoMdMenu, IoMdClose } from "react-icons/io"
import { FaHouse } from "react-icons/fa6"
import { MdSell } from "react-icons/md"
import { IoCart, IoLogOut } from "react-icons/io5";
import { ProfileModal } from "../profileModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, selectCurrentUser } from "../../redux/features/auth/authSlice";

// import { ProfileModal } from "../collaborators/ProfileModal";

export const Header = () => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const location = useLocation(); // Usando useLocation para obter a rota atual
  const currentPath = location.pathname;

  const handleAvatarClick = () => {
    setProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setProfileModalOpen(false);
  };

  const currentUser = useAppSelector(selectCurrentUser);

  const profileModalData = {
    nameCollaborator: currentUser.name,
    roleCollaborator: currentUser.role,
    emailCollaborator: currentUser.email,
    pictureCollaborator: currentUser.avatar,
  };

  const [showSideBar, setShowSideBar] = useState(false);

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(logOut())
    navigate('/')
  }

  const sidebarMenu = () => {
    return (
      <div className="sm:hidden fixed">
        <span className="absolute text-white text-4xl top-11 left-4 cursor-pointer" onClick={() => ''}>
          <IoMdMenu className='bg-blue-regular w-8 h-8 rounded-md' onClick={() => setShowSideBar(true)} />
        </span>
        <div className={`sidebar fixed top-0 bottom-0 lg:left-0 left-[-300px] duration-1000 p-2 w-[300px] overflow-y-auto text-center bg-blue-regular shadow h-screen ${showSideBar ? '!left-[0px]' : ''}`}>
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center justify-between rounded-md ">
              <h1 className="text-[15px]  ml-3 text-xl text-gray-200 font-bold"><img src={logoWhiteURL} alt="V-Projects" className="w-40" /></h1>
              <IoMdClose className='text-white w-4 h-4 rounded-md cursor-pointer' onClick={() => setShowSideBar(false)} />
            </div>
            <hr className="my-2 text-gray-600" />
            <div>
              <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-[rgba(255,255,255,0.2)]" onClick={() => { navigate('/home'); setShowSideBar(false); }}>
                <FaHouse className='text-white' />
                <span className="text-[15px] ml-4 text-gray-100">Home</span>
              </div>
              <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-[rgba(255,255,255,0.2)]"  onClick={() => { navigate('/product/add'); setShowSideBar(false); }}>
                <MdSell className='text-white' />
                <span className="text-[15px] ml-4 text-gray-100">Produtos</span>
              </div>


              <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-[rgba(255,255,255,0.2)]">
                <IoCart className='text-white' />
                <span className="text-[15px] ml-4 text-gray-100">Carrinho</span>
              </div>
              <div onClick={() => logout()} className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-[rgba(255,255,255,0.2)]">
                <IoLogOut className='text-white' />
                <span className="text-[15px] ml-4 text-gray-100">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const defaultHeader = () => (
    <div className="bg-white">
      <div className="w-full flex flex-col items-center">
        <div className="w-full my-5 max-w-7xl">
          <header className="px-10 flex items-center py-5 justify-center sm:justify-between w-full">
            <img src={logoURL} alt="V-Projects" className="w-40" />
            <nav className="hidden sm:block">
              <ul className="flex">
                <li>
                  <NavbarItem isSelected={currentPath === "/home"} href={'/home'}>
                    Home
                  </NavbarItem>
                </li>
                <li>
                  <NavbarItem isSelected={currentPath === "/product/add"} href="/product/add">
                    Adicionar Produtos
                  </NavbarItem>
                </li>
                <li>
                  <NavbarItem isSelected={currentPath === ""} href="#">
                    Carrinho
                  </NavbarItem>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-10 relative">
              <button className="rounded-full" onClick={handleAvatarClick}>
                <img
                  className="rounded-full"
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  width={48}
                />
              </button>
            </div>
          </header>
          {isProfileModalOpen && (
            <ProfileModal dataUser={profileModalData} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className=" min-h-[100vh] flex flex-col">
      {sidebarMenu()}
      {defaultHeader()}
      <Outlet />
    </div>
  );
};

