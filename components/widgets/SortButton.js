import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function SortButton(props) {

    const { sortDirection = 1, handleClick, label="", title="", selected } = props;

    return (
        <div
            onClick={() => handleClick(label)}
            className={`px-6 py-3 flex space-x-2 justify-center items-center rounded-md text-white text-sm hover:bg-slate-900 hover:cursor-pointer ${selected === label ? 'bg-slate-900' : 'bg-slate-600'}`}
        >
            <div>By {title}</div>
            {sortDirection === 1 ? (
                <BiChevronDown className="text-lg" />
            ) : (
                <BiChevronUp className="text-lg" />
            )}
        </div>
    );
}
