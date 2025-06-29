import './App.css';
import {useEffect, useState} from 'react';
import type {SectionType, ComputedSectionType} from './types';
import {computeComputedSection} from './utils/computeSum';
import Section from './components/Section';

function App() {
    const [tree, setTree] = useState<ComputedSectionType | null>(null);
    useEffect(() => {
        fetch('http://localhost:8000/api/report')
            .then((res) => res.json())
            .then((data: SectionType) => {
                const computed = computeComputedSection(data);
                setTree(computed);
                console.log(data);
            });
    }, []);

    if (!tree) return <div>Loading...</div>;

    return (
        <div>
            <h1>Splinde Task</h1>
            <h2></h2>
            <Section node={tree} />
        </div>
    );
}

export default App;
