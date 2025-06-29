import type {ComputedSectionType, EntryType} from '../types';
import SectionList from './SectionList';

type Props = {
    node: ComputedSectionType;
    onChange: (updated: ComputedSectionType | EntryType) => void;
};

export default function Section({node, onChange}: Props) {
    return (
        <div className=" border border-black p-2 m-2 rounded-lg">
            <div className="font-semibold text-left p-1">
                {node.name} — {node.computedSum}
            </div>
            <SectionList
                childrenNodes={node.children}
                onChildChange={onChange}
            />
        </div>
    );
}
