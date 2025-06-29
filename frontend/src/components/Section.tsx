import type {ComputedSectionType, EntryType} from '../types';
import SectionList from './SectionList';

type Props = {
    node: ComputedSectionType;
    onChange: (updated: ComputedSectionType | EntryType) => void;
};

export default function Section({node, onChange}: Props) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    {node.name}
                </h2>
                <div className="text-2xl font-bold text-blue-600">
                    ${node.computedSum.toLocaleString()}
                </div>
            </div>
            <SectionList
                childrenNodes={node.children}
                onChildChange={onChange}
            />
        </div>
    );
}
