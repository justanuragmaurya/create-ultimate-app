"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from 'next/image';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npx create-ragey-app@latest');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="flex flex-col items-center justify-center space-y-8 text-center py-12 md:py-32">
            {/* Terminal-style code snippet */}
            <motion.div
              className="font-mono bg-black/90 text-green-500 p-2 rounded-md w-full max-w-sm overflow-x-auto flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-white">$</span>
                <code>npx create-ragey-app@latest</code>
              </div>
              <button
                onClick={handleCopy}
                className="hover:bg-white/10 p-1 rounded transition-colors"
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-white">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                  </svg>
                )}
              </button>
            </motion.div>
            {/* {code snippet till here} */}
            <motion.div 
              className="space-y-6 md:space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter px-4">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  The ultimate template
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  for your next project 👨🏻‍💻
                </motion.span>
              </h1>
              <motion.p 
                className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum dolorem, veritatis expedita facere voluptatibus esse fugit repellendus quae! Quos, dicta harum! Suscipit, magnam ipsa modi velit reprehenderit quo eum aut.
              </motion.p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link href="https://github.com/justanuragmaurya" target="__blank"><Button size="lg" className="w-full sm:w-auto">
                My Github
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </motion.svg>
              </Button></Link>
              <Link href={"https://x.com/anuragmaurya_x"} target="__blank"><Button size="lg" variant="outline" className="w-full sm:w-auto">
                Follow me on X
              </Button></Link>
            </motion.div>
            {/* Dashboard Preview */}
            <motion.div 
              className="w-full flex flex-col items-center mt-6 md:mt-10 px-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              <motion.div 
                className="relative w-full max-w-5xl overflow-hidden rounded-lg md:rounded-xl border bg-background shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute top-0 flex w-full items-center justify-between bg-gray-950/70 px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="">
                  <Image 
                    src="https://placehold.co/1920x1080/EEE/31343C" 
                    alt="Hero image"
                    width={1920}
                    height={1080}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
