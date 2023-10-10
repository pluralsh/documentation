# Publishing a Plural Artifact

Every Plural account holder can act as a publisher to publish artifacts and in that way contribute open source applications to Plural's public marketplace.
If you don't want to publish an application publicly straight away and make it available to everybody you can first test it by releasing it privately whereby only users of your Plural account can install it.

## Create a publisher
To publish an artifact you need to create a publisher with your Plural account admin first.

1. Click on your profile on the bottom left on `app.plural.sh`.
2. Select `create publisher`.
3. Enter your information. 
4. Hit save.

## Publish an Artifact with the Plural CLI
When you're done with implementing your artifact and you have created a publisher you're ready to publish it. 

1. Navigate to the directory of your artifact in your local copy of the [Plural artifacts git repository](https://github.com/pluralsh/plural-artifacts).
2. Locate the `Pluralfile`.
3. Enter the name of your publisher as the first argument in the `ATTRIBUTES` line. The arbument is case sensitive. E.g. if your publisher is called `Mypublisher`, it should look like this:

```
REPO dagster
ATTRIBUTES Mypublisher repository.yaml

TF terraform/*
HELM helm/*
RECIPE plural/recipes/*
```

4. Finally, publish your artifact with the command `plural apply -f Pluralfile`.

## Public vs Private Artifacts
Artifacts can be published with a `private: true` or `private: false` setting in the `repository.yaml` (the `private` flag inside each recipe YAML needs to match the `private` flag in the `repository.yaml`).
Bundles from private artifacts can only be downloaded and installed by users from the same account the publisher was created in.
Artifacts created, and published privately by you, are not visible in the public marketplace.
By default only Plural developers can publish artifacts publicly.
If you want to publish your artifact publicly, too, you need to open a PR in the [Plural artifacts git repository](https://github.com/pluralsh/plural-artifacts), so the Plural team can review your code.
