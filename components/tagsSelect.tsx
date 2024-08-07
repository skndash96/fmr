import { useState } from "react";

export default function TagsSelect({
    label, placeholder, data, values, setValues
}: {
    label: string,
    placeholder: string,
    data: string[],
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

            <div className="dropdown">
                <input
                    onChange={e => setQuery(e.currentTarget.value)}
                    placeholder={placeholder}
                    className="w-full input input-bordered"
                />

                <ul tabIndex={0} className="p-2 w-full max-w-sm max-h-72 overflow-auto dropdown-content bg-base-200 flex flex-col">
                    {data.map(item => (
                        <li key={item} className={item.toLowerCase().includes(query.toLowerCase()) && !values.includes(item) ? "" : "hidden"}>
                            <button onClick={() => handleAdd(item)} type="button" className="w-full btn btn-sm justify-start btn-ghost">
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </fieldset>
    );
}