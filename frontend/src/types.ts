export type TreeNode = {
    name: string;
};

export type EntryType = TreeNode & {
    note: string;
    sum: number;
};

export type SectionType = TreeNode & {
    children: (EntryType | SectionType)[];
};

export type ComputedSectionType = TreeNode & {
    children: (EntryType | ComputedSectionType)[];
    computedSum: number;
};
