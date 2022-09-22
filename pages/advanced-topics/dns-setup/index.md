---
title: Configuring DNS
description: Registering and setting up a domain
---

{% tabs %}
{% tab title="New Domain" %}
#### 1. Register a Domain Name

This domain name, eg `pluraldemo.com` can be registered with any registrar, for example Google Domains, GoDaddy, or Namecheap.

#### 2. Create a DNS Zone in Your Cloud Provider Console Corresponding to the registered Domain Name

Follow [the instructions](creating-dns-zone-in-your-cloud-provider-console.md) for creating a DNS Zone named `pluraldemo.com` within the DNS service of your cloud provider.

Record the nameservers corresponding to this zone.

#### 3. Update name servers

Go back to where you registered `pluraldemo.com`and add the nameservers from Step 2 as "custom nameservers" under its DNS configuration.

{% hint style="info" %}
The domain name registrars will typically provide default name servers and also the ability to set up custom name servers. For example, in Google Domains, you can set custom name servers under the DNS tab once you click into a specific domain name.
{% /hint %}

![](</assets/Screen Shot 2021-08-18 at 1.00.00 PM.png>)
{% /tab %}

{% tab title="Subdomain of Existing Domain" %}
The more likely scenario is that you will have an existing company domain, i.e. `pinterest.com` and you will want to create a subdomain under which you can consolidate all your plural applications, eg `plural.pinterest.com`

#### 1. Create DNS Zone in Your Cloud Provider Console

Follow [the instructions](creating-dns-zone-in-your-cloud-provider-console.md) for creating a DNS Zone named `plural.pinterest.com` within the DNS service of your cloud provider.

Record the nameservers corresponding to this zone.

#### 2. Create NS Record

Go back to where you registered `pinterest.com` and add a `NS` record that corresponds to the `plural.pinterest.com` subdomain -- for the data field of the record, input the nameservers from step 1.

![](</assets/Screen Shot 2021-08-30 at 3.36.34 PM.png>)

These are the terraform snippets for reference:

```
resource "aws_route53_zone" "test" {
  name = "plural.pinterest.com"

  tags = {
    Environment = "test"
  }
}

resource "aws_route53_record" "test-ns" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "plural.pinterest.com"
  type    = "NS"
  ttl     = "30"
  records = aws_route53_zone.test.name_servers
}
```
{% /tab %}
{% /tabs %}
