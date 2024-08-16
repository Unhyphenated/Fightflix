import { useCallback, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsChevronDown } from "react-icons/bs";


const Navbar = () => {
    const [showMobileMenu, setShowMobileMneu] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMneu((current) => !current);
    }, [])
    
    return (
        <div className="w-full fixed z-40">
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
            </div>
        </div>

    )
}

export default Navbar;