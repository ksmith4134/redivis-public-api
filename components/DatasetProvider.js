import {useContext, createContext, useState, useEffect} from "react";


const DatasetContext = createContext(null);

export function DatasetProvider({children}){

    
    const [ data, setData ] = useState(null)


    return (
        <DatasetContext.Provider value={{ data, setData }}>
            { children }
        </DatasetContext.Provider>
    )
}


// use this hook in app components that will need to access the current datasets
export function useDatasetContext(){
    return useContext(DatasetContext)
}




