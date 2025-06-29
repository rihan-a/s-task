import type {ComputedSectionType} from '../types';
import SectionList from './SectionList';

type Props = {
    node: ComputedSectionType;
};

export default function Section({node}: Props) {
    return (
        <div className=" ">
            <div className="font-semibold">
                {node.name} — {node.computedSum}
            </div>
            <SectionList childrenNodes={node.children} />
        </div>
    );
}
