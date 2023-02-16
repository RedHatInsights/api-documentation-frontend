import React from 'react';
import { Checkbox, Text, TextContent, TextVariants } from '@patternfly/react-core';

export const CheckboxControlled: React.FunctionComponent = () => {
  return (
    <TextContent>
      <Text component={TextVariants.p} className="pf-u-mb-sm">Use Case</Text>
      <Checkbox name="access-control" label="access control" id="checkbox-access-control"></Checkbox>
      <Checkbox name="compliance" label="compliance" id="checkbox-compliance"></Checkbox>
      <Checkbox name="monitoring spend" label="monitoring-spend" id="checkbox-monitoring-spend"></Checkbox>
      <Checkbox name="security" label="security" id="checkbox-security"></Checkbox>
      <Text component={TextVariants.p} className="pf-u-mt-md pf-u-mb-sm">Saas Services</Text>
      <Checkbox name="insights" label="insights" id="checkbox-insights"></Checkbox>
      <Checkbox name="rhel-edge" label="RHEL Edge" id="checkbox-rhel-edge"></Checkbox>
      <Checkbox name="ansible-automation-platform" label="Ansible Automation Platform"id="checkbox-ansible-automation-platform"></Checkbox>
      <Checkbox name="openShift" label="OpenShift" id="checkbox-OpenShift"></Checkbox>
      <Checkbox name="application-services" label="Application Services" id="checkbox-application-services"></Checkbox>
      <Text component={TextVariants.p} className="pf-u-mt-md pf-u-mb-sm">Supporting Red Hat Platform</Text>
      <Checkbox name="openShift" label="OpenShift" id="checkbox-OpenShift"></Checkbox>
      <Checkbox name="rhel" label="RHEL" id="checkbox-rhel"></Checkbox>
      <Checkbox name="ansible-automation" label="Ansible Automation" id="checkbox-ansible-automation"></Checkbox>
    </TextContent>
  );
};
