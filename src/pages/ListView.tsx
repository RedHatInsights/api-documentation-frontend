import {Fragment, FunctionComponent} from "react";
import {Button, Flex, FlexItem} from "@patternfly/react-core";
import {Tr, Td} from '@patternfly/react-table';
import {APIConfiguration, pages} from "@apidocs/common";
import {useNavigate} from "react-router";
import {Tag, Tags} from "../components/Tags";

interface ListViewProps {
    elements: ReadonlyArray<APIConfiguration>;
    isHidden?: boolean
}

export const ListView: FunctionComponent<ListViewProps> = ({elements}) => {
  const navigate = useNavigate();
  return (
      <Fragment>
        { elements.map(apiConfig => (
            <Tr key={apiConfig.id}>
                <Td modifier="fitContent">
                  <Flex>
                    <FlexItem >
                      <Button isInline variant="link" onClick={() => navigate(pages.getApiPage(apiConfig.id))}>
                        {apiConfig.displayName}
                      </Button>
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
