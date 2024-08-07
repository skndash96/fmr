import { FaPhoneAlt } from "react-icons/fa";
import { Profile } from "../db/schema";
import { FaEnvelope } from "react-icons/fa6";

export default function ProfileCard({
    profile: { name, bio, department, email, ph, state, interest, personality, language }
}: {
    profile: Profile
}) {
    return (
        <div className="p-4 text-sm flex flex-col gap-2 bg-base-200 rounded-xl shadow-md">
            <span className="font-semibold">
                <span className="text-lg">{name}</span>

                {department && (
                    <span className="ml-2 px-2 rounded-xl inline-block bg-base-300 font-normal text-gray-800">
                        {department} Department
                    </span>
                )}
            </span>

            {bio && (
                <p className="mb-4 pl-4 border-l-2 border-primary">
                    {bio}
                </p>
            )}

            <ul className="flex gap-2 flex-wrap">
                {personality?.split(", ").map(item => (
                    <li className="badge badge-neutral bg-primary" key={item}>
                        {item}
                    </li>
                ))}
            </ul>

            {language && (
                <span>
                    <span className="mr-2 font-semibold">Language:</span>
                    {language}
                </span>
            )}

            {interest && (
                <div>
                    <span className="font-semibold"> Interested in: </span> {interest}
                </div>
            )}

            {state && (
                <div>
                    <span className="font-semibold"> State: </span> {state}
                </div>
            )}

            <div>
                {ph && (
                    <a href={`tel:${ph}`} className="flex w-fit hover:underline items-center gap-4">
                        <FaPhoneAlt className="fill-fuchsia-900" />
                        {ph}
                    </a>
                )}
                {email && (
                    <a href={`mailto:${email}`} className="flex w-fit hover:underline items-center gap-4">
                        <FaEnvelope className="fill-fuchsia-900" />
                        {email}
                    </a>
                )}
            </div>
        </div>
    );
}