import type {ComputedSectionType, EntryType} from '../types';
import Section from './Section';
import Entry from './Entry';

type Props = {
    childrenNodes: (ComputedSectionType | EntryType)[];
    onChildChange: (updated: ComputedSectionType | EntryType) => void;
};

export default function SectionList({childrenNodes, onChildChange}: Props) {
    return (
        <>
            {childrenNodes.map((child) =>
                'children' in child ? (
                    <Section
                        key={child.name}
                        node={child}
                        onChange={onChildChange}
                    />
                ) : (
                    <Entry
                        key={child.name}
                        entry={child}
                        onChange={onChildChange}
                    />
                )
            )}
        </>
    );
}
