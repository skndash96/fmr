"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import { ProfileContext } from "../../lib/profileContext";
import { Profile } from "../../db/schema";
import supabase from "../../db/supabase";
import ProfileCard from "../../components/profileCard";
import Filters from "../../components/filters";

export default function Dashboard() {
    let profile = useContext(ProfileContext);
    const [data, setData] = useState<Profile[]>([]);

    const [department, setDepartment] = useState<string>();
    const [words, setWords] = useState<string[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const step = 20;
    let offset = useRef(0);
    let observer = useRef<IntersectionObserver>();

    const getData = async (reset: boolean) => {
        setLoading(true);
        setError(null);

        if (!profile) return;

        try {
            let q = `and(gender.eq.${profile.gender}`;

            if (department) q += `,department.eq.${department}`;
            
            if (words.length > 0) {
                q += ",or(";

                q += words.map(
                    w => ["name", "bio", "language", "personality"].map(c => (
                        `${c}.ilike.%${w}%`
                    ))
                ).flat().join(",");

                q += ")";
            }

            q += ")";

            let { data: _data, error } = await supabase
                .from("profiles")
                .select()
                .or(q)
                .range(offset.current, step + offset.current);

            console.log("fetch", offset.current, step + offset.current, reset);

            if (error) throw error;

            if (reset) {
                setData([..._data]);
            } else {
                setData(data => [...data, ..._data]);
            }

            if (_data.length === 0) {
                setError("No records found");
            }
        } catch (e) {
            console.error(e);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        offset.current = 0;
        getData(true);
    }, [department, words]);

    useEffect(() => {
        if (profile === null) redirect("/");

        observer.current?.disconnect();
        getData(true);

        const endEl = document.getElementById("end");
        if (!endEl) return;

        observer.current = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) return;

            console.log("End of Page Reached");

            offset.current += step;
            getData(false);
        }, {
            threshold: .5
        });

        observer.current.observe(endEl);
    }, [profile]);

    return (
        <main className="p-4 w-full max-w-lg mx-auto relative min-h-[150vh]">
            <Filters
                words={words}
                setWords={setWords}
                department={department}
                setDepartment={setDepartment}
            />

            <ul className="flex flex-col gap-4">
                {data.map((prof, idx) => (
                    <li key={idx}>
                        <ProfileCard profile={prof} />
                    </li>
                ))}

                {loading && (
                    <div className="mt-4 loading loading-spinner" />
                )}

                {error && (
                    <span className="mt-4 text-red-500">
                        {error}
                    </span>
                )}
            </ul>

            <div id="end" className="h-16 absolute inset-0 top-auto"></div>
        </main>
    );
}