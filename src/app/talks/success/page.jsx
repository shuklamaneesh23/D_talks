"use client";

import { useRef } from "react";
import { Confetti } from "@/components/magicui/confetti";

function ConfettiDemo() {
    const confettiRef = useRef(null);

    const handleMouseEnter = () => {
        Confetti({
            ...confettiRef.current, // Add any specific confetti options you need here
        });
    };

    return (
        <div className="relative flex h-screen  w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                Question Submitted Successfully!
            </span>

            <canvas
                ref={confettiRef}
                className="absolute left-0 top-0 z-0 w-full h-full"
                onMouseEnter={handleMouseEnter}
            />
        </div>
    );
}

export default ConfettiDemo;
