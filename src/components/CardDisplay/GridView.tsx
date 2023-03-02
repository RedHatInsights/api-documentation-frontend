import {FunctionComponent} from 'react';
import { Gallery, GalleryItem } from '@patternfly/react-core';
import {Card} from "../../components/Card/Card";
import {useNavigate} from "react-router";

import {apiConfigurations, APIConfiguration, apiLabels, APILabel, APIConfigurationIcons, pages} from "@apidocs/common";
import {NoMatchFound} from "../../components/NoMatchFound/NoMatchFound";
import {Tag, Tags} from "../../components/Tags";
export interface GridViewProps {
  filteredDocs: ReadonlyArray<Readonly<APIConfiguration>>;
  apiLabels?: ReadonlyArray<Readonly<APILabel>>;
  clearFilters: any;
}

export const GridView: FunctionComponent<GridViewProps> = ({filteredDocs, apiLabels, clearFilters}) => {
  const navigate = useNavigate();
    return <div>
      { filteredDocs.length > 0 ?
      <Gallery minWidths={{default: '300px'}} hasGutter>
        { filteredDocs.map(apiConfig => (
          <GalleryItem key={apiConfig.displayName}>
            <Card displayName={apiConfig.displayName} icon={apiConfig.icon ?? APIConfigurationIcons.GenericIcon} description={apiConfig.description} onClick={() => navigate(pages.getApiPage(apiConfig.id))} >
              { apiConfig.tags.length > 0 && (
                  <div className="apid-tags__main">
                    <Tags>
                      {apiConfig.tags.map(t => <Tag key={t.id} value={t} />)}
                    </Tags>
                  </div>
              )}
            </Card>
          </GalleryItem>
        ))}
      </Gallery> :
      <NoMatchFound clearFilters={clearFilters} /> }
    </div>
};
