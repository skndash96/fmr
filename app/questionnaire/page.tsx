"use client";
import { useContext, useEffect } from "react";
import Questionnaire from "../../components/questionnaire";
import { redirect } from "next/navigation";
import { ProfileContext } from "../../lib/profileContext";

export default function QuestionnairePage() {
    let profile = useContext(ProfileContext);

    useEffect(() => {        
        if (profile === null) redirect("/");
    }, [profile]);

    return (
        <main className="w-full max-w-2xl mx-auto flex flex-col items-center">
            {profile ? (
                <Questionnaire />
            ) : (
                <div className="m-4 loading loading-spinner" />
            )}
        </main>
    );
}