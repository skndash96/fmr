"use client";
import { useRouter } from "next/navigation";
import supabase from "../../db/supabase";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../lib/profileContext";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

export default function ProfilePage() {
    const profile = useContext(ProfileContext);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (profile === null) router.push("/");
    }, [profile]);

    const handleSignout = async () => {
        setLoading(true);

        try {
            await supabase.auth.signOut();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="p-4">
            <h1 className="font-bold text-2xl">
                Profile
            </h1>

            {profile && (
                <div className="mt-4 flex flex-col gap-4">
                    <ul className="table max-w-lg">
                        {Object.entries(profile).map(([k, v]) => (
                            <li key={k} className="mb-2 grid grid-cols-2">
                                <span className="font-semibold">{k}</span>
                                <span>{v}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-2">
                        <Link
                            href="/questionnaire"
                            className="btn btn-primary items-center"
                        >
                            <FaPen />
                            Update
                        </Link>
                        <button
                            disabled={loading}
                            onClick={handleSignout}
                            className="w-fit btn btn-error text-base-100 flex items-center gap-2"
                        >
                            {loading
                                ? <div className="loading loading-spinner" />
                                : <FaSignOutAlt />}
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}