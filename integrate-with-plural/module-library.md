# Module Library

We have a number of helper terraform modules and helm charts to encapsulate some of the common tasks in applications available at [pluralsh/module-library](https://github.com/pluralsh/module-library).  Some of the more common usecases here are:

* creating object storage buckets and generating credentials for them. This covers s3, gcs, and minio for cases where applications don't support azure blob store.&#x20;
* creating a postgres database with all the supporting plural artifacts
  * runbook for scaling
  * dashboards
  * prometheus rules
