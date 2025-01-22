# api-documentation-frontend


Front-end repo for the API documentation site
This project is split into 6 internal packages used to build the api-catalog page found at
https://developers.redhat.com/api-catalog/

## Project structure

The main package is found on [src](./src) and contains the Next.js application.

Other packages includes:
- [Common code](./packages/common) shared across other packages. Contains the information about the included APIs.
- [Discovery](./packages/discovery) contains a file descriptor and its supporting schemas to describe the contents
  found in API catalog. It includes the list of the APIs, what group they form part of and their metadata.
- [Sitemap](./packages/sitemap) is a cli tool to create the sitemap.xml of API catalog. The sitemap package is also responsible for generating the [canonical format json file](./public/canonical.json) used by the Search Platform for indexing.
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

| Note: CI makes use of this file to generate the API content |
|-------------------------------------------------------------|

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

## Running the components

This project uses `npm` and `react`, the regular steps apply here.

### Build the application

Use `npm install` to install all the project dependencies.

### Running the frontend

Use `npm run dev` to start the frontend application.

### Running the discovery process

Use `npm run discovery` to star the discovery and transformation process. By default this will build and run the process.
You can specify if you want to run the process without fetching any API by using: 
```bash
npm run discovery:build && npm run discovery:start -- --skip-api-fetch
```

### Building the sitemap

The sitemap can be re-generated by running: `SITEMAP_BASE_URL=https://my-base-url npm run sitemap`.

## Adding external content

Details from each API is extracted from its openapi file to show in the API catalog. Sometimes this is not enough.
We provide an option to add additional sections. Each section is specified as a [markdown file](https://www.markdownguide.org/basic-syntax/) 
and has a specific place on the API catalog.

The content is rendered in the API catalog using the same look and feel. Here is an example of a 
[getting started](./examples/getting-started.md) section:

![Getting started sample](./examples/getting-started.png?raw=true "Getting started sample")

### Adding a section

A markdown file needs to be added to [./packages/discovery/resources/content](./packages/discovery/resources/content)
under the group-id and api-id using one of the [supported sections](#supported-sections) filenames.

e.g. to add Getting started section for Notifications we need to create the following file:
[./packages/discovery/resources/content/hcc-insights/notifications/getting-started.md](./packages/discovery/resources/content/hcc-insights/notifications/getting-started.md)

This file will be used when regenerating the API files to add a new section on the API catalog.

### Supported sections

This is a list of the support sections, followed by the required file name.

- Getting started: `getting-started.md`

## Releasing to Production (Deprecated)

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

## Releasing to production (new)

TBD

## SPAship configuration

We require some components that are shared across developers.redhat.com (header and footer). These components needs to be copied (and synchronized from time to time).
To do so, we require the sync service provided by SPAship. 

If we need to update (or recreate) this configuration we can head over the [SPAship portal](https://spaship.redhat.com/properties/developers) and go to
Settings -> Environment -> Update Sync to configure the environment.

Update the configuration and save by clicking "Sync".

### Current configuration

We list the current configuration used on each environment.

### Prod

```json
{
	"autosync": {
		"enabled": true,
		"targets": [
                 {
			"name": "developers-prod-header",
			"interval": "1800s",
			"source": {
				"url": "https://developers.redhat.com/api/chrome/rh-universal-nav-header"
			},
			"dest": {
				"path": "/var/www/html/.include/chrome/rh-universal-nav-header",
				"filename": "rh-universal-nav-header.html"
			}
		},
                {
			"name": "developers-prod-footer",
			"interval": "1800s",
			"source": {
				"url": "https://developers.redhat.com/api/chrome/rh-unified-footer"
			},
			"dest": {
				"path": "/var/www/html/.include/chrome/rh-unified-footer",
				"filename": "rh-unified-footer.html"
			}
		}
            ]
	}
}
```

### Stage 

```json
{
	"autosync": {
		"enabled": true,
		"targets": [
                {
			"name": "developers-stage-header",
			"interval": "3600s",
			"source": {
				"url": "https://developers.stage.redhat.com/api/chrome/rh-universal-nav-header"
			},
			"dest": {
				"path": "/var/www/html/.include/chrome/rh-universal-nav-header",
				"filename": "rh-universal-nav-header.html"
			}
		},
                {
			"name": "developers-stage-footer",
			"interval": "3600s",
			"source": {
				"url": "https://developers.stage.redhat.com/api/chrome/rh-unified-footer"
			},
			"dest": {
				"path": "/var/www/html/.include/chrome/rh-unified-footer",
				"filename": "rh-unified-footer.html"
			}
		}
            ]
	}
}
```

### QA

```json
{
	"autosync": {
		"enabled": true,
		"targets": [
                 {
			"name": "developers-qa-header",
			"interval": "3600s",
			"source": {
				"url": "https://developers.qa.redhat.com/api/chrome/rh-universal-nav-header?f=type%7Eapi_catalog"
			},
			"dest": {
				"path": "/var/www/html/.include/chrome/rh-universal-nav-header",
				"filename": "rh-universal-nav-header.html"
			}
		},
                {
			"name": "developers-qa-footer",
			"interval": "3600s",
			"source": {
				"url": "https://developers.qa.redhat.com/api/chrome/rh-unified-footer"
			},
			"dest": {
				"path": "/var/www/html/.include/chrome/rh-unified-footer",
				"filename": "rh-unified-footer.html"
			}
		}
            ]
	}
}
```

### Dev

```json
{
	"autosync": {
		"enabled": true,
		"targets": [{
			"name": "developers-dev-header",
			"interval": "3600s",
			"source": {
				"url": "https://developers.dev.redhat.com/api/chrome/rh-universal-nav-header?f=type%7Eapi_catalog"
			},
			"dest": {
				"path": "/var/www/html/.include/chrome/rh-universal-nav-header",
				"filename": "rh-universal-nav-header.html"
			}
		},
                {
			"name": "developers-dev-footer",
			"interval": "3600s",
			"source": {
				"url": "https://developers.dev.redhat.com/api/chrome/rh-unified-footer"
			},
			"dest": {
				"path": "/var/www/html/.include/chrome/rh-unified-footer",
				"filename": "rh-unified-footer.html"
			}
		}]
	}
}
```
