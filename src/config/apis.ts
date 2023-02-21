// Auto generated file, do not modify directly.
// See api-documentation-frontend/transform for more info on how to generate this file.

import { OpenAPIV3 } from "openapi-types";

import APIConfigurationIcons from "./APIConfigurationIcons";

export interface APIConfiguration {
  id: string;
  displayName: string;
  icon: keyof typeof APIConfigurationIcons;
  description: string;
  getApi: () => Promise<OpenAPIV3.Document>;
  labels: Array<APILabel>;
}

export interface APILabel {
  id: string;
  name: string;
  type: "use-case" | "service" | "platform";
}

export const apiConfigurations: Array<APIConfiguration> = [
  {
    id: "insights",
    displayName: "Advisor",
    description: "The API of the Advisor project in Insights",
    icon: "InsightsIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/insights/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
      {
        id: "insights",
        name: "Insights",
        type: "service",
      },
      {
        id: "observe",
        name: "Observe",
        type: "use-case",
      },
    ],
  },
  {
    id: "automation-hub",
    displayName: "Automation Hub",
    description: "Fetch, Upload, Organize, and Distribute Ansible Collections",
    icon: "AnsibleIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/automation-hub/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "automation",
        name: "Automation",
        type: "use-case",
      },
    ],
  },
  {
    id: "cost-management",
    displayName: "Cost Management",
    description:
      "The API for Project Koku and OpenShift cost management. You can find out more about Project Koku at https://github.com/project-koku",
    icon: "OpenShiftIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/cost-management/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "spend-management",
        name: "Spend Management",
        type: "use-case",
      },
    ],
  },
  {
    id: "drift",
    displayName: "Drift Backend Service",
    description: "Service that returns differences between systems.",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/drift/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "ansible",
        name: "Ansible",
        type: "service",
      },
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
      {
        id: "observe",
        name: "Observe",
        type: "use-case",
      },
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
    ],
  },
  {
    id: "system-baseline",
    displayName: "Drift Baseline",
    description: "Service that returns system baselines",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/system-baseline/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "ansible",
        name: "Ansible",
        type: "service",
      },
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
      {
        id: "observe",
        name: "Observe",
        type: "use-case",
      },
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
    ],
  },
  {
    id: "historical-system-profiles",
    displayName: "Drift Historical Systems Profile Service ",
    description: "Service that returns system baselines",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/historical-system-profiles/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "ansible",
        name: "Ansible",
        type: "service",
      },
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
      {
        id: "observe",
        name: "Observe",
        type: "use-case",
      },
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
    ],
  },
  {
    id: "image-builder",
    displayName: "Image Builder",
    description: "Service that relays image build requests",
    icon: "InsightsIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/image-builder/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "deploy",
        name: "Deploy",
        type: "use-case",
      },
    ],
  },
  {
    id: "integrations",
    displayName: "Integrations",
    description: "The API for Integrations",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/integrations/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "integrations-and-notifications",
        name: "Integrations and Notifications",
        type: "use-case",
      },
    ],
  },
  {
    id: "inventory",
    displayName: "Managed Inventory",
    description:
      "REST interface for the Insights Platform Host Inventory application",
    icon: "InsightsIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/inventory/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "inventories",
        name: "Inventories",
        type: "service",
      },
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
      {
        id: "insights",
        name: "Insights",
        type: "service",
      },
    ],
  },
  {
    id: "notifications",
    displayName: "Notifications",
    description: "The API for Notifications",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/notifications/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "integrations-and-notifications",
        name: "Integrations and Notifications",
        type: "use-case",
      },
    ],
  },
  {
    id: "gathering",
    displayName: "Operator Gathering Conditions Service",
    description: "Gathering Conditions Services to Insights Operator",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/gathering/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "infrastructure",
        name: "Infrastructure",
        type: "use-case",
      },
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
    ],
  },
  {
    id: "insights-results-aggregator",
    displayName: "Results Aggregator",
    description:
      "Aggregation service for the results of running Insights rules",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/insights-results-aggregator/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "infrastructure",
        name: "Infrastructure",
        type: "use-case",
      },
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
    ],
  },
  {
    id: "patch",
    displayName: "Patch",
    description: "API of the Patch application on console.redhat.com",
    icon: "InsightsIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/patch/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "security",
        name: "Security",
        type: "use-case",
      },
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
      {
        id: "observe",
        name: "Observe",
        type: "use-case",
      },
    ],
  },
  {
    id: "playbook-dispatcher",
    displayName: "Playbook Dispatcher",
    description:
      "Playbook Dispatcher is a service for running Ansible Playbooks on hosts connected via Cloud Connector",
    icon: "AnsibleIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/playbook-dispatcher/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "insights",
        name: "Insights",
        type: "service",
      },
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
    ],
  },
  {
    id: "policies",
    displayName: "Policies",
    description: "The API for Policies",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/policies/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "ansible",
        name: "Ansible",
        type: "service",
      },
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
      {
        id: "observe",
        name: "Observe",
        type: "use-case",
      },
    ],
  },
  {
    id: "remediations",
    displayName: "Remediations",
    description: "Insights Remediations Service",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/remediations/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "automation",
        name: "Automation",
        type: "use-case",
      },
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
      {
        id: "observe",
        name: "Observe",
        type: "use-case",
      },
      {
        id: "security",
        name: "Security",
        type: "use-case",
      },
      {
        id: "ansible",
        name: "Ansible",
        type: "service",
      },
    ],
  },
  {
    id: "ros",
    displayName: "Resource Optimization",
    description: "Flask Backend API for Resource Optimization Service",
    icon: "InsightsIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/ros/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "observe",
        name: "Observe",
        type: "use-case",
      },
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
    ],
  },
  {
    id: "edge",
    displayName: "RHEL for Edge",
    description: "RHEL for Edge API",
    icon: "EdgeIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/edge/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "edge",
        name: "Edge",
        type: "service",
      },
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
    ],
  },
  {
    id: "rbac",
    displayName: "Role-based Access Control",
    description: "The API for Role Based Access Control",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/rbac/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "identify-and-access-management",
        name: "Identify and Access Management",
        type: "use-case",
      },
    ],
  },
  {
    id: "sources",
    displayName: "Sources",
    description: "Sources API",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/sources/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "identify-and-access-management",
        name: "Identify and Access Management",
        type: "use-case",
      },
    ],
  },
  {
    id: "rhsm-subscriptions",
    displayName: "Subscriptions",
    description:
      "REST interface for the rhsm-subscriptions service. Please note any deprecated APIs. Our current deprecation policy is to keep deprecated APIs around for at least 6 months",
    icon: "SubscriptionsIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/rhsm-subscriptions/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "inventories",
        name: "Inventories",
        type: "service",
      },
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
      {
        id: "edge",
        name: "Edge",
        type: "service",
      },
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
    ],
  },
  {
    id: "vulnerability",
    displayName: "Vulnerability Management",
    description: "Vulnerability API",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/hcc-insights/vulnerability/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "observe",
        name: "Observe",
        type: "use-case",
      },
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
      {
        id: "security",
        name: "Security",
        type: "use-case",
      },
      {
        id: "rhel",
        name: "RHEL",
        type: "platform",
      },
    ],
  },
  {
    id: "accounts-management-service",
    displayName: "Account Management Service",
    description: "Manage user subscriptions and clusters",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/accounts-management-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
      {
        id: "infrastructure",
        name: "Infrastructure",
        type: "use-case",
      },
    ],
  },
  {
    id: "authorization-service",
    displayName: "Authorization Service",
    description: "Enables access control on resources of OCM services",
    icon: "OpenShiftIcon",
    getApi: () =>
      import(
        "./apis/openshift/authorization-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
      {
        id: "infrastructure",
        name: "Infrastructure",
        type: "use-case",
      },
    ],
  },
  {
    id: "connector-management",
    displayName: "Connector Management",
    description: "Connector Management API is a REST API to manage connectors.",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/connector-management/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
      {
        id: "infrastructure",
        name: "Infrastructure",
        type: "use-case",
      },
    ],
  },
  {
    id: "kafka-service-fleet-manager-service",
    displayName: "Kafka Service Fleet Manager Service",
    description: "Kafka Management API is a REST API to manage Kafka instances",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/kafka-service-fleet-manager-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
      {
        id: "infrastructure",
        name: "Infrastructure",
        type: "use-case",
      },
    ],
  },
  {
    id: "rhacs-service-fleet-manager",
    displayName: "RHACS Service Fleet Manager",
    description:
      "Red Hat Advanced Cluster Security (RHACS) Service Fleet Manager is a Rest API to manage instances of ACS components.",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/rhacs-service-fleet-manager/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
      {
        id: "infrastructure",
        name: "Infrastructure",
        type: "use-case",
      },
    ],
  },
  {
    id: "service-logs",
    displayName: "Service Logs",
    description:
      "Receives and maintains logs from internal sources related to OpenShift clusters.",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/service-logs/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
      {
        id: "infrastructure",
        name: "Infrastructure",
        type: "use-case",
      },
    ],
  },
  {
    id: "service-registry-management",
    displayName: "Service Registry Management",
    description:
      "Service Registry Management API is a REST API for managing Service Registry instances. Service Registry is a datastore for event schemas and API designs, which is based on the open source Apicurio Registry project",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/service-registry-management/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
      {
        id: "infrastructure",
        name: "Infrastructure",
        type: "use-case",
      },
    ],
  },
  {
    id: "upgrades-information-service",
    displayName: "Upgrades Information Service",
    description: "Upgrades Information Service API",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/upgrades-information-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
      {
        id: "infrastructure",
        name: "Infrastructure",
        type: "use-case",
      },
    ],
  },
  {
    id: "web-rca-service",
    displayName: "Web-RCA Service",
    description: "Web-RCA Service API",
    icon: "GenericIcon",
    getApi: () =>
      import(
        "./apis/openshift/web-rca-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    labels: [
      {
        id: "openshift",
        name: "Openshift",
        type: "platform",
      },
      {
        id: "infrastructure",
        name: "Infrastructure",
        type: "use-case",
      },
    ],
  },
];
