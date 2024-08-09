import { KeyboardEventHandler } from "react";

export default function TagsInput({
    label, placeholder, values, setValues
}: {
    label: string,
    placeholder: string,
    values: string[],
    setValues: (values: string[]) => void
}) {
    const handleAdd = (item: string) => {
        let s = new Set(values);
        s.add(item);
        setValues(Array.from(s));
    };

    const handleRemove = (item: string) => {
        let s = new Set(values);
        s.delete(item);
        setValues(Array.from(s));
    };

    const handleKeyDown : KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            
            let v = e.currentTarget.value.trim();
            
            if (v && v.length > 0) {
                handleAdd(v);
            }

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
                placeholder={placeholder}
                className="w-full input input-bordered"
            />
        </fieldset>
    );
}