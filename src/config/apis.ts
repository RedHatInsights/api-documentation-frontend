import {OpenAPIV3} from "openapi-types";
import RbacOpenApi from "../resources/api/rbac/openapi_v1.json";
import SystemBaselineApi from "../resources/api/system-baseline/openapi_v1.json";
import EdgeApi from "../resources/api/edge/openapi.json";
import OcmApi from "../resources/api/ocm/openapi_v1.json";
import RhsmSubscriptionsApi from "../resources/api/rhsm-subscriptions/openapi.json";
import SourcesApi from "../resources/api/sources/openapi.json";
import TaskApi from "../resources/api/tasks/openapi.json";
import Vulnerability from "../resources/api/vulnerability/openapi.json";
import RosApi from "../resources/api/ros/openapi.json";
import ConfigManagerApi from "../resources/api/config-manager/openapi.json";
import PoliciesApi from "../resources/api/policies/openapi.json";
import PatchApi from "../resources/api/patch/openapi.json";
import PlaybookDispatcherApi from "../resources/api/playbook-dispatcher/openapi.json";
import NotificationsApi from "../resources/api/notifications/openapi.json";
import InventoryApi from "../resources/api/inventory/openapi.json";
import MalwareDetectionApi from "../resources/api/malware-detection/openapi.json";
import IntegrationsApi from "../resources/api/integrations/openapi.json";
import ImageBuilderApi from "../resources/api/image-builder/openapi.json";
import CostManagementApi from "../resources/api/cost-management/openapi.json";
import ComplianceApi from "../resources/api/compliance/openapi.json";
import AutomationHub from "../resources/api/automation-hub/openapi.json";
import InsightsApi from "../resources/api/insights/openapi.json";

export interface APIConfiguration {
    displayName: string;
    api: OpenAPIV3.Document;
}

export const apiConfigurations: Array<APIConfiguration> = [
    {
        displayName: 'RBAC',
        api: RbacOpenApi as OpenAPIV3.Document
    },
    {
        displayName: 'System - Baseline',
        api: SystemBaselineApi as OpenAPIV3.Document
    },
    {
        displayName: 'Edge',
        api: EdgeApi as OpenAPIV3.Document
    },
    {
        displayName: 'OCM',
        api: OcmApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Subscriptions',
        api: RhsmSubscriptionsApi as OpenAPIV3.Document
    },
    {
        displayName: 'Sources',
        api: SourcesApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Tasks',
        api: TaskApi as OpenAPIV3.Document
    },
    {
        displayName: 'Vulnerability',
        api: Vulnerability as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'ROS',
        api: RosApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Config Manager',
        api: ConfigManagerApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Policies',
        api: PoliciesApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Patch',
        api: PatchApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Playbook Dispatcher',
        api: PlaybookDispatcherApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Notifications',
        api: NotificationsApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Inventory',
        api: InventoryApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Malware Detection',
        api: MalwareDetectionApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Integrations',
        api: IntegrationsApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Image Builder',
        api: ImageBuilderApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Cost Management',
        api: CostManagementApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Compliance',
        api: ComplianceApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Automation Hub',
        api: AutomationHub as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Insights',
        api: InsightsApi as unknown as OpenAPIV3.Document
    }
];

