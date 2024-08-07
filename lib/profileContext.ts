import { createContext } from "react";
import { Profile } from "../db/schema";

const ProfileContext = createContext<Profile|null|undefined>(undefined);

export { ProfileContext };