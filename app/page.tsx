// import Image from 'next/image'

// import ProductCard from "./components/Products/ProductCard";
import LoginForm from "./components/Auth/LoginForm";
import SocialAuth from "./components/Auth/SocialAuth";

export default function Home() {
  return (
    // <main className="min-h-screen grid md:grid-cols-2 lg:grid-cols-2 gap-4">
    <main className="flex">
      <div className="w-1/2 h-screen align-items-center justify-items-center pt-5">
        <LoginForm />
        <SocialAuth/>

      </div>
      <div className="w-1/2 h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/assets/img/farmland.png")' }}>
        <p className="text-3xl"> Farm Product Tracking Using Blockchain</p>
      </div>
    </main>
  )
}
