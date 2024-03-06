"use strict";(self.webpackChunkapidocs=self.webpackChunkapidocs||[]).push([[5271],{85271:function(e){e.exports=JSON.parse('{"extras":{},"openapi":{"components":{"schemas":{"base.Error":{"properties":{"error":{"$ref":"#/components/schemas/base.ErrorDetail"}},"type":"object"},"base.ErrorDetail":{"properties":{"detail":{"type":"string"},"status":{"type":"integer"}},"type":"object"},"clusters.ClusterCveSeverities":{"properties":{"critical":{"type":"integer"},"important":{"type":"integer"},"low":{"type":"integer"},"moderate":{"type":"integer"}},"type":"object"},"clusters.GetClusterCvesResponse":{"properties":{"data":{"items":{"$ref":"#/components/schemas/clusters.GetClusterCvesSelect"},"type":"array"},"meta":{"type":"object"}},"type":"object"},"clusters.GetClusterCvesSelect":{"description":"CVE in cluster data presents in response","properties":{"cvss2_score":{"type":"number"},"cvss3_score":{"type":"number"},"description":{"type":"string"},"exploits":{"type":"boolean"},"publish_date":{"type":"string"},"severity":{"$ref":"#/components/schemas/models.Severity"},"synopsis":{"type":"string"}},"type":"object"},"clusters.GetClusterDetailsResponse":{"properties":{"data":{"$ref":"#/components/schemas/clusters.GetClusterDetailsSelect"},"meta":{"type":"object"}},"type":"object"},"clusters.GetClusterDetailsSelect":{"description":"Cluster details presents in response","properties":{"display_name":{"type":"string"},"id":{"type":"string"},"last_seen":{"type":"string"}},"type":"object"},"clusters.GetClustersResponse":{"properties":{"data":{"items":{"$ref":"#/components/schemas/clusters.GetClustersSelect"},"type":"array"},"meta":{"type":"object"}},"type":"object"},"clusters.GetClustersSelect":{"description":"clusters data","properties":{"cves_severity":{"$ref":"#/components/schemas/clusters.ClusterCveSeverities"},"display_name":{"type":"string"},"id":{"type":"string"},"last_seen":{"type":"string"},"provider":{"type":"string"},"status":{"type":"string"},"type":{"type":"string"},"version":{"type":"string"}},"type":"object"},"cves.GetCveDetailsResponse":{"properties":{"data":{"$ref":"#/components/schemas/cves.GetCveDetailsSelect"},"meta":{"type":"object"}},"type":"object"},"cves.GetCveDetailsSelect":{"description":"CVE details data presents in response","properties":{"cvss2_metrics":{"type":"string"},"cvss2_score":{"type":"number"},"cvss3_metrics":{"type":"string"},"cvss3_score":{"type":"number"},"description":{"type":"string"},"exploits":{"type":"boolean"},"publish_date":{"type":"string"},"redhat_url":{"type":"string"},"severity":{"$ref":"#/components/schemas/models.Severity"},"synopsis":{"type":"string"}},"type":"object"},"cves.GetCvesResponse":{"properties":{"data":{"items":{"$ref":"#/components/schemas/cves.GetCvesSelect"},"type":"array"},"meta":{"type":"object"}},"type":"object"},"cves.GetCvesSelect":{"description":"CVE in workload data presents in response","properties":{"clusters_exposed":{"type":"integer"},"cvss2_score":{"type":"number"},"cvss3_score":{"type":"number"},"description":{"type":"string"},"exploits":{"type":"boolean"},"publish_date":{"type":"string"},"severity":{"$ref":"#/components/schemas/models.Severity"},"synopsis":{"type":"string"}},"type":"object"},"cves.GetExposedClustersCountResponse":{"properties":{"count":{"type":"integer"}},"type":"object"},"cves.GetExposedClustersResponse":{"properties":{"data":{"items":{"$ref":"#/components/schemas/cves.GetExposedClustersSelect"},"type":"array"},"meta":{"type":"object"}},"type":"object"},"cves.GetExposedClustersSelect":{"description":"CVE exposed clusters data presents in response","properties":{"display_name":{"type":"string"},"id":{"type":"string"},"last_seen":{"type":"string"},"provider":{"type":"string"},"status":{"type":"string"},"type":{"type":"string"},"version":{"type":"string"}},"type":"object"},"models.Severity":{"enum":["NotSet","None","Low","Medium","Moderate","Important","High","Critical"],"type":"string","x-enum-varnames":["NotSet","None","Low","Medium","Moderate","Important","High","Critical"]}},"securitySchemes":{"Authorization":{"in":"header","name":"Authorization","type":"apiKey"},"BasicAuth":{"scheme":"basic","type":"http"}}},"info":{"contact":{},"description":"Documentation to the REST API for application\\nVulnerability for Openshift based on console.redhat.com.","title":"Vulnerability for Openshift API documentation","version":"0.29.1"},"openapi":"3.0.1","paths":{"/clusters":{"get":{"description":"Endpoint returning Clusters","operationId":"GetClusters","parameters":[{"description":"column for sort","explode":true,"in":"query","name":"sort","schema":{"items":{"type":"string"},"type":"array"},"style":"form"},{"description":"cluster search","in":"query","name":"search","schema":{"type":"string"}},{"description":"limit per page","in":"query","name":"limit","schema":{"maximum":100,"minimum":0,"type":"integer"}},{"description":"page offset","in":"query","name":"offset","schema":{"minimum":0,"type":"integer"}},{"description":"data section format","in":"query","name":"data_format","schema":{"enum":["json","csv"],"type":"string"}},{"description":"overrides limit and offset to return everything","in":"query","name":"report","schema":{"type":"boolean"}},{"description":"provider of the cluster","explode":true,"in":"query","name":"provider","schema":{"items":{"type":"string"},"type":"array"},"style":"form"},{"description":"status of the cluster","explode":true,"in":"query","name":"status","schema":{"items":{"type":"string"},"type":"array"},"style":"form"},{"description":"version of the cluster","explode":true,"in":"query","name":"version","schema":{"items":{"type":"string"},"type":"array"},"style":"form"},{"description":"array of severity names","explode":true,"in":"query","name":"cluster_severity","schema":{"items":{"enum":["Low","Moderate","Important","Critical"],"type":"string"},"type":"array"},"style":"form"}],"responses":{"200":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/clusters.GetClustersResponse"}}},"description":"OK"},"400":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"Bad Request"},"500":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"Internal Server Error"}},"security":[{"BasicAuth":[],"RhIdentity":[]}],"summary":"List of Clusters","tags":["clusters"]}},"/clusters/{cluster_id}":{"get":{"description":"Endpoint returning details of the given single cluster","operationId":"GetClusterDetails","parameters":[{"description":"cluster ID","in":"path","name":"cluster_id","required":true,"schema":{"type":"string"}}],"responses":{"200":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/clusters.GetClusterDetailsResponse"}}},"description":"OK"},"400":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"Bad Request"},"404":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"cluster does not exist"},"500":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"Internal Server Error"}},"security":[{"BasicAuth":[],"RhIdentity":[]}],"summary":"Cluster details","tags":["clusters"]}},"/clusters/{cluster_id}/cves":{"get":{"description":"Endpoint returning CVEs affecting/nonaffecting the given single cluster","operationId":"GetClusterCves","parameters":[{"description":"cluster ID","in":"path","name":"cluster_id","required":true,"schema":{"type":"string"}},{"description":"column for sort","explode":true,"in":"query","name":"sort","schema":{"items":{"type":"string"},"type":"array"},"style":"form"},{"description":"cve name/desc search","in":"query","name":"search","schema":{"type":"string"}},{"description":"limit per page","in":"query","name":"limit","schema":{"maximum":100,"minimum":0,"type":"integer"}},{"description":"page offset","in":"query","name":"offset","schema":{"minimum":0,"type":"integer"}},{"description":"data section format","in":"query","name":"data_format","schema":{"enum":["json","csv"],"type":"string"}},{"description":"overrides limit and offset to return everything","in":"query","name":"report","schema":{"type":"boolean"}},{"description":"CVE publish date: (from date),(to date)","explode":true,"in":"query","name":"published","schema":{"items":{"type":"string"},"type":"array"},"style":"form"},{"description":"array of severity names","explode":true,"in":"query","name":"severity","schema":{"items":{"enum":["NotSet","None","Low","Medium","Moderate","Important","High","Critical"],"type":"string"},"type":"array"},"style":"form"},{"description":"CVSS score of CVE: (from float),(to float)","explode":true,"in":"query","name":"cvss_score","schema":{"items":{"type":"number"},"type":"array"},"style":"form"},{"description":"boolean for known exploits","in":"query","name":"exploits","schema":{"type":"boolean"}}],"responses":{"200":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/clusters.GetClusterCvesResponse"}}},"description":"OK"},"400":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"Bad Request"},"404":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"cluster does not exist"},"500":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"Internal Server Error"}},"security":[{"BasicAuth":[],"RhIdentity":[]}],"summary":"List of CVEs affecting/nonaffecting single cluster","tags":["clusters"]}},"/cves":{"get":{"description":"Endpoint returning CVEs affecting the current workload","operationId":"GetCves","parameters":[{"description":"column for sort","explode":true,"in":"query","name":"sort","schema":{"items":{"type":"string"},"type":"array"},"style":"form"},{"description":"cve name/desc search","in":"query","name":"search","schema":{"type":"string"}},{"description":"limit per page","in":"query","name":"limit","schema":{"maximum":100,"minimum":0,"type":"integer"}},{"description":"page offset","in":"query","name":"offset","schema":{"minimum":0,"type":"integer"}},{"description":"data section format","in":"query","name":"data_format","schema":{"enum":["json","csv"],"type":"string"}},{"description":"overrides limit and offset to return everything","in":"query","name":"report","schema":{"type":"boolean"}},{"description":"CVE publish date: (from date),(to date)","explode":true,"in":"query","name":"published","schema":{"items":{"type":"string"},"type":"array"},"style":"form"},{"description":"array of severity names","explode":true,"in":"query","name":"severity","schema":{"items":{"enum":["NotSet","None","Low","Medium","Moderate","Important","High","Critical"],"type":"string"},"type":"array"},"style":"form"},{"description":"CVSS score of CVE: (from float),(to float)","explode":true,"in":"query","name":"cvss_score","schema":{"items":{"type":"number"},"type":"array"},"style":"form"},{"description":"checkbox bool array: (1 or more),(0)","explode":true,"in":"query","name":"affected_clusters","schema":{"items":{"type":"boolean"},"type":"array"},"style":"form"},{"description":"boolean for known exploits","in":"query","name":"exploits","schema":{"type":"boolean"}}],"responses":{"200":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/cves.GetCvesResponse"}}},"description":"OK"},"400":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"Bad Request"}},"security":[{"BasicAuth":[],"RhIdentity":[]}],"summary":"List of CVEs affecting the workload","tags":["cves"]}},"/cves/{cve_name}":{"get":{"description":"Endpoint return details for given CVE","operationId":"GetCveDetails","parameters":[{"description":"CVE name","in":"path","name":"cve_name","required":true,"schema":{"type":"string"}}],"responses":{"200":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/cves.GetCveDetailsResponse"}}},"description":"OK"},"404":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"{cve_name} not found"},"500":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"Internal Server Error"}},"security":[{"BasicAuth":[],"RhIdentity":[]}],"summary":"CVE details","tags":["cves"]}},"/cves/{cve_name}/exposed_clusters":{"get":{"description":"Endpoint return exposed clusters for given CVE","operationId":"GetExposedClusters","parameters":[{"description":"CVE name","in":"path","name":"cve_name","required":true,"schema":{"type":"string"}},{"description":"column for sort","explode":true,"in":"query","name":"sort","schema":{"items":{"type":"string"},"type":"array"},"style":"form"},{"description":"cluster search","in":"query","name":"search","schema":{"type":"string"}},{"description":"limit per page","in":"query","name":"limit","schema":{"maximum":100,"minimum":0,"type":"integer"}},{"description":"page offset","in":"query","name":"offset","schema":{"minimum":0,"type":"integer"}},{"description":"data section format","in":"query","name":"data_format","schema":{"enum":["json","csv"],"type":"string"}},{"description":"overrides limit and offset to return everything","in":"query","name":"report","schema":{"type":"boolean"}}],"responses":{"200":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/cves.GetExposedClustersResponse"}}},"description":"OK"},"400":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"Bad Request"},"404":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"{cve_name} not found"},"500":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"Internal Server Error"}},"security":[{"BasicAuth":[],"RhIdentity":[]}],"summary":"List of exposed clusters for CVE","tags":["cves"]}},"/cves/{cve_name}/exposed_clusters_count":{"get":{"description":"Endpoint returns the number of exposed clusters for a given CVE","operationId":"GetExposedClustersCount","parameters":[{"description":"CVE name","in":"path","name":"cve_name","required":true,"schema":{"type":"string"}}],"responses":{"200":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/cves.GetExposedClustersCountResponse"}}},"description":"OK"},"400":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"Bad Request"},"404":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"{cve_name} not found"},"500":{"content":{"application/json":{"schema":{"$ref":"#/components/schemas/base.Error"}}},"description":"Internal Server Error"}},"security":[{"BasicAuth":[],"RhIdentity":[]}],"summary":"Quantity of exposed clusters for a CVE","tags":["cves"]}}},"servers":[{"url":"/api/ocp-vulnerability/v1"}],"x-original-swagger-version":"2.0"}}')}}]);