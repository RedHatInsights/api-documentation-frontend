import {FunctionComponent} from 'react';
import { Gallery, GalleryItem } from '@patternfly/react-core';
import {Card} from "../../components/Card/Card";
import {useNavigate} from "react-router";

import {APIConfiguration, APILabel} from "../../config/apis";
import {NoMatchFound} from "../../components/NoMatchFound/NoMatchFound";
import APIConfigurationIcons from '../../config/APIConfigurationIcons';

export interface GridViewProps {
  apiDocs: ReadonlyArray<Readonly<APIConfiguration>>;
  apiLabels?: ReadonlyArray<Readonly<APILabel>>;
  clear: any;
}

export const GridView: FunctionComponent<GridViewProps> = ({apiDocs, clear}) => {
  const navigate = useNavigate();
    return <div>
    { apiDocs.length > 0 ?
      <Gallery minWidths={{default: '300px'}} hasGutter>
        { apiDocs.map(apiConfig => (
          <GalleryItem key={apiConfig.displayName}>
            <Card displayName={apiConfig.displayName} icon={apiConfig.icon ?? APIConfigurationIcons.GenericIcon} description={apiConfig.description} onClick={() => navigate(`/api/${apiConfig.id}`)} />
          </GalleryItem>
        ))}
      </Gallery> :
      <NoMatchFound clearFilters={clear} /> }
    </div>
};
