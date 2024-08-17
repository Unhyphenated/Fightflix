import Billboard from "@/components/Billboard";
import FightList from "@/components/FightList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFightsList from "@/hooks/useFightsList";
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
  console.log(fights);

  return (
    <>
      <Navbar/>
      <Billboard/>
      <div className="pb-40">
        <FightList title="Trending Now" data={fights}/>
      </div>
      
    </>
  );
}
