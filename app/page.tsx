import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="p-4 flex items-center justify-center flex-col">
            <h1 className="text-4xl inter font-black"> Confused about your Roomie? Find &apos;em here! </h1>

            <Link href="/register" className="mt-4 btn btn-primary">
                Introduce Yourself
            </Link>

            <p className="mt-8 max-w-4xl leading-7 text-[17px] font-semibold">
                <span>
                    Are you still searching for a roomie? Unsure if you might get along well?
                </span>

                <span className="block mt-4">
                    FindMyRoomie connects people who are seeking roommate, across your batch. Browse through profiles, listing interests to living habits. Find your match, connect effortlessly through our platform and get going now! Happy First Year!
                </span>
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-8">
                {[
                    ["/vibe.png", "Find your Vibe"],
                    ["/connect.png", "Safe and Verified"],
                    ["/lock.png", "Connect with People"],
                ].map(([src, label]) => (
                    <div key={src} className="p-2 w-72 flex flex-col justify-between bg-base-200 rounded-xl overflow-hidden">
                        <div className="grow flex flex-col items-center justify-center">
                            <Image className="my-auto w-40 sm:w-52" src={src} width={200} height={200} alt={label} />
                        </div>
                        <h2 className="text-center font-black text-xl"> {label} </h2>
                    </div>
                ))}
            </div>
        </main>
    );
}
