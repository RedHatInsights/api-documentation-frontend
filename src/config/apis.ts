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
    description: string;
    api: OpenAPIV3.Document;
}

export const apiConfigurations: Array<APIConfiguration> = [
    {
        displayName: 'RBAC',
        description: 'The API for Role Based Access Control.',
        api: RbacOpenApi as OpenAPIV3.Document
    },
    {
        displayName: 'System - Baseline',
        description: 'The Service that returns system baselines.',
        api: SystemBaselineApi as OpenAPIV3.Document
    },
    {
        displayName: 'Edge',
        description: 'The API for Edge',
        api: EdgeApi as OpenAPIV3.Document
    },
    {
        displayName: 'OCM',
        description: 'Receives and maintains logs from internal sources related to OpenShift clusters.',
        api: OcmApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Subscriptions',
        description: 'The REST interface for the rhsm-subscriptions service.',
        api: RhsmSubscriptionsApi as OpenAPIV3.Document
    },
    {
        displayName: 'Sources',
        description: 'The Sources API',
        api: SourcesApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Tasks',
        description: 'The API for managing and issuing Red Hat generated tasks on your infrastructure.',
        api: TaskApi as OpenAPIV3.Document
    },
    {
        displayName: 'Vulnerability',
        description: 'The API for Vulnerability',
        api: Vulnerability as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'ROS',
        description: 'Flask Backend API for Resource Optimization Service.',
        api: RosApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Config Manager',
        description: 'The Config manager service.',
        api: ConfigManagerApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Policies',
        description: 'The API for Policies.',
        api: PoliciesApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Patch',
        description: 'The API of the Patch application.',
        api: PatchApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Playbook Dispatcher',
        description: 'The Playbook Dispatcher is a service for running Ansible Playbooks on hosts connected via Cloud Connector.',
        api: PlaybookDispatcherApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Notifications',
        description: 'The API for Notifcations',
        api: NotificationsApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Inventory',
        description: 'REST interface for the Insights Platform Host Inventory application.',
        api: InventoryApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Malware Detection',
        description: 'The API of the Malware-Detection project in Insights.',
        api: MalwareDetectionApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Integrations',
        description: 'The API for Integrations',
        api: IntegrationsApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Image Builder',
        description: 'The Service that relays image build requests.',
        api: ImageBuilderApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Cost Management',
        description: 'The API for Project Koku and OpenShift cost management.',
        api: CostManagementApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Compliance',
        description: 'The API for Cloud Services for RHEL Compliance.',
        api: ComplianceApi as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Automation Hub',
        description: 'The API for Cloud Services for RHEL Compliance.',
        api: AutomationHub as unknown as OpenAPIV3.Document
    },
    {
        displayName: 'Insights',
        description: 'The API of the Advisor project in Insights.',
        api: InsightsApi as unknown as OpenAPIV3.Document
    }
];

