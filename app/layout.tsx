"use client";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import useProfile from "../lib/profileHook";
import { ProfileContext } from "../lib/profileContext";
import { useEffect } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let profile = useProfile();
    
    useEffect(() => {
        console.log("Profile changed", profile?.name);
    }, [profile]);

    return (
        <html lang="en" data-theme="fantasy">
            <head>
                <title> FindMyRoomie </title>
                <meta name="description" content="FindMyRoomie connects people who are seeking roommate, across your batch. Browse through profiles, listing interests to living habits. Find your match, connect effortlessly through our platform and get going now! Happy First Year!" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
            </head>

            <body>
                <div id="wrapper" className="flex flex-col min-h-[100dvh]">
                    <ProfileContext.Provider value={profile}>
                        <Header />
                        {children}
                        <Footer />
                    </ProfileContext.Provider>
                </div>
            </body>
        </html>
    );
}
