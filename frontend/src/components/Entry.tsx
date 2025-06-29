import {useState} from 'react';
import type {EntryType} from '../types';

type Props = {
    entry: EntryType;
};

export default function Entry({entry}: Props) {
    const [sum, setSum] = useState(entry.sum);
    const [note, setNote] = useState(entry.note);

    return (
        <div className="">
            <input
                type="number"
                value={sum}
                onChange={(e) => setSum(Number(e.target.value))}
            />
            <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
        </div>
    );
}
