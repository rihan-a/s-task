import './App.css';
import {useEffect, useState} from 'react';
import type {Section, ComputedSection} from './types';
import {computeComputedSection} from './utils/computeSum';

function App() {
    const [tree, setTree] = useState<ComputedSection | null>(null);
    useEffect(() => {
        fetch('http://localhost:8000/api/report')
            .then((res) => res.json())
            .then((data: Section) => {
                const computed = computeComputedSection(data);
                setTree(computed);
                console.log(data);
            });
    }, []);

    if (!tree) return <div>Loading...</div>;

    return (
        <div>
            <h1>Splinde Task</h1>
            <h2>
                {tree.name} — Total: {tree.computedSum}
            </h2>
        </div>
    );
}

export default App;
