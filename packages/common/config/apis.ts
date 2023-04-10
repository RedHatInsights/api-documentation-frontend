// Auto generated file, do not modify directly.
// See api-documentation-frontend/transform for more info on how to generate this file.

import { OpenAPIV3 } from "openapi-types";

import { APIConfigurationIcons } from "./APIConfigurationIcons";

export interface APIConfiguration {
  id: string;
  displayName: string;
  icon: keyof typeof APIConfigurationIcons;
  description: string;
  apiPath: string;
  getApi: () => Promise<OpenAPIV3.Document>;
  tags: ReadonlyArray<Readonly<APILabel>>;
}

export interface DevRedHatTaxonomy {
  topic?: string;
  product?: string;
}

export interface APILabel {
  id: string;
  name: string;
  type: "use-case" | "service" | "platform";
  devRedHatTaxonomy: DevRedHatTaxonomy;
}

export const apiLabelsMap: Record<string, Readonly<APILabel>> = {
  ansible: {
    id: "ansible",
    name: "Ansible",
    type: "platform",
    devRedHatTaxonomy: {
      topic: "Automation",
      product: "Red Hat Ansible Automation Platform",
    },
  },
  automation: {
    id: "automation",
    name: "Automation",
    type: "use-case",
    devRedHatTaxonomy: {
      topic: "Automation",
      product: undefined,
    },
  },
  deploy: {
    id: "deploy",
    name: "Deploy",
    type: "use-case",
    devRedHatTaxonomy: {
      topic: "CI/CD",
      product: undefined,
    },
  },
  edge: {
    id: "edge",
    name: "Edge",
    type: "service",
    devRedHatTaxonomy: {
      topic: "Edge",
      product: undefined,
    },
  },
  infrastructure: {
    id: "infrastructure",
    name: "Infrastructure",
    type: "use-case",
    devRedHatTaxonomy: {
      topic: undefined,
      product: undefined,
    },
  },
  insights: {
    id: "insights",
    name: "Insights",
    type: "service",
    devRedHatTaxonomy: {
      topic: undefined,
      product: undefined,
    },
  },
  "integrations-and-notifications": {
    id: "integrations-and-notifications",
    name: "Integrations and Notifications",
    type: "use-case",
    devRedHatTaxonomy: {
      topic: undefined,
      product: undefined,
    },
  },
  inventories: {
    id: "inventories",
    name: "Inventories",
    type: "service",
    devRedHatTaxonomy: {
      topic: undefined,
      product: undefined,
    },
  },
  "identify-and-access-management": {
    id: "identify-and-access-management",
    name: "Identify and Access Management",
    type: "use-case",
    devRedHatTaxonomy: {
      topic: undefined,
      product: undefined,
    },
  },
  observe: {
    id: "observe",
    name: "Observe",
    type: "use-case",
    devRedHatTaxonomy: {
      topic: undefined,
      product: undefined,
    },
  },
  openshift: {
    id: "openshift",
    name: "OpenShift",
    type: "platform",
    devRedHatTaxonomy: {
      topic: undefined,
      product: undefined,
    },
  },
  rhel: {
    id: "rhel",
    name: "RHEL",
    type: "platform",
    devRedHatTaxonomy: {
      topic: undefined,
      product: "RHEL",
    },
  },
  security: {
    id: "security",
    name: "Security",
    type: "use-case",
    devRedHatTaxonomy: {
      topic: "Security",
      product: undefined,
    },
  },
  "spend-management": {
    id: "spend-management",
    name: "Spend Management",
    type: "use-case",
    devRedHatTaxonomy: {
      topic: undefined,
      product: undefined,
    },
  },
};

export const apiLabels = Object.values(apiLabelsMap) as ReadonlyArray<
  Readonly<APILabel>
>;

