import type {ComputedSectionType, EntryType} from '../types';
import Section from './Section';
import Entry from './Entry';

type Props = {
    childrenNodes: (ComputedSectionType | EntryType)[];
};

export default function SectionList({childrenNodes}: Props) {
    return (
        <>
            {childrenNodes.map((child) =>
                'children' in child ? (
                    <Section key={child.name} node={child} />
                ) : (
                    <Entry key={child.name} entry={child} />
                )
            )}
        </>
    );
}
