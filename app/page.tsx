import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cards from "@/components/Cards";
import Profile from "@/components/Profile";
import { getCards } from "@/actions/cardActions";
import {  getUserfromSession } from "@/actions/userActions"


export default async function Home() {
  const res = await getCards();
  const cards = res.serializedCards;
  const { user } = await getUserfromSession();
  return (
    <>
      <Header user={user}/>
      <Profile />
      <Cards user={user} cards={cards} />
      <Footer />
    </>
  );
}
