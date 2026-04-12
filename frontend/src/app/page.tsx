import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Logos from '@/components/logos';
import ChatBot from '@/components/chatbot';
// import EnrollmentForm from '@/app/enrollment/page';




export default function Page() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <Logos />
      {/* <EnrollmentForm /> */}
      <ChatBot/>
      
    </main>
  );
}