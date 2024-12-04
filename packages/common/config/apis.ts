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
  subscriptions: {
    id: "subscriptions",
    name: "Subscriptions",
    type: "use-case",
    devRedHatTaxonomy: {
      topic: undefined,
      product: undefined,
    },
  },
  workloads: {
    id: "workloads",
    name: "Workloads",
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
    apiContentPath: "./apis/hcc-insights/insights-advisor/content.json",
    serverUrl: "https://console.redhat.com",
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
    id: "ansible-automation-controller",
    displayName: "Ansible automation controller API V1",
    description:
      "Define, operate, scale, and delegate automation across your enterprise",
    icon: "AnsibleIcon",
    apiContentPath:
      "./apis/hcc-insights/ansible-automation-controller/content.json",
    serverUrl: "none",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/ansible-automation-controller/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["ansible"], apiLabelsMap["automation"]],
  },
  {
    id: "automation-hub",
    displayName: "Automation Hub",
    description: "Fetch, upload, organize, and distribute Ansible Collections",
    icon: "AnsibleIcon",
    apiContentPath: "./apis/hcc-insights/automation-hub/content.json",
    serverUrl: "https://console.redhat.com",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/automation-hub/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["ansible"], apiLabelsMap["automation"]],
  },
  {
    id: "compliance_v1",
    displayName: "Compliance V1",
    description:
      "Assess, monitor, and report on the security-policy compliance of RHEL systems",
    icon: "InsightsIcon",
    apiContentPath: "./apis/hcc-insights/compliance_v1/content.json",
    serverUrl: "https://console.redhat.com",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/compliance_v1/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["insights"],
      apiLabelsMap["observe"],
      apiLabelsMap["rhel"],
      apiLabelsMap["security"],
    ],
  },
  {
    id: "compliance_v2",
    displayName: "Compliance V2",
    description:
      "Assess, monitor, and report on the security-policy compliance of RHEL systems",
    icon: "InsightsIcon",
    apiContentPath: "./apis/hcc-insights/compliance_v2/content.json",
    serverUrl: "https://console.redhat.com",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/compliance_v2/content.json"
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
    apiContentPath: "./apis/hcc-insights/cost-management/content.json",
    serverUrl: "https://console.redhat.com",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/cost-management/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["spend-management"], apiLabelsMap["insights"]],
  },
  {
    id: "export-service",
    displayName: "Export Service",
    description:
      "Service to enable users to export data in specific formats (JSON or CSV)",
    icon: "InsightsIcon",
    apiContentPath: "./apis/hcc-insights/export-service/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/image-builder/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/integrations/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/launch/content.json",
    serverUrl: "https://console.redhat.com",
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
    id: "malware-detection",
    displayName: "Malware Detection",
    description: "Service that detects potential malware on your RHEL systems",
    icon: "InsightsIcon",
    apiContentPath: "./apis/hcc-insights/malware-detection/content.json",
    serverUrl: "https://console.redhat.com",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/malware-detection/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["observe"],
      apiLabelsMap["rhel"],
      apiLabelsMap["security"],
    ],
  },
  {
    id: "inventory",
    displayName: "Managed Inventory",
    description:
      "REST interface for the Insights Platform Host Inventory application",
    icon: "InsightsIcon",
    apiContentPath: "./apis/hcc-insights/inventory/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/notifications/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/gathering/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/payload_ingress/content.json",
    serverUrl: "https://console.redhat.com",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/payload_ingress/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["insights"]],
  },
  {
    id: "insights-results-aggregator_v1",
    displayName: "Insights Advisor for OpenShift V1",
    description:
      "Aggregation API for Insights Advisor. Exposes recommendations for single and multiple clusters",
    icon: "GenericIcon",
    apiContentPath:
      "./apis/hcc-insights/insights-results-aggregator_v1/content.json",
    serverUrl: "https://console.redhat.com",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/insights-results-aggregator_v1/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["infrastructure"],
      apiLabelsMap["insights"],
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
      apiLabelsMap["workloads"],
    ],
  },
  {
    id: "insights-results-aggregator_v2",
    displayName: "Insights Advisor for OpenShift V2",
    description:
      "Aggregation API for Insights Advisor. Exposes recommendations for single and multiple clusters",
    icon: "GenericIcon",
    apiContentPath:
      "./apis/hcc-insights/insights-results-aggregator_v2/content.json",
    serverUrl: "https://console.redhat.com",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/insights-results-aggregator_v2/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["infrastructure"],
      apiLabelsMap["insights"],
      apiLabelsMap["observe"],
      apiLabelsMap["openshift"],
      apiLabelsMap["workloads"],
    ],
  },
  {
    id: "patch",
    displayName: "Patch",
    description: "API of the Patch application on console.redhat.com",
    icon: "InsightsIcon",
    apiContentPath: "./apis/hcc-insights/patch/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/playbook-dispatcher/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/policies/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/remediations/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/ros/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/repositories/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/edge/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/rbac/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/hcc-insights/sources/content.json",
    serverUrl: "https://console.redhat.com",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/sources/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [apiLabelsMap["identity-and-access-management"]],
  },
  {
    id: "rhsm-subscriptions-v1",
    displayName: "Subscriptions v1",
    description: "REST interface for the rhsm-subscriptions service, version 1",
    icon: "SubscriptionsIcon",
    apiContentPath: "./apis/hcc-insights/rhsm-subscriptions-v1/content.json",
    serverUrl: "https://console.redhat.com",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/rhsm-subscriptions-v1/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["edge"],
      apiLabelsMap["inventories"],
      apiLabelsMap["openshift"],
      apiLabelsMap["rhel"],
      apiLabelsMap["subscriptions"],
    ],
  },
  {
    id: "rhsm-subscriptions-v2",
    displayName: "Subscriptions v2",
    description: "REST interface for the rhsm-subscriptions service, version 2",
    icon: "SubscriptionsIcon",
    apiContentPath: "./apis/hcc-insights/rhsm-subscriptions-v2/content.json",
    serverUrl: "https://console.redhat.com",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/rhsm-subscriptions-v2/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["edge"],
      apiLabelsMap["inventories"],
      apiLabelsMap["openshift"],
      apiLabelsMap["rhel"],
      apiLabelsMap["subscriptions"],
    ],
  },
  {
    id: "tasks",
    displayName: "Tasks",
    description:
      "API for managing and issuing Red Hat generated tasks on your infrastructure",
    icon: "GenericIcon",
    apiContentPath: "./apis/hcc-insights/tasks/content.json",
    serverUrl: "https://console.redhat.com",
    getApiContent: () =>
      import(
        "./apis/hcc-insights/tasks/content.json"
      ) as unknown as Promise<APIContent>,
    tags: [
      apiLabelsMap["automation"],
      apiLabelsMap["insights"],
      apiLabelsMap["observe"],
      apiLabelsMap["rhel"],
    ],
  },
  {
    id: "vulnerability",
    displayName: "Vulnerability Management",
    description: "Vulnerability API",
    icon: "GenericIcon",
    apiContentPath: "./apis/hcc-insights/vulnerability/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/openshift/accounts-management-service/content.json",
    serverUrl: "https://api.openshift.com",
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
    apiContentPath: "./apis/openshift/assisted-install-service/content.json",
    serverUrl: "https://api.openshift.com",
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
    apiContentPath: "./apis/openshift/authorization-service/content.json",
    serverUrl: "https://api.openshift.com",
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
    apiContentPath: "./apis/openshift/connector-management/content.json",
    serverUrl: "https://api.openshift.com",
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
    apiContentPath:
      "./apis/openshift/kafka-service-fleet-manager-service/content.json",
    serverUrl: "https://api.openshift.com",
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
    apiContentPath: "./apis/openshift/rhacs-service-fleet-manager/content.json",
    serverUrl: "https://api.openshift.com",
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
    apiContentPath: "./apis/openshift/service-logs/content.json",
    serverUrl: "https://api.openshift.com",
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
    apiContentPath: "./apis/openshift/service-registry-management/content.json",
    serverUrl: "https://api.openshift.com",
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
    apiContentPath:
      "./apis/openshift/upgrades-information-service/content.json",
    serverUrl: "https://api.openshift.com",
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
    apiContentPath: "./apis/openshift/ocp-vulnerability/content.json",
    serverUrl: "https://console.redhat.com",
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
    apiContentPath: "./apis/openshift/web-rca-service/content.json",
    serverUrl: "https://api.openshift.com",
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
    apiContentPath: "./apis/access/case-management/content.json",
    serverUrl: "https://access.redhat.com",
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
