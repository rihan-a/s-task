import type {Section, ComputedSection} from '../types';

export function computeComputedSection(section: Section): ComputedSection {
    let computedSum = 0;

    // Recursivly process children, accumulating their computedSum
    const children = section.children.map((child) => {
        if ('children' in child) {
            // If the child is a Section, recurse
            const computedChild = computeComputedSection(child);
            computedSum += computedChild.computedSum;
            return computedChild;
        } else {
            computedSum += child.sum;
            return child;
        }
    });

    // Return a new ComputedSection with computedSum and updated children
    return {
        ...section,
        children,
        computedSum,
    };
}
