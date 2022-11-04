
export default function Dataset(props){

    const { tables } = props

    console.log("tables", tables.results)


    return (
        <div>
            { tables.results.map((table) => (
                <div key={table.id}>
                    {table.name}
                </div>
            ))}
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
                    id: data.name.toLowerCase().split(' ').join('_').split('.').join('_')
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
  
    return { 
        props: { 
            tables
        } 
    }
  }
