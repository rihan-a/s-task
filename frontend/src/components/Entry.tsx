import {useState} from 'react';
import type {EntryType} from '../types';

type Props = {
    entry: EntryType;
};

export default function Entry({entry}: Props) {
    const [sum, setSum] = useState(entry.sum);
    const [note, setNote] = useState(entry.note);

    return (
        <div className="border border-black w-[50vw] p-2 m-3 flex justify-between align-center">
            <input
                type="number"
                value={sum}
                onChange={(e) => setSum(Number(e.target.value))}
                className="w-[15%] mr-2 p-1 border"
            />
            <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-[70%] bg-neutral-200 p-2"
            />
        </div>
    );
}
