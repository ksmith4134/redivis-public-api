import { MdClear } from "react-icons/md"

export default function ResetButton(props) {

    const { handleClick } = props
    
    return (
        <div
            onClick={() => handleClick()}
            className="px-6 py-3 flex space-x-2 justify-center items-center rounded-md bg-slate-600 text-white text-sm hover:bg-slate-900 hover:cursor-pointer"
        >
            <div>Reset</div>
            <MdClear className="text-lg" />
        </div>
    )
}
