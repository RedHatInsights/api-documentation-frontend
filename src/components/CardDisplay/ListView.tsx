import {FunctionComponent} from 'react';
import { Gallery, GalleryItem } from '@patternfly/react-core';
import {ListItem} from "../../components/ListItem/ListItem";
import {useNavigate} from "react-router";

import {APIConfiguration, APILabel} from "../../config/apis";
import {NoMatchFound} from "../../components/NoMatchFound/NoMatchFound";
import APIConfigurationIcons from '../../config/APIConfigurationIcons';

export interface ListViewProps {
  apiDocs: ReadonlyArray<Readonly<APIConfiguration>>;
  apiLabels?: ReadonlyArray<Readonly<APILabel>>;
  clear: any;
}

export const ListView: FunctionComponent<ListViewProps> = ({apiDocs, clear}) => {
  const navigate = useNavigate();
    return <div>
    { apiDocs.length > 0 ?
      <Gallery minWidths={{default: '900px'}} hasGutter>
        { apiDocs.map(apiConfig => (
          <GalleryItem key={apiConfig.displayName}>
            <ListItem displayName={apiConfig.displayName} icon={apiConfig.icon ?? APIConfigurationIcons.GenericIcon} description={apiConfig.description} onClick={() => navigate(`/api/${apiConfig.id}`)} />
          </GalleryItem>
        ))}
      </Gallery> :
      <NoMatchFound clearFilters={clear} /> }
    </div>
};
