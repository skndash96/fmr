import { departmentData } from "../lib/data";
import TagsInput from "./tagsInput";

export default function Filters({
    words, setWords, department, setDepartment
}: {
    words: string[],
    setWords: (words: string[]) => void,
    department: string,
    setDepartment: (department: string) => void,
}) {
    return (
        <form className="max-w-lg mb-8 flex flex-col gap-4">
            <fieldset className="form-control">
                <label className="label label-text">
                    Department
                </label>

                <select className="w-full select select-bordered" onChange={e => setDepartment(e.currentTarget.value)}>
                    <option value=""> Select Department </option>
                    {departmentData.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </fieldset>

            <TagsInput
                values={words}
                setValues={setWords}
                label="Look for words in any Field"
                placeholder="Type and hit Enter"
            />
        </form>
    );
}