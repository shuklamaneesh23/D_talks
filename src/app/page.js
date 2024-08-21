import Navbar from "@/components/UI/navbar.jsx";
import StepsCard from "@/components/HomePage/StepsCard";
import HeroSection from "@/components/HomePage/HeroSection";
import QuestionsList from "./talks/questions/page";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      
      <StepsCard 
      
      image='https://plus.unsplash.com/premium_photo-1723849222657-e1e48a0a306e?q=80&w=2921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
      heading="Doubt Talk: Where Questions Meet Answers and Expertise." 
      desc="Discover a platform designed for solving your doubts with ease. Get immediate answers from a community of experts, leverage AI-driven assistance, and engage in one-on-one chats for personalized support." 
      button="Register Now!" 
      css="flex-row" 
      bcolor="black" 
      route="/register" />
<HeroSection />
<QuestionsList />
    </div>
  );
}
