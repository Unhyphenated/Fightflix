import { useCallback, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsChevronDown } from "react-icons/bs";
import { CiBellOn, CiSearch } from "react-icons/ci";
import AccountMenu from "./AccoutMenu";


const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);


    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, [])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, [])
    
    return (
        <nav className="w-full fixed z-40">
            <div className="
                px-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                transition
                duration-500
                bg-zinc-900
                bg-opacity-90
            ">
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo"></img>
                <div 
                className="
                    flex-row
                    ml-8
                    gap-7
                    hidden
                    lg:flex
                    "
                >
                    <NavbarItem label="Home"/>
                    <NavbarItem label="New & Popular"/>
                    <NavbarItem label="Lightweight"/>
                    <NavbarItem label="Bantamweight"/>
                    <NavbarItem label="Featherweight"/>
                    <NavbarItem label="Welterweight"/>

                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className="text-white transition"/>
                    <MobileMenu visible={showMobileMenu}/>
                    </div>
                    <div className="flex flex-row ml-auto gap-7 items-center">
                        <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                            <CiSearch/>
                        </div>
                        <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                            <CiBellOn/>
                        </div>
                        <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                                <img src="/images/c_oliveira.png" alt="profile"></img>
                            </div>
                            <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>
                            <AccountMenu visible={showAccountMenu}/>
                        </div>
                    </div>
                </div>
        </nav>
    )
}

export default Navbar;