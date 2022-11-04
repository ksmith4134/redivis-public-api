import { useDatasetContext } from '../../components/DatasetProvider'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Access } from "../../components/Theme"

export default function Dataset(props){

    const { tables, datasets } = props

    const { query } = useRouter();
    const [ singleDataset, setSingleDataset ] = useState({})

    const AccessIcon = Access[singleDataset?.accessLevel] ? Access[singleDataset?.accessLevel] : Access["default"]


    useEffect(() => {
        setSingleDataset(
            datasets.find((data) => 
                query.id === data.name.toLowerCase().replace(/[^a-zA-Z0-9]/g,'_').replace('___', '_').replace('__','_')
            )
        )
    }, [])

    useEffect(() => {
        console.log("singleDataset", singleDataset)
    }, [singleDataset])


    return (
        <div>
            <div className="font-bold text-xl">
                {singleDataset.name}
            </div>
            <div className="mt-2 max-w-lg text-sm">
                {singleDataset.description}
            </div>
            <div className="flex items-center mt-4">
                <AccessIcon className="mr-2 text-4xl" />
                <div className="text-sm">Access Level: {singleDataset?.accessLevel}</div>
            </div>
            <div className="mt-6">
                <div className="font-semibold">Data Tables</div>
                <div className="mt-2">
                    { tables.results.map((table) => (
                        <div key={table.id}>
                            {table.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export async function getStaticPaths() {

    let results = await fetch("https://redivis.com/api/v1/organizations/demo/datasets", {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${process.env.REDIVIS_API_TOKEN}`
        }
    })
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error)=>{
        console.log('Error: ', error);
        return []
    })

    return {
        paths: results.map((data)=>{
            return {
                params: {
                    id: data.name.toLowerCase().replace(/[^a-zA-Z0-9]/g,'_').replace('___', '_').replace('__','_')
                }
            }
        }),
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    const tables = await fetch(`https://redivis.com/api/v1/datasets/demo.${params.id}/tables`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${process.env.REDIVIS_API_TOKEN}`
        }
    })
    .then((response) => response.json())
    .catch((error)=>{
        console.log('Error: ', error);
        return []
    })

    // GET all demo datasets
    const results = await fetch("https://redivis.com/api/v1/organizations/demo/datasets", {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${process.env.REDIVIS_API_TOKEN}`
        }
    })
    .then((response) => response.json())
    .then((data) => { 
        // console.log('Success: ', data)
        return data.results.map((data) => {
            return {
                referenceId: data.referenceId,
                uri: data.uri,
                name: data.name,
                description: data.description ? data.description : "No description available",
                createdAt: data.createdAt,
                tableCount: data.tableCount,
                accessLevel: data.accessLevel,
            }
        })
    })
    .catch((error)=>{
        console.log('Error: ', error);
        return []
    })
  
    return { 
        props: { 
            tables,
            datasets: results
        } 
    }
  }
