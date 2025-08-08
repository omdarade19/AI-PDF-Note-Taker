"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {

  const {user} = useUser();
  const createUser= useMutation(api.user.createUser);

  useEffect(()=>{
    user&&Checkuser();
  }, [user])

  const Checkuser=async()=>{
    const result=await createUser({
      email:user?.primaryEmailAddress?.emailAddress,
      imgUrl:user?.imgUrl,
      userName:user?.userName

    });
  }

  return (
   <div className="bg-gradient-to-r from-gray-100 to-blue-50 text-gray-900 min-h-screen flex flex-col">
      
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-purple-900 text-white p-2 rounded-lg font-bold text-sm">
            Logo
          </div>
          <span className="font-bold text-lg">Logoipsum</span>
        </div>

        {/* Menu */}
        {/* <nav className="hidden md:flex gap-8 text-gray-600 font-medium">
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#solution" className="hover:text-gray-900">Solution</a>
          <a href="#testimonials" className="hover:text-gray-900">Testimonials</a>
          <a href="#blog" className="hover:text-gray-900">Blog</a>
        </nav> */}

        {/* CTA */}
    <Link href={'/sign-in'}
          className="bg-black text-white px-5 py-2 rounded-full font-medium hover:opacity-90"
         >
            Get started
          </Link>
      </header>

      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto py-16 px-4 flex-grow flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Simplify <span className="text-red-500">PDF</span>{" "}
          <span className="text-blue-500">Note</span>-Taking with AI-Powered
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Elevate your note-taking experience with our AI-powered PDF app.
          Seamlessly extract key insights, summaries, and annotations from any
          PDF with just a few clicks.
        </p>
        <div className="mt-8 flex justify-center gap-4">
         <Link href={'/sign-in'}
          className="bg-black text-white px-5 py-2 rounded-full font-medium hover:opacity-90"
         >
            Get started
          </Link>
          <a
            href="#"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-300"
          >
            Learn more
          </a>
        </div>
     </div>

      {/* Features Section */}
      <section id="features" className="grid md:grid-cols-3 gap-8 px-8 pb-16 text-center">
        <div>
          <h3 className="font-bold text-lg">The lowest price</h3>
          {/* <p className="text-gray-600 mt-2">Some text here</p> */}
        </div>
        <div>
          <h3 className="font-bold text-lg">The fastest on the market</h3>
          {/* <p className="text-gray-600 mt-2">Some text here</p> */}
        </div>
        <div>
          <h3 className="font-bold text-lg">The most loved</h3>
          {/* <p className="text-gray-600 mt-2">Some text here</p> */}
        </div>
      </section>
    </div>
  );
}
