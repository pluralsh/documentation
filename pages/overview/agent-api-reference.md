# API Reference

## Packages
- [deployments.plural.sh/v1alpha1](#deploymentspluralshv1alpha1)


## deployments.plural.sh/v1alpha1

Package v1alpha1 contains API Schema definitions for the deployments v1alpha1 API group

### Resource Types
- [ClusterDrain](#clusterdrain)
- [CustomHealth](#customhealth)
- [IngressReplica](#ingressreplica)
- [KubecostExtractor](#kubecostextractor)
- [MetricsAggregate](#metricsaggregate)
- [PipelineGate](#pipelinegate)
- [UpgradeInsights](#upgradeinsights)
- [VirtualCluster](#virtualcluster)



#### AWSProviderCredentials







_Appears in:_
- [ProviderCredentials](#providercredentials)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `region` _string_ | Region is the name of the AWS region cluster lives in. |  | Required: \{\} <br /> |
| `accessKeyID` _string_ | AccessKeyID is your access key ID used to authenticate against AWS API. |  | Optional: \{\} <br /> |
| `secretAccessKeyRef` _[SecretReference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#secretreference-v1-core)_ | SecretAccessKeyRef is a reference to the secret that contains secret access key.<br />Since UpgradeInsights is a cluster-scoped resource we can't use local reference.<br />SecretAccessKey must be stored in a key named "secretAccessKey".<br />An example secret can look like this:<br />	apiVersion: v1<br />	kind: Secret<br />	metadata:<br />   name: eks-credentials<br />   namespace: upgrade-insights-test<br />	stringData:<br />   secretAccessKey: "changeme"<br />Then it can be referenced like this:<br />   ...<br />   secretAccessKeyRef:<br />     name: eks-credentials<br />     namespace: upgrade-insights-test |  | Optional: \{\} <br /> |


#### AgentHelmConfiguration







_Appears in:_
- [HelmSpec](#helmspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `chartName` _string_ | ChartName is a helm chart name. |  |  |
| `repoUrl` _string_ | RepoUrl is a url that points to this helm chart. |  | Optional: \{\} <br />Type: string <br /> |
| `values` _[RawExtension](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#rawextension-runtime-pkg)_ | Values allows defining arbitrary YAML values to pass to the helm as values.yaml file.<br />Use only one of:<br />	- Values<br />	- ValuesSecretRef<br />	- ValuesConfigMapRef |  | Optional: \{\} <br /> |
| `valuesSecretRef` _[SecretKeySelector](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#secretkeyselector-v1-core)_ | ValuesSecretRef fetches helm values from a secret in this cluster.<br />Use only one of:<br />	- Values<br />	- ValuesSecretRef<br />	- ValuesConfigMapRef |  | Optional: \{\} <br /> |
| `valuesConfigMapRef` _[ConfigMapKeySelector](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#configmapkeyselector-v1-core)_ | ValuesConfigMapRef fetches helm values from a config map in this cluster.<br />Use only one of:<br />	- Values<br />	- ValuesSecretRef<br />	- ValuesConfigMapRef |  | Optional: \{\} <br /> |


#### Binding



Binding ...



_Appears in:_
- [Bindings](#bindings)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `id` _string_ |  |  | Optional: \{\} <br /> |
| `UserID` _string_ |  |  | Optional: \{\} <br /> |
| `userEmail` _string_ |  |  | Optional: \{\} <br /> |
| `groupID` _string_ |  |  | Optional: \{\} <br /> |
| `groupName` _string_ |  |  | Optional: \{\} <br /> |


#### Bindings



Bindings represents a policy bindings that
can be used to define read/write permissions
to this resource for users/groups in the system.



_Appears in:_
- [ClusterSpec](#clusterspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `read` _[Binding](#binding) array_ | Read bindings. |  | Optional: \{\} <br /> |
| `write` _[Binding](#binding) array_ | Write bindings. |  | Optional: \{\} <br /> |


#### ClusterDrain



ClusterDrain is the Schema for the ClusterDrain object





| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `deployments.plural.sh/v1alpha1` | | |
| `kind` _string_ | `ClusterDrain` | | |
| `metadata` _[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#objectmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `spec` _[ClusterDrainSpec](#clusterdrainspec)_ |  |  |  |


#### ClusterDrainSpec



ClusterDrainSpec defines the desired state of ClusterDrain



_Appears in:_
- [ClusterDrain](#clusterdrain)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `flowControl` _[FlowControl](#flowcontrol)_ |  |  |  |
| `labelSelector` _[LabelSelector](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#labelselector-v1-meta)_ |  |  |  |




#### ClusterSpec







_Appears in:_
- [VirtualClusterSpec](#virtualclusterspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `handle` _string_ | Handle is a short, unique human-readable name used to identify this cluster.<br />Does not necessarily map to the cloud resource name. |  | Optional: \{\} <br /> |
| `tags` _object (keys:string, values:string)_ | Tags used to filter clusters. |  | Optional: \{\} <br /> |
| `metadata` _[RawExtension](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#rawextension-runtime-pkg)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  | Optional: \{\} <br /> |
| `bindings` _[Bindings](#bindings)_ | Bindings contain read and write policies of this cluster |  | Optional: \{\} <br /> |








#### CustomHealth



CustomHealth is the Schema for the HealthConverts API





| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `deployments.plural.sh/v1alpha1` | | |
| `kind` _string_ | `CustomHealth` | | |
| `metadata` _[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#objectmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `spec` _[CustomHealthSpec](#customhealthspec)_ |  |  |  |


#### CustomHealthSpec



CustomHealthSpec defines the desired state of CustomHealth



_Appears in:_
- [CustomHealth](#customhealth)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `script` _string_ |  |  |  |




#### FlowControl







_Appears in:_
- [ClusterDrainSpec](#clusterdrainspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `percentage` _integer_ |  |  |  |
| `maxConcurrency` _integer_ |  |  |  |


#### GateSpec



GateSpec defines the detailed gate specifications



_Appears in:_
- [PipelineGateSpec](#pipelinegatespec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `job` _[JobSpec](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#jobspec-v1-batch)_ | resuse JobSpec type from the kubernetes api |  |  |


#### GateState

_Underlying type:_ _GateState_

GateState represents the state of a gate, reused from console client

_Validation:_
- Enum: [PENDING OPEN CLOSED RUNNING]

_Appears in:_
- [PipelineGateStatus](#pipelinegatestatus)



#### GateType

_Underlying type:_ _GateType_

GateType represents the type of a gate, reused from console client

_Validation:_
- Enum: [APPROVAL WINDOW JOB]

_Appears in:_
- [PipelineGateSpec](#pipelinegatespec)





#### HelmConfiguration







_Appears in:_
- [AgentHelmConfiguration](#agenthelmconfiguration)
- [VClusterHelmConfiguration](#vclusterhelmconfiguration)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `chartName` _string_ | ChartName is a helm chart name. |  |  |
| `repoUrl` _string_ | RepoUrl is a url that points to this helm chart. |  | Optional: \{\} <br />Type: string <br /> |
| `values` _[RawExtension](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#rawextension-runtime-pkg)_ | Values allows defining arbitrary YAML values to pass to the helm as values.yaml file.<br />Use only one of:<br />	- Values<br />	- ValuesSecretRef<br />	- ValuesConfigMapRef |  | Optional: \{\} <br /> |
| `valuesSecretRef` _[SecretKeySelector](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#secretkeyselector-v1-core)_ | ValuesSecretRef fetches helm values from a secret in this cluster.<br />Use only one of:<br />	- Values<br />	- ValuesSecretRef<br />	- ValuesConfigMapRef |  | Optional: \{\} <br /> |
| `valuesConfigMapRef` _[ConfigMapKeySelector](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#configmapkeyselector-v1-core)_ | ValuesConfigMapRef fetches helm values from a config map in this cluster.<br />Use only one of:<br />	- Values<br />	- ValuesSecretRef<br />	- ValuesConfigMapRef |  | Optional: \{\} <br /> |


#### HelmSpec







_Appears in:_
- [VirtualClusterSpec](#virtualclusterspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `agent` _[AgentHelmConfiguration](#agenthelmconfiguration)_ | Agent allows configuring agent specific helm chart options. |  | Optional: \{\} <br /> |
| `vcluster` _[VClusterHelmConfiguration](#vclusterhelmconfiguration)_ | VCluster allows configuring vcluster specific helm chart options. |  | Optional: \{\} <br /> |


#### IngressReplica



IngressReplica is the Schema for the console ingress replica





| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `deployments.plural.sh/v1alpha1` | | |
| `kind` _string_ | `IngressReplica` | | |
| `metadata` _[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#objectmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `spec` _[IngressReplicaSpec](#ingressreplicaspec)_ | Spec of the IngressReplica |  | Required: \{\} <br /> |


#### IngressReplicaSpec







_Appears in:_
- [IngressReplica](#ingressreplica)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `ingressRef` _[ObjectReference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#objectreference-v1-core)_ |  |  | Required: \{\} <br /> |
| `ingressClassName` _string_ |  |  | Optional: \{\} <br /> |
| `tls` _[IngressTLS](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#ingresstls-v1-networking) array_ |  |  | Optional: \{\} <br /> |
| `hostMappings` _object (keys:string, values:string)_ |  |  | Required: \{\} <br /> |


#### KubecostExtractor



KubecostExtractor





| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `deployments.plural.sh/v1alpha1` | | |
| `kind` _string_ | `KubecostExtractor` | | |
| `metadata` _[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#objectmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `spec` _[KubecostExtractorSpec](#kubecostextractorspec)_ |  |  |  |


#### KubecostExtractorSpec







_Appears in:_
- [KubecostExtractor](#kubecostextractor)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `interval` _string_ |  | 1h | Optional: \{\} <br /> |
| `kubecostServiceRef` _[ObjectReference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#objectreference-v1-core)_ |  |  |  |
| `kubecostPort` _integer_ |  |  | Optional: \{\} <br /> |
| `recommendationThreshold` _string_ | RecommendationThreshold float value for example: `1.2 or 0.001` |  |  |
| `recommendationsSettings` _[RecommendationsSettings](#recommendationssettings)_ |  |  | Optional: \{\} <br /> |


#### MetricsAggregate



MetricsAggregate





| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `deployments.plural.sh/v1alpha1` | | |
| `kind` _string_ | `MetricsAggregate` | | |
| `metadata` _[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#objectmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |




#### PipelineGate



PipelineGate represents a gate blocking promotion along a release pipeline





| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `deployments.plural.sh/v1alpha1` | | |
| `kind` _string_ | `PipelineGate` | | |
| `metadata` _[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#objectmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `spec` _[PipelineGateSpec](#pipelinegatespec)_ |  |  |  |


#### PipelineGateSpec



PipelineGateSpec defines the detailed gate specifications



_Appears in:_
- [PipelineGate](#pipelinegate)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `id` _string_ |  |  |  |
| `name` _string_ |  |  |  |
| `type` _[GateType](#gatetype)_ |  |  | Enum: [APPROVAL WINDOW JOB] <br /> |
| `gateSpec` _[GateSpec](#gatespec)_ |  |  |  |




#### Progress







_Appears in:_
- [ClusterDrainStatus](#clusterdrainstatus)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `wave` _integer_ |  |  |  |
| `percentage` _integer_ |  |  |  |
| `count` _integer_ |  |  |  |
| `failures` _[ObjectReference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#objectreference-v1-core) array_ |  |  |  |
| `cursor` _[ObjectReference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#objectreference-v1-core)_ |  |  |  |


#### ProviderCredentials







_Appears in:_
- [UpgradeInsightsSpec](#upgradeinsightsspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `aws` _[AWSProviderCredentials](#awsprovidercredentials)_ | AWS defines attributes required to auth with AWS API. |  | Optional: \{\} <br /> |


#### RecommendationsSettings







_Appears in:_
- [KubecostExtractorSpec](#kubecostextractorspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `excludeNamespaces` _string array_ |  |  |  |
| `requireAnnotations` _object (keys:string, values:string)_ |  |  |  |


#### Status







_Appears in:_
- [VirtualClusterStatus](#virtualclusterstatus)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `id` _string_ | ID of the resource in the Console API. |  | Optional: \{\} <br />Type: string <br /> |
| `sha` _string_ | SHA of last applied configuration. |  | Optional: \{\} <br />Type: string <br /> |
| `conditions` _[Condition](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#condition-v1-meta) array_ | Represents the observations of a PrAutomation's current state. |  |  |


#### UpgradeInsights



UpgradeInsights is the Schema for the UpgradeInsights API





| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `deployments.plural.sh/v1alpha1` | | |
| `kind` _string_ | `UpgradeInsights` | | |
| `metadata` _[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#objectmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `spec` _[UpgradeInsightsSpec](#upgradeinsightsspec)_ |  |  |  |




#### UpgradeInsightsSpec







_Appears in:_
- [UpgradeInsights](#upgradeinsights)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `distro` _[ClusterDistro](#clusterdistro)_ | Distro defines which provider API should be used to fetch latest upgrade insights.<br />If not provided, we get the distro from the Plural API cluster tied to this operator deploy token. |  | Enum: [EKS] <br />Optional: \{\} <br /> |
| `clusterName` _string_ | ClusterName is your cloud provider cluster identifier (usually name) that is used<br />to fetch latest upgrade insights information from the cloud provider API.<br />If not provided, we get the cluster name from the Plural API cluster tied to this<br />operator deploy token and assume that it is the same as the cluster name in your cloud provider. |  | Optional: \{\} <br /> |
| `interval` _string_ | Interval defines how often should the upgrade insights information be fetched. | 10m | Optional: \{\} <br /> |
| `credentials` _[ProviderCredentials](#providercredentials)_ | Credentials allow overriding default provider credentials bound to the operator. |  | Optional: \{\} <br /> |


#### VClusterHelmConfiguration







_Appears in:_
- [HelmSpec](#helmspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `chartName` _string_ | ChartName is a helm chart name. |  |  |
| `repoUrl` _string_ | RepoUrl is a url that points to this helm chart. |  | Optional: \{\} <br />Type: string <br /> |
| `values` _[RawExtension](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#rawextension-runtime-pkg)_ | Values allows defining arbitrary YAML values to pass to the helm as values.yaml file.<br />Use only one of:<br />	- Values<br />	- ValuesSecretRef<br />	- ValuesConfigMapRef |  | Optional: \{\} <br /> |
| `valuesSecretRef` _[SecretKeySelector](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#secretkeyselector-v1-core)_ | ValuesSecretRef fetches helm values from a secret in this cluster.<br />Use only one of:<br />	- Values<br />	- ValuesSecretRef<br />	- ValuesConfigMapRef |  | Optional: \{\} <br /> |
| `valuesConfigMapRef` _[ConfigMapKeySelector](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#configmapkeyselector-v1-core)_ | ValuesConfigMapRef fetches helm values from a config map in this cluster.<br />Use only one of:<br />	- Values<br />	- ValuesSecretRef<br />	- ValuesConfigMapRef |  | Optional: \{\} <br /> |


#### VirtualCluster



VirtualCluster is the Schema for the virtual cluster API





| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `deployments.plural.sh/v1alpha1` | | |
| `kind` _string_ | `VirtualCluster` | | |
| `metadata` _[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#objectmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `spec` _[VirtualClusterSpec](#virtualclusterspec)_ | Spec ... |  | Required: \{\} <br /> |


#### VirtualClusterSpec







_Appears in:_
- [VirtualCluster](#virtualcluster)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `kubeconfigRef` _[LocalObjectReference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#localobjectreference-v1-core)_ | KubeconfigRef is a reference to the secret created by the<br />vcluster helm chart. It contains kubeconfig with information<br />on how to access created virtual cluster. |  | Required: \{\} <br /> |
| `credentialsRef` _[SecretKeySelector](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#secretkeyselector-v1-core)_ | CredentialsRef is a reference to the secret pointing to the<br />key that holds Console API access token. It allows to communicate<br />with the standard Console API. |  | Required: \{\} <br /> |
| `cluster` _[ClusterSpec](#clusterspec)_ | Cluster is a simplified representation of the Console API cluster<br />object. See [ClusterSpec] for more information. |  | Optional: \{\} <br /> |
| `external` _boolean_ | External marks this virtual cluster as external one, meaning<br />that the vcluster deployment will not be automatically created.<br />User has to pre-provision vcluster and provide a valid KubeconfigRef<br />pointing to an existing vcluster installation. |  | Optional: \{\} <br /> |
| `helm` _[HelmSpec](#helmspec)_ | Helm allows configuring helm chart options of both agent and vcluster.<br />It is then deployed by the [VirtualCluster] CRD controller. |  | Optional: \{\} <br /> |




