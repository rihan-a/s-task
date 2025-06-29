import {useState} from 'react';
import type {EntryType} from '../types';

type Props = {
    entry: EntryType;
    onChange: (updated: EntryType) => void;
};

export default function Entry({entry, onChange}: Props) {
    const [sum, setSum] = useState(entry.sum.toString());
    const [note, setNote] = useState(entry.note);

    const commit = () => {
        const numSum = Number(sum);
        // Only update if the sum is a valid number
        if (!isNaN(numSum)) {
            onChange({...entry, sum: numSum, note});
        }
    };

    const handleSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Only update if it's a valid number or empty
        if (value === '' || !isNaN(Number(value))) {
            setSum(value);
        }
    };

    return (
        <div className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-100">
            <div className="flex items-center space-x-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {entry.name}
                    </label>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        onBlur={commit}
                        placeholder="Add a note..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="w-32">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                    </label>
                    <input
                        type="number"
                        value={sum}
                        onChange={handleSumChange}
                        onBlur={commit}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                    />
                </div>
            </div>
        </div>
    );
}
