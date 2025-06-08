import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cards from "@/components/Cards";
import Profile from "@/components/Profile";
import { getCards } from "@/actions/cardActions";


export default async function Home() {
  const res = await getCards();
  const cards = res.serializedCards;
  return (
    <>
      <Header />
      <Profile />
      <Cards cards={cards} />
      <Footer />
    </>
  );
}