export const apiConfigurations: ReadonlyArray<Readonly<APIConfiguration>> = [
  {
    id: "insights",
    displayName: "Advisor",
    description: "The API of the Advisor project in Insights",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/insights/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/insights/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["rhel"],
      apiLabelsMap["insights"],
      apiLabelsMap["observe"],
    ],
  },
  {
    id: "automation-hub",
    displayName: "Automation Hub",
    description: "Fetch, Upload, Organize, and Distribute Ansible Collections",
    icon: "AnsibleIcon",
    apiPath: "./apis/hcc-insights/automation-hub/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/automation-hub/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
        apiLabelsMap["ansible"],
        apiLabelsMap["automation"]
      ],
  },
  {
    id: "cost-management",
    displayName: "Cost Management",
    description: "The API for Project Koku and OpenShift cost management.",
    icon: "OpenShiftIcon",
    apiPath: "./apis/hcc-insights/cost-management/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/cost-management/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["spend-management"]],
  },
  {
    id: "drift",
    displayName: "Drift Backend Service",
    description: "Service that returns differences between systems.",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/drift/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/drift/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
    ],
  },
  {
    id: "system-baseline",
    displayName: "Drift Baseline",
    description: "Service that returns system baselines",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/system-baseline/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/system-baseline/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
    ],
  },
  {
    id: "historical-system-profiles",
    displayName: "Drift Historical Systems Profile Service ",
    description: "Service that returns system baselines",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/historical-system-profiles/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/historical-system-profiles/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
    ],
  },
  {
    id: "image-builder",
    displayName: "Image Builder",
    description: "Service that relays image build requests",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/image-builder/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/image-builder/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["deploy"]],
  },
  {
    id: "integrations",
    displayName: "Integrations",
    description: "The API for Integrations",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/integrations/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/integrations/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["integrations-and-notifications"]],
  },
  {
    id: "inventory",
    displayName: "Managed Inventory",
    description:
      "REST interface for the Insights Platform Host Inventory application",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/inventory/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/inventory/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["inventories"],
      apiLabelsMap["rhel"],
      apiLabelsMap["insights"],
    ],
  },
  {
    id: "notifications",
    displayName: "Notifications",
    description: "The API for Notifications",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/notifications/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/notifications/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["integrations-and-notifications"]],
  },
  {
    id: "gathering",
    displayName: "Operator Gathering Conditions Service",
    description: "Gathering Conditions Services to Insights Operator",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/gathering/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/gathering/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["infrastructure"], apiLabelsMap["openshift"]],
  },
  {
    id: "insights-results-aggregator",
    displayName: "Results Aggregator",
    description:
      "Aggregation service for the results of running Insights rules",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/insights-results-aggregator/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/insights-results-aggregator/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["infrastructure"], apiLabelsMap["openshift"]],
  },
  {
    id: "patch",
    displayName: "Patch",
    description: "API of the Patch application on console.redhat.com",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/patch/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/patch/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["security"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
    ],
  },
  {
    id: "playbook-dispatcher",
    displayName: "Playbook Dispatcher",
    description:
      "Service for running Ansible Playbooks on hosts connected via Cloud Connector",
    icon: "AnsibleIcon",
    apiPath: "./apis/hcc-insights/playbook-dispatcher/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/playbook-dispatcher/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["insights"], apiLabelsMap["rhel"]],
  },
  {
    id: "policies",
    displayName: "Policies",
    description: "The API for Policies",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/policies/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/policies/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
    ],
  },
  {
    id: "remediations",
    displayName: "Remediations",
    description: "Insights Remediations Service",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/remediations/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/remediations/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["automation"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["security"],
      apiLabelsMap["ansible"],
    ],
  },
  {
    id: "ros",
    displayName: "Resource Optimization",
    description: "Flask Backend API for Resource Optimization Service",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/ros/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/ros/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["observe"], apiLabelsMap["rhel"]],
  },
  {
    id: "edge",
    displayName: "RHEL for Edge",
    description: "RHEL for Edge API",
    icon: "EdgeIcon",
    apiPath: "./apis/hcc-insights/edge/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/edge/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["edge"], apiLabelsMap["rhel"]],
  },
  {
    id: "rbac",
    displayName: "Role-based Access Control",
    description: "The API for Role Based Access Control",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/rbac/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/rbac/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["identify-and-access-management"]],
  },
  {
    id: "sources",
    displayName: "Sources",
    description: "Sources API",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/sources/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/sources/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["identify-and-access-management"]],
  },
  {
    id: "rhsm-subscriptions",
    displayName: "Subscriptions",
    description: "REST interface for the rhsm-subscriptions service.",
    icon: "SubscriptionsIcon",
    apiPath: "./apis/hcc-insights/rhsm-subscriptions/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/rhsm-subscriptions/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["inventories"],
      apiLabelsMap["openshift"],
      apiLabelsMap["edge"],
      apiLabelsMap["rhel"],
    ],
  },
  {
    id: "vulnerability",
    displayName: "Vulnerability Management",
    description: "Vulnerability API",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/vulnerability/openapi.json",
    getApi: () =>
      import(
        "./apis/hcc-insights/vulnerability/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
      apiLabelsMap["security"],
      apiLabelsMap["rhel"],
    ],
  },
  {
    id: "accounts-management-service",
    displayName: "Account Management Service",
    description: "Manage user subscriptions and clusters",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/accounts-management-service/openapi.json",
    getApi: () =>
      import(
        "./apis/openshift/accounts-management-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "authorization-service",
    displayName: "Authorization Service",
    description: "Enables access control on resources of OCM services",
    icon: "OpenShiftIcon",
    apiPath: "./apis/openshift/authorization-service/openapi.json",
    getApi: () =>
      import(
        "./apis/openshift/authorization-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "connector-management",
    displayName: "Connector Management",
    description: "Connector Management API is a REST API to manage connectors.",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/connector-management/openapi.json",
    getApi: () =>
      import(
        "./apis/openshift/connector-management/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "kafka-service-fleet-manager-service",
    displayName: "Kafka Service Fleet Manager Service",
    description: "Kafka Management API is a REST API to manage Kafka instances",
    icon: "GenericIcon",
    apiPath:
      "./apis/openshift/kafka-service-fleet-manager-service/openapi.json",
    getApi: () =>
      import(
        "./apis/openshift/kafka-service-fleet-manager-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "rhacs-service-fleet-manager",
    displayName: "RHACS Service Fleet Manager",
    description: "Rest API to manage instances of ACS components.",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/rhacs-service-fleet-manager/openapi.json",
    getApi: () =>
      import(
        "./apis/openshift/rhacs-service-fleet-manager/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "service-logs",
    displayName: "Service Logs",
    description:
      "Receives and maintains logs from internal sources related to OpenShift clusters.",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/service-logs/openapi.json",
    getApi: () =>
      import(
        "./apis/openshift/service-logs/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "service-registry-management",
    displayName: "Service Registry Management",
    description:
      "Service Registry Management API is a REST API for managing Service Registry instances.",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/service-registry-management/openapi.json",
    getApi: () =>
      import(
        "./apis/openshift/service-registry-management/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "upgrades-information-service",
    displayName: "Upgrades Information Service",
    description: "Upgrades Information Service API",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/upgrades-information-service/openapi.json",
    getApi: () =>
      import(
        "./apis/openshift/upgrades-information-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "web-rca-service",
    displayName: "Web-RCA Service",
    description: "Web-RCA Service API",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/web-rca-service/openapi.json",
    getApi: () =>
      import(
        "./apis/openshift/web-rca-service/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "case-management",
    displayName: "Case Management API",
    description: "Support Services Case Management API",
    icon: "GenericIcon",
    apiPath: "./apis/access/case-management/openapi.json",
    getApi: () =>
      import(
        "./apis/access/case-management/openapi.json"
      ) as unknown as Promise<OpenAPIV3.Document>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["openshift"],
    ],
  },
];
