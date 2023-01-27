import {FunctionComponent} from 'react';
import {Card as PFCard, CardTitle} from '@patternfly/react-core';

export interface CardProps {
    displayName: string;
    onClick: () => void;
}

export const Card: FunctionComponent<CardProps> = ({displayName, onClick}) => {
     return <PFCard
         onClick={ onClick }
         isSelectable
         isCompact
         isFlat
     >
         <CardTitle>{displayName}</CardTitle>
     </PFCard>
};
