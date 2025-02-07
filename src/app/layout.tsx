'use client';
import './App.scss';
import { useState, useEffect } from 'react';

const headerPatch = `
(() => {
  addEventListener("DOMContentLoaded", () => {
    const pfeNavigation = document.getElementById("pfe-navigation");
    if (!pfeNavigation) {
      return;
    }

    const foundForms = [... pfeNavigation.getElementsByTagName("form")]
            .filter(f => f.action.endsWith("/search"));

    if (foundForms.length > 0) {
      const form = foundForms[0];
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'documentKind';
      input.value = 'api_catalog';
      form.appendChild(input);
    }
  });
})();`;

const analyticsInclude = `
      (function () {
        let env = location.origin === "https://developers.redhat.com" ? 'production' : 'staging'
        let scriptSrc;
        switch (env) {
          case "production":
            scriptSrc = "https://www.redhat.com/ma/dpal.js";
            break;
          case "staging":
            scriptSrc = "https://www.redhat.com/ma/dpal-staging.js";
            console.log("Stagin env enabled");
            break;
          default:
            // If the environment isn't production or staging, don't add the scripts
            return;
        }

        const dpalHeader = document.createElement('script');
        dpalHeader.id = 'dpal';
        dpalHeader.type = 'text/javascript';
        dpalHeader.src = scriptSrc;
        document.head.appendChild(dpalHeader);

        const dpalFooter = document.createElement('script');
        dpalFooter.type = 'text/javascript';
        dpalFooter.innerHTML = \`
          if (("undefined" !== typeof _satellite) && ("function" === typeof _satellite.pageBottom)) {
            _satellite.pageBottom();
          }\`;
        document.addEventListener("DOMContentLoaded", () => document.body.appendChild(dpalFooter));
      }());
`;
const pendoInclude = `
      if (location.origin === "https://developers.redhat.com" === true) {
        (function(apiKey){
          (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];

          v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){

          o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);

          y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';

          z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
            pendo.initialize({
              visitor: {
                id: 'VISITOR-UNIQUE-ID'
              },
            });
        })("${process.env.REACT_APP_PENDO_API_KEY}");
      }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [header, setHeader] = useState<string | undefined>();
  const [footer, setFooter] = useState<string | undefined>();
  useEffect(() => {
    const fetchHeader = async () => {
      const headerResponse = await fetch(`/api/chrome/rh-universal-nav-header`);
      setHeader(await headerResponse.text());
    };
    const fethFooter = async () => {
      const footerResponse = await fetch(`/api/chrome/rh-unified-footer`);
      setFooter(await footerResponse.text());
    };
    fetchHeader();
    fethFooter();
  }, []);
  return (
    <html lang="en">
      <head suppressHydrationWarning={true}>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon2023-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon2023-16x16.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <script suppressHydrationWarning={true} dangerouslySetInnerHTML={{ __html: headerPatch }}></script>
        <script suppressHydrationWarning={true} dangerouslySetInnerHTML={{ __html: analyticsInclude }}></script>
        <script suppressHydrationWarning={true} dangerouslySetInnerHTML={{ __html: pendoInclude }}></script>
        <script type="module" src="/modules/contrib/red_hat_shared_libs/dist/rhds-elements/modules/rh-footer/rh-footer.js?v=2.1.1"></script>
      </head>
      <body>
        <div className="rhd-m-max-width-xl">
          <div
            suppressHydrationWarning={true}
            dangerouslySetInnerHTML={{ __html: header || '<!--#include virtual="/remote/api/chrome/rh-universal-nav-header" -->' }}
          ></div>
          {children}
          <div
            suppressHydrationWarning={true}
            dangerouslySetInnerHTML={{
              __html: footer || '<!--#include virtual="/remote/api/chrome/rh-unified-footer/rh-unified-footer.html" -->',
            }}
          ></div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.3.0/custom-elements-es5-adapter.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.3.0/webcomponents-bundle.js"></script>
          <link rel="stylesheet" href="/modules/contrib/red_hat_shared_libs/dist/@cpelements/pfe-navigation/dist/pfe-navigation--lightdom.css" />
          <link rel="stylesheet" href="/modules/contrib/red_hat_shared_libs/dist/@patternfly/pfe-cta/dist/pfe-cta--lightdom.min.css" />
          <script src="https://developers.redhat.com/modules/contrib/red_hat_shared_libs/dist/@patternfly/pfelement/dist/pfelement.umd.min.js?rrg73h"></script>
          <script src="https://developers.redhat.com/modules/contrib/red_hat_shared_libs/dist/%40cpelements/pfe-navigation/dist/pfe-navigation.umd.min.js?rrg73h"></script>
          <script src="https://developers.redhat.com/modules/contrib/red_hat_shared_libs/dist/%40patternfly/pfe-cta/dist/pfe-cta.umd.min.js?rrg73h"></script>
          <script src="https://developers.redhat.com/modules/contrib/red_hat_shared_libs/dist/%40patternfly/pfe-icon/dist/pfe-icon.umd.min.js?rrg73h"></script>
          <script src="https://developers.redhat.com/modules/contrib/red_hat_shared_libs/dist/%40cpelements/rh-account-dropdown/dist/rh-account-dropdown.umd.min.js?rrg73h"></script>
          <script src="https://developers.redhat.com/modules/contrib/red_hat_shared_libs/dist/%40patternfly/pfe-avatar/dist/pfe-avatar.umd.min.js?rrg73h"></script>
          <script src="https://developers.redhat.com/modules/contrib/red_hat_universal_navigation/js/rh-account-dropdown.js?rrg73h"></script>
          <script src="https://developers.redhat.com/modules/contrib/red_hat_shared_libs/dist/%40cpelements/rh-site-switcher/dist/site-switcher.umd.min.js?rrg73h"></script>
        </div>
      </body>
    </html>
  );
}
