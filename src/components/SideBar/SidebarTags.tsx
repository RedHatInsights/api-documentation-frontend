import React, {Dispatch, FunctionComponent, SetStateAction, useMemo} from "react";
import {APILabel} from "@apidocs/common";
import {Checkbox, Text, TextContent, TextVariants} from "@patternfly/react-core";
import assertNever from "assert-never";
import produce from "immer";

interface SidebarTagsProps {
    tags: ReadonlyArray<APILabel>;
    selected: ReadonlyArray<string>;
    setSelected: Dispatch<SetStateAction<ReadonlyArray<string>>>;
}

const displayedTags: ReadonlyArray<APILabel['type']> = [
    'use-case',
    'service',
    'platform'
] as const;

type DisplayedTagsType = (typeof displayedTags)[number];

const getTitle = (type: DisplayedTagsType) => {
    switch (type) {
        case 'use-case':
            return 'Use Case';
        case 'service':
            return 'Saas Service';
        case 'platform':
            return 'Red Hat Platform';
    }

    assertNever(type);
}

export const SidebarTags: FunctionComponent<SidebarTagsProps> = ({tags, selected, setSelected}) => {
    const tagsByGroup = useMemo(() => tags.reduce(
        (prev, current) => {
            if (current.type in prev) {
                prev[current.type].push(current);
            }
            return prev;
        },
        {
            'use-case': [],
            service: [],
            platform: []
        } as Record<DisplayedTagsType, Array<APILabel>>
    ), [tags]);

    return (
        <TextContent>
            {displayedTags.map((type, index) =>
                <React.Fragment key={type}>
                    {tagsByGroup[type].length > 0 && (
                        <>
                            <Text component={TextVariants.p} className={`${index > 0 ? 'pf-u-mt-md' : ''} pf-u-mb-sm`}>{getTitle(type)}</Text>
                            {tagsByGroup[type].map(tag => <Checkbox
                                key={tag.id}
                                id={`sidebar-tag-checkbox-${tag.id}`}
                                label={tag.name}
                                name={tag.name}
                                onChange={isChecked => setSelected(produce(draft => {
                                    const index = draft.indexOf(tag.id);

                                    if (index === -1 && isChecked) {
                                        draft.push(tag.id);
                                    } else if (index !== -1 && !isChecked) {
                                        draft.splice(index, 1);
                                    }
                                }))}
                                isChecked={selected.includes(tag.id)}
                            />)}
                        </>
                    )}
                </React.Fragment>
            )}
        </TextContent>
    );
}
