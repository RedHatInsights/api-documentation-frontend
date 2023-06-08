# api-documentation-frontend

Front-end repo for the API documentation site
This project is split into 6 internal packages used to build the api-catalog page found at
https://developers.redhat.com/api-catalog/

The main package is found on [src](./src) and contains the React application for the site itself.

Other packages includes:
- [Common code](./packages/common) shared across other packages. Contains the information about the included APIs.
- [Discovery](./packages/discovery) contains a file descriptor and its supporting schemas to describe the contents
  found in API catalog. It includes the list of the APIs, what group they form part of and their metadata.
- [Prerender](./packages/prerender) is a cli tool to pre-render all the API catalog to increase SEO and make it easier to
  be read by bots.
- [Sitemap](./packages/sitemap) is a cli tool to create the sitemap.xml of API catalog.
- [transform](./packages/transform) is a cli tool to process the [discovery file](./packages/discovery/Discovery.yml)
  and create typescript code that can be loaded by API Catalog, the resulting code is stored in the
  [Common code](./packages/common) package.


## Updating the discovery file

New APIs can be added on the [discovery file](./packages/discovery/Discovery.yml). The file follows a
[json schema](./packages/discovery/schemas/Discovery.json).

The top element of this file is the `api` property. This contains groups of applications.
This group is only used for organizing the applications, and has no impact on the way the applications are displayed.

The other top element is `tags` and contains the possible tags, each tag has a display name, a type and
the developer.redhat.com taxonomy metadata if any.

For more information head over to the [json schema](./packages/discovery/schemas/Discovery.json).

### Adding a new API

To add a new application to an existing group (i.e. `hcc-insights`) one must append to the `api[].apps` array e.g.

```yaml
apis:
  - id: hcc-insights
    name: Hybrid Cloud Console and Insights
    apps:
      - id: my-new-app # application's id
        name: My New Application # The display name of the application
        description: This is my new application # A description for the application
        url: https://.... # An URL pointing to the API
        apiType: openapi-v3 # Format of the API content
        icon: insights # One of the available icons
        tags: # List of tags
          - rhel
          - insights
```

### Adding a new Group

To add a new group, just add an entry to `api` array e.g.

```yaml
apis:
  - id: my new group
    name: This is my new group name
    apps:
      - id: at-least-one-app
        # ...
```

## Releasing to Production

We use GitLab tags for deployment to Production. Follow these steps:

1. **Ensure code is ready:** Merge all changes for the release into `main` and ensure they are tested.

2. **Create a GitLab Release:** Go to "Releases" in [GitLab](https://gitlab.cee.redhat.com/insights-platform/api-documentation-frontend/-/releases), click "Create a new release". Add a tag name using [Semantic Versioning](https://semver.org/) (e.g., `v1.0.0`). Give it a title, and write any notes about this release.

   When naming your release, follow **Semantic Versioning** rules:
   - **Major version (e.g., v1.0.0 to v2.0.0)**: You made big changes. Old features might not work.
   - **Minor version (e.g., v1.0.0 to v1.1.0)**: You added something new, but the old features still work.
   - **Patch version (e.g., v1.0.0 to v1.0.1)**: You fixed a small bug and didn't change or add anything else.

3. **Trigger the deployment:** Creating the release generates a tag that triggers the production deployment pipeline. Our `.gitlab-ci.yml` includes:

   ```yaml
   rules:
     - if: $CI_COMMIT_TAG =~ /^v\d+/
       when: always
   ```
   
   This means the `deploy_prod` job executes when a tag like `v1.0.0` is added.

4. **Watch the pipeline:** Monitor the pipeline in GitLab's CI/CD > Pipelines section. If successful, your code is deployed to production.
