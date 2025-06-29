import './App.css';
import {useEffect, useState} from 'react';
import type {SectionType, ComputedSectionType, EntryType} from './types';
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

    const handleUpdate = (updated: EntryType | ComputedSectionType) => {
        if (!tree) return;

        const replaceNode = (
            node: ComputedSectionType
        ): ComputedSectionType => {
            if (node.name === updated.name) {
                // Replace the matching node
                return updated as ComputedSectionType;
            }

            const newChildren = node.children.map((child) => {
                if (child.name === updated.name) {
                    return updated;
                } else if ('children' in child) {
                    return replaceNode(child);
                } else {
                    return child;
                }
            });

            return {
                ...node,
                children: newChildren,
                computedSum: node.computedSum,
            };
        };

        const updatedTree = replaceNode(tree);
        const recomputedTree = computeComputedSection(updatedTree);
        setTree(recomputedTree);
    };

    return (
        <div>
            <h1>Splinde Task</h1>
            <Section node={tree} onChange={handleUpdate} />
        </div>
    );
}

export default App;
