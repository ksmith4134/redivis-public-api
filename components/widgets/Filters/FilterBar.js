import SortButton from "./SortButton"
import { BsSliders } from 'react-icons/bs'
import Search from "./Search"
import ResetButton from "./ResetButton"

export default function FilterBar(props) {
    
    const { sortDirection, handleSort, handleReset, handleSearch, handleShowFilters, reset, selected, searchTerm, showFilters = false, results } = props;

    const sortButtons = [
        {id: "createdAt", title: "Date"},
        {id: "tableCount", title: "Table Count"},
    ]

    return (
        <div>
            <div className="mt-8 flex justify-between items-center">
                <div onClick={handleShowFilters} className="flex items-center gap-3 mr-2 p-2 rounded-md hover:cursor-pointer hover:bg-slate-100">
                    <BsSliders />
                    <div>{showFilters ? 'Hide ' : 'Show '}Filters</div>
                </div>
                <div className="p-2">{results} results</div>
            </div>

            { showFilters && (

                <div className="mt-4 flex flex-wrap justify-start items-center gap-4">
                    { sortButtons.map((button) => (
                        <SortButton key={button.id} handleClick={handleSort} sortDirection={sortDirection[button.id]} label={button.id} title={button.title} selected={selected} />
                    ))}

                    <Search handleChange={handleSearch} searchTerm={searchTerm} />

                    { reset && (
                        <ResetButton handleClick={handleReset} />
                    )}
                </div>
            )}
        </div>
    );
}
