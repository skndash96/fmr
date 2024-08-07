import { useEffect, useState } from "react";
import supabase from "../db/supabase";
import { Profile } from "../db/schema";

export default function useProfile() {
    const [profile, setProfile] = useState<Profile | null>();

    useEffect(() => {
        supabase.auth.onAuthStateChange((_, session) => {
            let user = session?.user;

            if (!user) {
                setProfile(null);
                return;
            };

            supabase
                .from("profiles")
                .select()
                .eq("id", user.id)
                .then(res => {
                    if (res.error) console.error(res.error);
                    else {
                        let prof0: Profile = res.data[0];
                        if (prof0) setProfile(prof0);
                    }
                })
        });
    }, []);

    return profile;
}