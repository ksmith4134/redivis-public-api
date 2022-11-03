import { FiSearch } from "react-icons/fi"

export default function Search(props) {

    const { handleChange, searchTerm } = props

    return (
        <form className="relative flex-1 min-w-[220px]">
            <input
                type="text"
                placeholder="Search by dataset name"
                value={searchTerm}
                onChange={(e) => handleChange(e)}
                className="w-full px-6 py-3 flex space-x-2 justify-center items-center rounded-md bg-slate-600 text-white text-sm focus:bg-slate-700 focus:outline-none"
            >
                
            </input>
            <FiSearch className="absolute right-3 top-2.5 text-slate-400 text-2xl" />
        </form>
    )
}
