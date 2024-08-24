"use client";

import { useRef, useEffect } from "react";
import { Confetti } from "@/components/magicui/confetti";

function ConfettiDemo() {
    const confettiRef = useRef(null);

    useEffect(() => {
        if (confettiRef.current) {
            Confetti({
                ...confettiRef.current, 
            });
        }

        const timer = setTimeout(() => {
            window.location.href = "/";
        }, 5000);

        // Clean up the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                Question Submitted Successfully!
            </span>

            <canvas
                ref={confettiRef}
                className="absolute left-0 top-0 z-0 w-full h-full"
            />
        </div>
    );
}

export default ConfettiDemo;
