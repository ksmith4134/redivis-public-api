import { useState, useEffect, useCallback } from "react"
import * as redivis from "redivis"

export default function Dataset() {

    const [ loading, setLoading ] = useState(true)
    const [ data, setData ] = useState(null)


    useEffect(() => {
        getRows('demo', 'reddit', 'posts', 10)
    }, [])

    /* Testing purposes only */
    // useEffect(() => {
    //     console.log("data", data)
    // }, [data])


    const getRows = async (org, dataset, table, maxRows) => {

        setLoading(true)

        const test = await redivis
            .organization(org)
            .dataset(dataset)
            .table(table)
            .listRows({ maxResults: maxRows })

        setData(test)
        setLoading(false)
    }

    
    if(loading) 
        return (
            <main className="text-center text-2xl font-bold animate-pulse">Loading...</main>
        )

    if(!loading) 
        return (
            <div>
                <div className="font-bold">Reddit Table</div>
                { data.map((entry) => (
                    <div key={entry.id} className="mt-6">{entry.author}</div>
                ))}
            </div>
        )
}
