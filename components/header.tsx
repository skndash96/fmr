"use client";
import { FaDoorOpen } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import { ProfileContext } from "../lib/profileContext";
import Link from "next/link";

export default function Header() {
    let profile = useContext(ProfileContext);
    
    return (
        <header className="px-2 py-1 flex items-center justify-between">
            <Link href="/">
                <h1 className="flex items-center gap-2">
                    <FaDoorOpen className="fill-fuchsia-900" size={24} />
                    <span className="hidden sm:flex flex-col">
                        <span className="text-sm">Find My</span>
                        <span className="-mt-2 text-xl">Roomie</span>
                    </span>
                </h1>
            </Link>

            <nav className="flex gap-2">
                <Link className="btn btn-sm btn-ghost" href="/about">
                    About
                </Link>

                {
                    profile ? (
                        <div className="flex flex-row gap-2">
                            <Link className="btn btn-sm btn-ghost" href="/profile">
                                Profile
                            </Link>
                            <Link className="btn btn-sm btn-ghost" href="/dashboard">
                                Dashboard
                            </Link>
                        </div>
                    ) : (
                        <Link className="btn btn-sm btn-primary" href="/register">
                            Register
                        </Link>
                    )
                }
            </nav>
        </header>
    );
}