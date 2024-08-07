"use client";

import { z, ZodError } from "zod";
import { genderEnum, InsertProfile } from "../../db/schema";
import { isMobilePhone } from "validator";
import { FormEventHandler, useContext, useEffect, useState } from "react";
import supabase from "../../db/supabase";
import { AuthApiError } from "@supabase/supabase-js";
import Link from "next/link";
import { ProfileContext } from "../../lib/profileContext";
import { redirect } from "next/navigation";

const registerSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be atleast 3 charecters long" })
        .max(20, { message: "Name must be at max 20 charecters long" }),
    gender: z
        .enum(genderEnum.enumValues, { message: "Invalid Gender" }),
    email: z
        .string()
        .email({ message: "Invalid Email" }),
    ph: z
        .string()
        .refine(isMobilePhone, { message: "Invalid Phone number" }),
    password: z
        .string()
        .min(6, { message: "Password must be atleast 6 charecters long" })
});

export default function Register() {
    const profile = useContext(ProfileContext);

    useEffect(() => {
        if (profile) redirect("/dashboard");
    }, [profile]);

    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("M"); //M | F
    const [email, setEmail] = useState<string>("");
    const [ph, setPh] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit : FormEventHandler = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            let valid = await registerSchema.parseAsync({
                name, email, password, ph, gender
            });

            let { data: { user }, error } = await supabase.auth.signUp({
                email: valid.email,
                password: valid.password
            });
            if (error || !user) throw error;

            let record : InsertProfile = {
                id: user.id,
                name: valid.name,
                gender: valid.gender,
                email: valid.email,
                ph: valid.ph
            };

            let { error: insertError } = await supabase.from("profiles").insert(record);
            if (insertError) throw insertError;

            setSuccess(true);
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
                <h1 className="text-2xl text-center font-bold">
                    Register
                </h1>

                <fieldset className="form-control">
                    <label className="label label-text">
                        Name*
                    </label>

                    <input
                        placeholder="John Doe"
                        type="text"
                        className="input input-bordered"
                        onChange={e => setName(e.currentTarget.value)}
                    />
                </fieldset>


                <fieldset className="form-control">
                    <label className="label label-text">
                        Gender*
                    </label>

                    <select
                        onChange={e => setGender(e.currentTarget.value)}
                        className="w-fit select select-bordered"
                    >
                        <option value="M"> Male </option>
                        <option value="F"> Female </option>
                    </select>
                </fieldset>

                <fieldset className="form-control">
                    <label className="label label-text">
                        Email*
                    </label>

                    <input
                        onChange={e => setEmail(e.currentTarget.value)}
                        placeholder="example@gmail.com"
                        type="email"
                        className="input input-bordered"
                    />
                </fieldset>


                <fieldset className="form-control">
                    <label className="label label-text">
                        Phone*
                    </label>

                    <input
                        onChange={e => setPh(e.currentTarget.value)}
                        placeholder="+91 90120192XX"
                        type="number"
                        className="input input-bordered"
                    />
                </fieldset>

                <fieldset className="form-control">
                    <label className="label label-text">
                        Password*
                    </label>

                    <input
                        onChange={e => setPassword(e.currentTarget.value)}
                        placeholder="Enter password"
                        type="password"
                        className="input input-bordered"
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
                    Register
                </button>

                <Link href="/login" className="mt-2 underline text-sm">
                    Already registered? Login
                </Link>
            </form>
        </main>
    );
}