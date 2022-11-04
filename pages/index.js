import { useState, useEffect } from "react"
import Head from "next/head"
import Card from "../components/widgets/Card"
import FilterBar from "../components/widgets/Filters/FilterBar"
import Image from "next/image"
import logo from '../public/logo.png'

export default function Home(props) {

    // datasets: [ { referenceId, name, description, createdAt, tableCount }, ]
    const { datasets } = props

    const [ loading, setLoading ] = useState(true)
    const [ showFilters, setShowFilters ] = useState(false)
    const [ allDatasets, setAllDatasets ] = useState(datasets)
    const [ resetButton, setResetButton] = useState(false)
    const [ activeSort, setActiveSort ] = useState(null)
    const [ searchTerm, setSearchTerm ] = useState("")
    const [ sortDirection, setSortDirection ] = useState({
        "createdAt": 1,
        "tableCount": 1,
    }) 

    useEffect(() => {
        setLoading(false)
    }, [])

    const handleSort = (id) => {
        
        const copy = { ...sortDirection }
        copy[id] *= -1
        setSortDirection(copy)

        const datasetCopy = [...datasets]

        const sortedData = datasetCopy.sort((a,b) => 
            sortDirection[id]*(a[id] - b[id])
        )

        setAllDatasets(sortedData)
        setActiveSort(id)
        setResetButton(true)
    }

    const handleReset = () => {
        setAllDatasets(datasets)
        setSortDirection({
            "createdAt": 1,
            "tableCount": 1,
        })
        setSearchTerm("")
        setResetButton(false)
        setActiveSort(null)
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)

        const datasetCopy = [...datasets]

        const filteredResults = datasetCopy.filter((data) => {
            return (
              data
              .name
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
            )
        })

        setAllDatasets(filteredResults)

        if(e.target.value.length > 0){
            setResetButton(true)
        } else if(!activeSort) {
            setResetButton(false)
            setAllDatasets(datasets)
        }
    }

    const handleShowFilters = () => {
        setShowFilters(!showFilters)
    }
    

    if(loading) 
        return (
            <main className="text-center text-2xl font-bold animate-pulse">Loading...</main>
        )

    if(!loading)
        return (
            <div>
                <Head>
                    <title>Redivis Public API</title>
                    <meta
                        name="description"
                        content="Data tables available from the Redivis REST API"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <Image src={logo} alt="logo" className="mx-auto w-56" priority />

                    <FilterBar handleSort={handleSort} handleReset={handleReset} handleSearch={handleSearch} handleShowFilters={handleShowFilters} sortDirection={sortDirection} reset={resetButton} selected={activeSort} searchTerm={searchTerm} showFilters={showFilters} results={allDatasets.length} />

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allDatasets.map((data) => (
                            <Card key={data.referenceId} 
                                referenceId={data.referenceId}
                                uri={data.uri} 
                                createdAt={data.createdAt} 
                                description={data.description} 
                                name={data.name} 
                                tableCount={data.tableCount} 
                            />
                        ))}
                    </div>
                </main>
            </div>
        )
}

export async function getStaticProps() {

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
        return data.results 
    })
    .catch((error)=>{
        console.log('Error: ', error);
        return []
    })

    // Normalize the data
    const datasets = results.map((data) => {
        return {
            referenceId: data.referenceId,
            uri: data.uri,
            name: data.name,
            description: data.description,
            createdAt: data.createdAt,
            tableCount: data.tableCount,
        }
    })

    return {
        props: {
            datasets,
        },
    };
}
