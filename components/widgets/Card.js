import Link from "next/link"
import { HiOutlineIdentification } from 'react-icons/hi'
import { VscTable } from 'react-icons/vsc'
import { BsCalendarEvent } from 'react-icons/bs'

export default function Card(props) {

    const { referenceId, createdAt, description, name, tableCount } = props

    const date = new Date(createdAt).toLocaleDateString()
    const escapedName = name.toLowerCase().replace(/[^a-zA-Z0-9]/g,'_').replace('___', '_').replace('__','_')


    return (
        <Link href={`/datasets/${escapedName}`}>
            <div className="p-6 rounded-md border-[1px] border-neutral-200 bg-slate-50 hover:shadow-xl hover:bg-slate-100 hover:scale-[1.02] transition duration-200">
                <div className="font-bold font-lg text-redivisDarkPurple">{name}</div>
                <div className="mt-2 flex items-center">
                    <HiOutlineIdentification className="mr-2 text-xl" />
                    <div className="text-xs">{referenceId}</div>
                </div>
                <div className="mt-6 pb-6 md:h-36 text-sm border-b-[1px] overflow-y-hidden">
                    {description ? description : "No description available"}
                </div>
                <div className="mt-6 flex justify-between items-end text-sm">
                    <div className="flex items-center">
                        <VscTable className="mr-2 text-2xl text-redivisDarkPurple" />
                        <div className="text-sm">{tableCount}</div>
                    </div>
                    <div className="flex items-center">
                        <BsCalendarEvent className="mr-4 text-xl text-redivisDarkBlue" />
                        <div className="text-sm">{date}</div>
                    </div>
                </div>
                
            </div>
        </Link>
    )
}
