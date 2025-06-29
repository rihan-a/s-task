import './App.css';
import {useEffect} from 'react';
import type {Section} from './types';

function App() {
    useEffect(() => {
        fetch('http://localhost:8000/api/report')
            .then((res) => res.json())
            .then((data: Section) => {
                console.log(data);
            });
    }, []);

    return (
        <div>
            <h1>Splinde Task</h1>
        </div>
    );
}

export default App;
