import './App.css';
import {useEffect, useState} from 'react';
import type {SectionType, ComputedSectionType, EntryType} from './types';
import {computeComputedSection} from './utils/computeSum';
import Section from './components/Section';
import splindeLogo from './assets/splinde-logo.png';

function App() {
    const [tree, setTree] = useState<ComputedSectionType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/report')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                return res.json();
            })
            .then((data: SectionType) => {
                const computed = computeComputedSection(data);
                setTree(computed);
                setError(null);
                console.log(data);
            })
            .catch((err) => {
                setError(
                    'Failed to load data. Please check if the backend is running.'
                );
                console.error('Error fetching data:', err);
            });
    }, []);

    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md border border-red-200">
                <div className="text-red-500 text-center">{error}</div>
            </div>
        </div>
    );
    
    if (!tree) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-gray-600 text-lg">Loading...</div>
        </div>
    );

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
        <div className= " w-[60vw] bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <img 
                                src={splindeLogo} 
                                alt="Splinde Logo" 
                                className="h-8 w-auto"
                            />
                            <h1 className="text-xl font-semibold text-gray-900">
                                Financial Report
                            </h1>
                        </div>
                        <div className="text-sm text-gray-500">
                            Interactive Dashboard
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Section node={tree} onChange={handleUpdate} />
            </main>
        </div>
    );
}

export default App;
