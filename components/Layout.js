import {DatasetProvider, useDatasetContext } from "./DatasetProvider";

export default function Layout({ children }) {

    return (
        <DatasetProvider>
            <div className="min-h-screen bg-white">
                <div className="max-w-6xl mx-auto px-8 py-16">
                    <main className="z-0">
                        {children}
                    </main>
                </div>
            </div>
        </DatasetProvider>
    )
}