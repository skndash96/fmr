import { KeyboardEventHandler, useState } from "react";

export default function TagsInput({
    label, placeholder, values, setValues
}: {
    label: string,
    placeholder: string,
    values: string[],
    setValues: (values: string[]) => void
}) {
    const [query, setQuery] = useState<string>("");

    const handleAdd = (item: string) => {
        setValues([...values, item]);
    };
    const handleRemove = (item: string) => {
        let idx = values.indexOf(item);
        if (idx !== -1) values.splice(idx, 1);

        setValues([...values]);
    };

    const handleKeyDown : KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleAdd(e.currentTarget.value);
            e.currentTarget.value = "";
        }
    };
    
    return (
        <fieldset className="form-control">
            <label className="label label-text">
                {label}
            </label>

            <ul className="mb-2 flex flex-wrap gap-2">
                {values.map(item => (
                    <li className="pr-0 py-2 badge badge-ghost gap-2" key={item}>
                        {item}
                        <button onClick={() => handleRemove(item)} className="text-red-500 btn btn-square btn-ghost btn-xs">x</button>
                    </li>
                ))}
            </ul>

            <input
                onKeyDown={handleKeyDown}
                onChange={e => setQuery(e.currentTarget.value)}
                placeholder={placeholder}
                className="w-full input input-bordered"
            />
        </fieldset>
    );
}