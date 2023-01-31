

const go = `package main

import (
        "bytes"
        "net/http"
)

func main() {
{{?data.allHeaders.length}}
    headers := map[string][]string{
        {{~data.allHeaders :p:index}}"{{=p.name}}": []string{"{{=p.exampleValues.json}}"},{{?index < data.allHeaders.length-1}}
        {{?}}{{~}}
    }{{?}}

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("{{=data.methodUpper}}", "{{=data.url}}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}
`

const java = `URL obj = new URL("{{=data.url}}{{=data.requiredQueryString}}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("{{=data.methodUpper}}");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
`

const node = `const fetch = require('node-fetch');
{{?data.bodyParameter.present}}const inputBody = {{=data.bodyParameter.exampleValues.json}};{{?}}
{{?data.allHeaders.length}}const headers = {
{{~data.allHeaders :p:index}}  '{{=p.name}}':{{=p.exampleValues.json}}{{?index < data.allHeaders.length-1}},{{?}}
{{~}}};
{{?}}
fetch('{{=data.url}}{{=data.requiredQueryString}}',
{
  method: '{{=data.methodUpper}}'{{?data.bodyParameter.present || data.allHeaders.length}},{{?}}
{{?data.bodyParameter.present}}  body: JSON.stringify(inputBody){{?}}{{? data.bodyParameter.present && data.allHeaders.length}},{{?}}
{{?data.allHeaders.length}}  headers: headers{{?}}
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
`

const curl = `# You can also use wget
curl -X {{=data.methodUpper}} {{=data.url}}{{=data.requiredQueryString}}{{?data.allHeaders.length}} \{{?}}
{{~data.allHeaders :p:index}}  -H '{{=p.name}}: {{=p.exampleValues.json}}'{{?index < data.allHeaders.length-1}} \{{?}}
{{~}}
`

const python = `import requests
{{?data.allHeaders.length}}headers = {
{{~data.allHeaders :p:index}}  '{{=p.name}}': {{=p.exampleValues.json}}{{?index < data.allHeaders.length-1}},{{?}}
{{~}}}
{{?}}
r = requests.{{=data.method.verb}}('{{=data.url}}'{{? data.requiredParameters.length}}, params={
{{~ data.requiredParameters :p:index}}  '{{=p.name}}': {{=p.exampleValues.json}}{{? data.requiredParameters.length-1 != index }},{{?}}{{~}}
}{{?}}{{?data.allHeaders.length}}, headers = headers{{?}})

print(r.json())
`

interface TemplatesType {
    [key: string]: string;
}

export const templates: TemplatesType = {
    go: go,
    java: java,
    node: node,
    python: python,
    cURL: curl,
}
