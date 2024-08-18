import Billboard from "@/components/Billboard";
import FightList from "@/components/FightList";
import InfoModal from "@/components/InfoModal";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useFightsList from "@/hooks/useFightsList";
import useInfoModal from "@/hooks/useInfoModal";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      }
    }
  }
  return { 
    props: {}
  }
}

export default function Home() {
  const { data: fights = []} = useFightsList();
  const { data: favorites = []} = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar/>
      <Billboard/>
      <div className="pb-40">
        <FightList title="Trending Now" data={fights}/>
        <FightList title="My List" data={favorites}/>

      </div>
      
    </>
  );
}
