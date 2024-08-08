import { FormEventHandler, useContext, useState } from "react";
import { charecterData, departmentData, interestData, statesData } from "../lib/data";
import TagsInput from "./tagsSelect";
import { z, ZodError } from "zod";
import { ProfileContext } from "../lib/profileContext";
import supabase from "../db/supabase";
import { MdQuestionAnswer } from "react-icons/md";

const questionnaireSchema = z.object({
    department: z.string().trim().min(1, { message: "Please select Department" }),
    state: z.string().trim().min(1, { message: "Please select State" }),
    language: z.string().trim().min(1, { message: "Please fill Languages" }),
    personality: z.string().trim().min(1, { message: "Please select Personlaties" }),
    interest: z.string().trim().min(1, { message: "Please select Interests" }),
    bio: z.string().trim().min(10, { message: "Bio must be atleast 10 charecters long"}),
});

export default function Questionnaire() {
    const profile = useContext(ProfileContext);

    const [department, setDepartment] = useState<string>(profile.department);
    const [state, setState] = useState<string>(profile.state);
    const [language, setLanguage] = useState<string>(profile.language);
    const [bio, setBio] = useState<string>(profile.bio);
    const [personality, setPersonality] = useState<string[]>(profile.personality?.split(", ") || []);
    const [interest, setInterest] = useState<string>(profile.interest);

    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit : FormEventHandler = async e => {
        e.preventDefault();

        try  {
            setLoading(true);
            setError(null);
            setSuccess(false);
            
            let valid = await questionnaireSchema.parseAsync({
                department, state, language, bio, personality: personality.join(", "), interest
            });

            if (profile === null) throw "Not logged in";

            let { error } = await supabase.from("profiles").update(valid).eq("id", profile.id);

            if (error) throw error;
            
            setSuccess(true);
        } catch (e) {
            if (e instanceof ZodError) {
                setError(e.errors[0].message);
            } else {
                console.error(e);
                setError("Something went wrong!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 w-full flex flex-col gap-4">
            <h1 className="font-bold text-2xl text-center flex items-center gap-2 justify-center">
                <MdQuestionAnswer />
                Questionnaire
            </h1>

            <div className="flex flex-col sm:flex-row gap-4">
                <fieldset className="form-control">
                    <label className="label label-text">
                        Department
                    </label>

                    <select value={department} onChange={e => setDepartment(e.currentTarget.value)} className="select select-bordered">
                        <option>
                            Select Department
                        </option>

                        {departmentData.map(item => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </fieldset>

                <fieldset className="form-control">
                    <label className="label label-text">
                        State
                    </label>

                    <select value={state} onChange={e => setState(e.currentTarget.value)} className="select select-bordered">
                        <option>
                            Select State
                        </option>

                        {statesData.map(item => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </fieldset>
            </div>

            <fieldset className="form-control">
                <label className="label label-text">
                    What are you into?
                </label>

                <select value={interest} onChange={e => setInterest(e.currentTarget.value)} className="select select-bordered">
                    {interestData.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </fieldset>

            <fieldset className="form-control">
                <label className="label label-text">
                    Languages you can speak
                </label>

                <input
                    value={language}
                    placeholder="English, Hindi, Tamil..."
                    type="text"
                    className="input input-bordered"
                    onChange={e => setLanguage(e.currentTarget.value)}
                />
            </fieldset>

            <TagsInput
                data={charecterData}
                label="Choose your Personalities"
                placeholder="Type to search"
                values={personality}
                setValues={setPersonality}
            />

            <fieldset className="form-control">
                <label className="label label-text">
                    Bio
                </label>

                <textarea
                    value={bio}
                    onChange={e => setBio(e.currentTarget.value)}
                    className="textarea textarea-bordered resize-y"
                    placeholder="Write specific info like Ambition and stuff"
                />
            </fieldset>

            {error && (
                <span className="mt-4 text-red-500">
                    {error}
                </span>
            )}

            {success && (
                <span className="mt-4 text-green-500">
                    Profile Updated
                </span>
            )}

            <button disabled={loading} className="btn btn-primary flex items-center gap-2" type="submit">
                {loading && (
                    <div className="loading loading-spinner" />
                )}
                Update Profile
            </button>
        </form>
    );
}