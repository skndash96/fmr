import Link from "next/link";
import { FaDiscord, FaEnvelope, FaGithub, FaLinkedin, FaReddit } from "react-icons/fa6";

export default function About() {
    return (
        <main className="p-4 sm:px-8 max-w-4xl mx-auto">
            <h1 className="text-lg font-bold mt-4">
                About Us
            </h1>
            <p className="mt-2">
                Welcome to FindMyRoomie! We are a dedicated team of three B.Tech. students from the 2027 batch of Instrumentation and Control Engineering at NIT Trichy. Our platform was born out of a shared experience and a common goal: to make the process of finding roommates as smooth and stress-free as possible.
            </p>
            <h1 className="text-lg font-bold mt-4">
                Our Story
            </h1>
            <p className="mt-2">
                The idea for FindMyRoomie emerged during our own room allotment time. We faced numerous challenges in finding compatible roommates and realized that a dedicated platform could have made our experience much easier. This realization sparked the development of FindMyRoomie—a solution designed to help you find the compatible roommate based on your preferences and compatibility.
            </p>
            <h1 className="text-lg font-bold mt-4">
                Our Mission
            </h1>
            <p className="mt-2">
                Our mission is simple: to provide a reliable and user-friendly platform that helps students connect with potential roommates. We understand how crucial it is to find someone who matches your lifestyle and preferences, which is why we&apos;ve developed a comprehensive questionnaire to ensure you find the best possible match.
            </p>
            <h1 className="text-lg font-bold mt-4">
                How It Works
            </h1>
            <p className="mt-2">
                FindMyRoomie uses a detailed questionnaire to assess your preferences, habits, and requirements. This way, you can make an informed decision and ensure a peaceful living arrangement.
            </p>

            <div className="mt-8">
                <h1 className="font-black text-2xl"> Team </h1>

                <div className="mt-2 flex flex-wrap *:grow gap-4">
                    <div className="p-2 w-fit bg-base-200 rounded-md">
                        <h1> Dash Skndash </h1>
                        <h2 className="font-semibold"> Frontend Dev </h2>
                    </div>
                    <div className="p-2 w-fit bg-base-200 rounded-md">
                        <h1> Dash Skndash </h1>
                        <h2 className="font-semibold"> Backend Dev </h2>
                    </div>
                    <div className="p-2 w-fit bg-base-200 rounded-md">
                        <h1> Dash Skndash </h1>
                        <h2 className="font-semibold"> UI/UX </h2>
                    </div>
                    <div className="p-2 w-fit bg-base-200 rounded-md">
                        <h1> Dash Skndash </h1>
                        <h2 className="font-semibold"> Devops </h2>
                    </div>
                </div>

                <div className="mt-8" id="contact">
                    <h1 className="font-black text-xl"> Meet me </h1>

                    <ul className="mt-4 flex gap-4 text-gray-600 text-2xl">
                        <li>
                            <Link href="https://github.com/skndash96">
                                <FaGithub />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://linkedin.com/in/skndash96">
                                <FaLinkedin />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://reddit.com/u/Still-Molasses6613">
                                <FaReddit />
                            </Link>
                        </li>
                        <li>
                            <Link href="mailto:dashskndash@gmail.com">
                                <FaEnvelope />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://discord.gg/gBuEy5ZWHw">
                                <FaDiscord />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}