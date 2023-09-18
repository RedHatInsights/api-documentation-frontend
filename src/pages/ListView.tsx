import {Fragment, FunctionComponent} from "react";
import {Flex, FlexItem} from "@patternfly/react-core";
import {Tr, Td} from '@patternfly/react-table';
import {APIConfiguration, pages} from "@apidocs/common";
import {Tag, Tags} from "../components/Tags";
import {Link} from "react-router-dom";

interface ListViewProps {
    elements: ReadonlyArray<APIConfiguration>;
    isHidden?: boolean
}

export const ListView: FunctionComponent<ListViewProps> = ({elements}) => {
  return (
      <Fragment>
        { elements.map(apiConfig => (
            <Tr key={apiConfig.id}>
                <Td modifier="fitContent">
                  <Flex>
                    <FlexItem >
                      <Link to={pages.getApiPage(apiConfig.id)}>
                        {apiConfig.displayName}
                      </Link>
                    </FlexItem>
                  </Flex>
                </Td>
                <Td modifier="truncate">{apiConfig.description}</Td>
                <Td modifier="truncate">
                    <div className="apid-tags__main">
                      <Tags>
                        {apiConfig.tags.map(t => <Tag key={t.id} value={t} />)}
                      </Tags>
                    </div>
                </Td>
            </Tr>
        ))}
      </Fragment>

    );
}
