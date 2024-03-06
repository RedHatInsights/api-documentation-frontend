"use strict";(self.webpackChunkapidocs=self.webpackChunkapidocs||[]).push([[1292],{81292:function(e){e.exports=JSON.parse('{"extras":{},"openapi":{"components":{"schemas":{"Hit":{"properties":{"hostGroup":{"example":"prod","type":"string"},"hostId":{"example":"00000000-0000-0000-0000-000000000000","type":"string"},"hostName":{"example":"system1.example.com","type":"string"},"ruleName":{"example":"XFTI_Linux_Generic_Backdoor","type":"string"},"scanDate":{"example":"2020-01-01T00:00:00+00:00","format":"date-time","type":"string"},"source":{"example":"/home/infected_file.exe","type":"string"}},"required":["name","photoUrls"],"type":"object"}}},"info":{"description":"The API of the Malware-Detection project in Insights","title":"Insights Malware-Detection API","version":"1.0.0"},"openapi":"3.0.3","paths":{"/hits":{"get":{"description":"A flat list of malware detection hits.","operationId":"getHits","parameters":[{"description":"Specifies which data elemnt that data is sorted by","in":"query","name":"sort","required":false,"schema":{"default":"host_name","enum":["host_id","host_name","host_group","rule_name","scan_date","source"],"type":"string"}},{"description":"Sort in the ascending or decending order","in":"query","name":"sort_dir","required":false,"schema":{"default":"host_name","enum":["asc","desc"],"type":"string"}},{"description":"Limit of the page size","in":"query","name":"limit","required":false,"schema":{"default":10,"maximum":1000,"minimum":1,"type":"integer"}},{"description":"Offset of the pagination","in":"query","name":"offset","required":false,"schema":{"default":0,"minimum":0,"type":"integer"}},{"description":"Filter by host group name.","in":"query","name":"group_name","required":false,"schema":{"maxLength":50,"type":"string"}},{"description":"Filter by rule signature name.","in":"query","name":"rule_name","required":false,"schema":{"maxLength":50,"type":"string"}},{"description":"Filter by host name.","in":"query","name":"host_name","required":false,"schema":{"maxLength":10050,"type":"string"}}],"responses":{"200":{"content":{"application/json":{"schema":{"properties":{"data":{"items":{"properties":{"hostGroup":{"example":"prod","type":"string"},"hostId":{"example":"00000000-0000-0000-0000-000000000000","type":"string"},"hostName":{"example":"system1.example.com","type":"string"},"ruleName":{"example":"XFTI_Linux_Generic_Backdoor","type":"string"},"scanDate":{"example":"2020-01-01T00:00:00+00:00","format":"date-time","type":"string"},"source":{"example":"/home/infected_file.exe","type":"string"}},"required":["name","photoUrls"],"type":"object"},"type":"array"},"meta":{"properties":{"count":{"example":1,"type":"integer"}},"type":"object"}},"type":"object"}}},"description":"successful operation"},"400":{"description":"Invalid query parameter"}},"summary":"Returns all malware detection hits"}}},"servers":[{"url":"https://console.redhat.com/api/malware-detection/v1"}]}}')}}]);