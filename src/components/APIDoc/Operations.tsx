import {FunctionComponent, PropsWithChildren} from "react";
import {Accordion} from "@patternfly/react-core";

export const Operations: FunctionComponent<PropsWithChildren> = ({children}) => {
    return <Accordion className="apid-operations" isBordered>
        {children}
    </Accordion>;
}
