"use client";
import { FormEventHandler, useContext, useEffect, useState } from "react";
import { z, ZodError } from "zod";
import supabase from "../../db/supabase";
import { AuthApiError } from "@supabase/supabase-js";
import Link from "next/link";
import { ProfileContext } from "../../lib/profileContext";
import { redirect } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid credentials" }),
    password: z.string().min(1, { message: "Invalid credentials" })
});

export default function Login() {
    const profile = useContext(ProfileContext);

    useEffect(() => {
        if (profile) redirect("/dashboard");
    }, [profile]);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit: FormEventHandler = async e => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            let valid = await loginSchema.parseAsync({
                email,
                password
            });

            let { error } = await supabase.auth.signInWithPassword({
                email: valid.email,
                password: valid.password
            });

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => redirect("/dashboard"), 2000);
        } catch (e) {
            if (e instanceof ZodError) {
                setError(e.errors[0].message);
            } else if (e instanceof AuthApiError) {
                setError(e.message);
            } else {
                console.error(e);
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="p-4">
            <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto flex flex-col gap-2 rounded-xl drop-shadow-lg bg-base-200 border-2 border-solid border-black border-opacity-20">
                <h1 className="text-2xl text-center font-bold"> Login </h1>

                <fieldset className="form-control">
                    <label className="label label-text">
                        Email
                    </label>

                    <input
                        placeholder="example@gmail.com"
                        type="email"
                        className="input input-bordered"
                        onChange={e => setEmail(e.currentTarget.value)}
                    />
                </fieldset>

                <fieldset className="form-control">
                    <label className="label label-text">
                        Password
                    </label>

                    <input
                        placeholder="Enter password"
                        type="password"
                        className="input input-bordered"
                        onChange={e => setPassword(e.currentTarget.value)}
                    />
                </fieldset>

                <div className="mt-4">
                    {success ? (
                        <span className="flex items-center gap-2 text-green-500">
                            <div className="loading loading-spinner" /> Success! Redirecting...
                        </span>
                    ) : error ? (
                        <span className="text-red-500">
                            {error}
                        </span>
                    ) : null}
                </div>

                <button disabled={loading} type="submit" className="btn btn-primary flex items-center gap-2">
                    {loading && <div className="loading loading-spinner" />}
                    Login
                </button>

                <Link href="/register" className="mt-2 underline text-sm">
                    Not registered yet?
                </Link>

                <details className="collapse collapse-arrow text-sm -mt-4">
                    <summary className="pl-0 collapse-title underline w-fit">Forgot Password?</summary>
                    
                    <div className="collapse-content p-0">
                        <Link href="/about#contact" className="underline">Contact me</Link> to reset password.
                    </div>
                </details>
            </form>
        </main>
    );
}