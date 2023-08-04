// Auto generated file, do not modify directly.
// See api-documentation-frontend/transform for more info on how to generate this file.

import { OpenAPIV3 } from "openapi-types";

import { APIConfiguration, APIContent, APILabel } from "../types";

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
  "identity-and-access-management": {
    id: "identity-and-access-management",
    name: "Identity and Access Management",
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
    id: "insights-advisor",
    displayName: "Advisor",
    description: "The API of the Advisor project in Insights",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/insights-advisor/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/insights-advisor/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["rhel"],
      apiLabelsMap["insights"],
      apiLabelsMap["observe"],
    ],
  },
  {
    id: "automation-hub",
    displayName: "Automation Hub",
    description: "Fetch, upload, organize, and distribute Ansible Collections",
    icon: "AnsibleIcon",
    apiPath: "./apis/hcc-insights/automation-hub/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/automation-hub/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["ansible"], apiLabelsMap["automation"]],
  },
  {
    id: "compliance",
    displayName: "Compliance",
    description:
      "Assess, monitor, and report on the security-policy compliance of RHEL systems",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/compliance/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/compliance/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["insights"],
      apiLabelsMap["observe"],
      apiLabelsMap["rhel"],
      apiLabelsMap["security"],
    ],
  },
  {
    id: "cost-management",
    displayName: "Cost Management",
    description: "The API for Project Koku and OpenShift cost management",
    icon: "OpenShiftIcon",
    apiPath: "./apis/hcc-insights/cost-management/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/cost-management/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["spend-management"], apiLabelsMap["insights"]],
  },
  {
    id: "drift",
    displayName: "Drift Backend Service",
    description: "Service that returns differences between systems",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/drift/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/drift/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
      apiLabelsMap["insights"],
    ],
  },
  {
    id: "system-baseline",
    displayName: "Drift Baseline",
    description: "Service that returns system baselines",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/system-baseline/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/system-baseline/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
      apiLabelsMap["insights"],
    ],
  },
  {
    id: "historical-system-profiles",
    displayName: "Drift Historical Systems Profile Service ",
    description: "Service that returns system baselines",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/historical-system-profiles/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/historical-system-profiles/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
      apiLabelsMap["insights"],
    ],
  },
  {
    id: "export-service",
    displayName: "Export Service",
    description:
      "Service to enable users to export data in specific formats (JSON or CSV)",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/export-service/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/export-service/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["insights"]],
  },
  {
    id: "image-builder",
    displayName: "Image Builder",
    description: "Service that relays image build requests",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/image-builder/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/image-builder/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["deploy"], apiLabelsMap["insights"]],
  },
  {
    id: "integrations",
    displayName: "Integrations",
    description: "The API for Integrations",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/integrations/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/integrations/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["integrations-and-notifications"]],
  },
  {
    id: "launch",
    displayName: "Launch",
    description:
      "Use predefined Integrations with cloud providers to Launch Image builder images into hyperscalers",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/launch/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/launch/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["deploy"],
      apiLabelsMap["insights"],
      apiLabelsMap["rhel"],
    ],
  },
  {
    id: "inventory",
    displayName: "Managed Inventory",
    description:
      "REST interface for the Insights Platform Host Inventory application",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/inventory/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/inventory/content.json"
      ) as unknown as Promise<APIContent>,
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
    getApiContent: () =>
      import(
        "./apis/hcc-insights/notifications/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["integrations-and-notifications"]],
  },
  {
    id: "gathering",
    displayName: "Operator Gathering Conditions Service",
    description: "Gathering Conditions Services to Insights Operator",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/gathering/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/gathering/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["infrastructure"], apiLabelsMap["openshift"]],
  },
  {
    id: "payload_ingress",
    displayName: "Payload Ingress Service",
    description: "console.redhat.com Payload Ingress Service",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/payload_ingress/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/payload_ingress/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["insights"]],
  },
  {
    id: "insights-results-aggregator_v1",
    displayName: "Results Aggregator V1",
    description:
      "Aggregation service for the results of running Insights rules",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/insights-results-aggregator_v1/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/insights-results-aggregator_v1/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["infrastructure"],
      apiLabelsMap["openshift"],
      apiLabelsMap["insights"],
    ],
  },
  {
    id: "insights-results-aggregator_v2",
    displayName: "Results Aggregator V2",
    description:
      "Aggregation service for the results of running Insights rules",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/insights-results-aggregator_v2/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/insights-results-aggregator_v2/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["infrastructure"],
      apiLabelsMap["openshift"],
      apiLabelsMap["insights"],
    ],
  },
  {
    id: "patch",
    displayName: "Patch",
    description: "API of the Patch application on console.redhat.com",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/patch/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/patch/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["security"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["insights"],
    ],
  },
  {
    id: "playbook-dispatcher",
    displayName: "Playbook Dispatcher",
    description:
      "Service for running Ansible Playbooks on hosts connected via Cloud Connector",
    icon: "AnsibleIcon",
    apiPath: "./apis/hcc-insights/playbook-dispatcher/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/playbook-dispatcher/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["insights"], apiLabelsMap["rhel"]],
  },
  {
    id: "policies",
    displayName: "Policies",
    description: "The API for Policies",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/policies/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/policies/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["insights"],
    ],
  },
  {
    id: "remediations",
    displayName: "Remediations",
    description: "Insights Remediations Service",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/remediations/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/remediations/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["automation"],
      apiLabelsMap["rhel"],
      apiLabelsMap["observe"],
      apiLabelsMap["security"],
      apiLabelsMap["ansible"],
      apiLabelsMap["insights"],
    ],
  },
  {
    id: "ros",
    displayName: "Resource Optimization",
    description: "Flask Backend API for Resource Optimization Service",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/ros/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/ros/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["observe"],
      apiLabelsMap["rhel"],
      apiLabelsMap["insights"],
    ],
  },
  {
    id: "repositories",
    displayName: "Repositories",
    description: "Manage sources of content to use within console.redhat.com",
    icon: "InsightsIcon",
    apiPath: "./apis/hcc-insights/repositories/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/repositories/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["deploy"],
      apiLabelsMap["insights"],
      apiLabelsMap["rhel"],
    ],
  },
  {
    id: "edge",
    displayName: "RHEL for Edge",
    description: "RHEL for Edge API",
    icon: "EdgeIcon",
    apiPath: "./apis/hcc-insights/edge/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/edge/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["edge"], apiLabelsMap["rhel"]],
  },
  {
    id: "rbac",
    displayName: "Role-based Access Control",
    description: "The API for Role Based Access Control",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/rbac/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/rbac/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["identity-and-access-management"]],
  },
  {
    id: "sources",
    displayName: "Sources",
    description: "Sources API",
    icon: "GenericIcon",
    apiPath: "./apis/hcc-insights/sources/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/sources/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["identity-and-access-management"]],
  },
  {
    id: "rhsm-subscriptions",
    displayName: "Subscriptions",
    description: "REST interface for the rhsm-subscriptions service",
    icon: "SubscriptionsIcon",
    apiPath: "./apis/hcc-insights/rhsm-subscriptions/openapi.json",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/rhsm-subscriptions/content.json"
      ) as unknown as Promise<APIContent>,
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
    getApiContent: () =>
      import(
        "./apis/hcc-insights/vulnerability/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["observe"],
      apiLabelsMap["security"],
      apiLabelsMap["rhel"],
      apiLabelsMap["insights"],
    ],
  },
  {
    id: "accounts-management-service",
    displayName: "Account Management Service",
    description: "Manage user subscriptions and clusters",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/accounts-management-service/openapi.json",
    getApiContent: () =>
      import(
        "./apis/openshift/accounts-management-service/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "assisted-install-service",
    displayName: "Assisted-Install Service",
    description: "Assisted installation",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/assisted-install-service/openapi.json",
    getApiContent: () =>
      import(
        "./apis/openshift/assisted-install-service/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "authorization-service",
    displayName: "Authorization Service",
    description: "Enables access control on resources of OCM services",
    icon: "OpenShiftIcon",
    apiPath: "./apis/openshift/authorization-service/openapi.json",
    getApiContent: () =>
      import(
        "./apis/openshift/authorization-service/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "connector-management",
    displayName: "Connector Management",
    description: "Connector Management API is a REST API to manage connectors",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/connector-management/openapi.json",
    getApiContent: () =>
      import(
        "./apis/openshift/connector-management/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "kafka-service-fleet-manager-service",
    displayName: "Kafka Service Fleet Manager Service",
    description: "Kafka Management API is a REST API to manage Kafka instances",
    icon: "GenericIcon",
    apiPath:
      "./apis/openshift/kafka-service-fleet-manager-service/openapi.json",
    getApiContent: () =>
      import(
        "./apis/openshift/kafka-service-fleet-manager-service/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "rhacs-service-fleet-manager",
    displayName: "RHACS Service Fleet Manager",
    description: "Rest API to manage instances of ACS components",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/rhacs-service-fleet-manager/openapi.json",
    getApiContent: () =>
      import(
        "./apis/openshift/rhacs-service-fleet-manager/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "service-logs",
    displayName: "Service Logs",
    description:
      "Receives and maintains logs from internal sources related to OpenShift clusters",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/service-logs/openapi.json",
    getApiContent: () =>
      import(
        "./apis/openshift/service-logs/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "service-registry-management",
    displayName: "Service Registry Management",
    description:
      "Service Registry Management API is a REST API for managing Service Registry instances",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/service-registry-management/openapi.json",
    getApiContent: () =>
      import(
        "./apis/openshift/service-registry-management/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "upgrades-information-service",
    displayName: "Upgrades Information Service",
    description: "Upgrades Information Service API",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/upgrades-information-service/openapi.json",
    getApiContent: () =>
      import(
        "./apis/openshift/upgrades-information-service/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "ocp-vulnerability",
    displayName: "Vulnerability Dashboard",
    description: "OCP Vulnerability API",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/ocp-vulnerability/openapi.json",
    getApiContent: () =>
      import(
        "./apis/openshift/ocp-vulnerability/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["insights"],
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
      apiLabelsMap["security"],
    ],
  },
  {
    id: "web-rca-service",
    displayName: "Web-RCA Service",
    description: "Web-RCA Service API",
    icon: "GenericIcon",
    apiPath: "./apis/openshift/web-rca-service/openapi.json",
    getApiContent: () =>
      import(
        "./apis/openshift/web-rca-service/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["openshift"], apiLabelsMap["infrastructure"]],
  },
  {
    id: "case-management",
    displayName: "Case Management API",
    description: "Support Services Case Management API",
    icon: "GenericIcon",
    apiPath: "./apis/access/case-management/openapi.json",
    getApiContent: () =>
      import(
        "./apis/access/case-management/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["ansible"],
      apiLabelsMap["rhel"],
      apiLabelsMap["openshift"],
    ],
  },
];
