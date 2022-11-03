import SortButton from "./SortButton";
import { BsSliders } from 'react-icons/bs';
import Search from "./Search";
import ResetButton from "./ResetButton";

export default function SortBar(props) {
    
    const { sortDirection, handleSort, handleReset, handleSearch, reset, selected, searchTerm } = props;

    const sortButtons = [
        {id: "createdAt", title: "Date"},
        {id: "tableCount", title: "Table Count"},
    ]

    return (
        <div className="mt-12 flex flex-wrap justify-start items-center gap-4">
            <div className="flex items-center gap-3 mr-2">
                <BsSliders />
                <div>Sort</div>
            </div>
            { sortButtons.map((button) => (
                <SortButton key={button.id} handleClick={handleSort} sortDirection={sortDirection[button.id]} label={button.id} title={button.title} selected={selected} />
            ))}
            <Search handleChange={handleSearch} searchTerm={searchTerm} />
            { reset && (
                <ResetButton handleClick={handleReset} />
            )}
        </div>
    );
}
