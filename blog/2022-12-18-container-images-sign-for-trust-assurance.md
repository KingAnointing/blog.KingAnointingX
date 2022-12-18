---
slug: signing-container-images-for-trust-assurance
title: Signing Container Images for Trust Assurance
author: Saintmalik
author_title: AppSec Engineer
author_url: https://twitter.com/saintmalik_
author_image_url: https://res.cloudinary.com/saintmalik/image/upload/e_sharpen:2000,q_74,r_0/v1641922078/saintmalik.webp
image: https://saintmalikme.mo.cloudinary.net/bgimg/peace-of-mind.webp
tags: [appsec, cantainer security, devsecops]
---

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Giscus from "@giscus/react";

Hii 👋, i am sure you want peace of mind too, haha

<picture>
  <source type="image/webp" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/peace-tweet.webp`} alt="peace tweet"/>
  <source type="image/jpeg" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/peace-tweet.jpg`} alt="peace tweet"/>
  <img src={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/peace-tweet.jpg`} alt="peace tweet"/>
</picture>

Well, there is no way we would be discussing container supply chain security without talking about signing of container images.

<!--truncate-->

## So why do you need to sign your container images?

### Trust:

You know "trust is the ultimate currency", so that any users using or pulling your images can verifiably trust it and be very sure they are downloading the container image you've created.

### Peace of mind, haha:

A good illustration of this is when you are using kubernetes as your ocheastraror, kubernetes gives you the ability to set your manifest so that it doesnt allows or run an unsigned container images.

So that way you are at peace that no trojanized container images will be deployed to your container registry, hence you've elimated the possibilities of hosting and running trojanized container images

## How do you sign your container images?

There are different ways to go about but we would go for the less complex route, sigstore has made things easier with their cosign tool which allows you to sign using your private key and you very using the public key.

So lets get into it.

i want to believe you are also automating the deployment of your container images via ci/cd pipelines, so the signing too will be automated via ci/cd pipelines.

Here i will be using Github Action(CI/CD tool), you also use any other ci/cd tool like GitLab Ci, Jenkins or even Circle Ci, which everone works, in as much there is a plugin of cosign for them.

I would like to point out that cosign key pairs can be generated in different ways;

- fixed, text-based keys generated using cosign generate-key-pair
- cloud KMS-based keys generated using cosign generate-key-pair -kms
- keys generated on hardware tokens using the PIV interface using cosign piv-tool
- Kubernetes-secret based keys generated using cosign generate-key-pair k8s://namespace/secretName

To sign the image, we need to create a public-private key pair, the text-based one

```yaml
cosign generate-key-pair
```

You will be prompted to enter a password, after that, you will two files been created, ```cosign.key``` and  ```cosign.pub```

<picture>
  <source type="image/webp" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/keypairs-cosing.webp`} alt="keypairs cosign"/>
  <source type="image/jpeg" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/keypairs-cosing.jpg`} alt="keypairs cosign"/>
  <img src={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/keypairs-cosing.jpg`} alt="keypairs cosign"/>
</picture>

Here is my application dockerfile for creating the container image

```yaml title="Dockerfile"
FROM alpine
RUN apk update
RUN apk add git
```

now lets create the github workflow yaml file where we put all it all together

```yaml title="https://github.com/saintmalik/sign-container-images/blob/main/.github/workflows/main.yaml"
name: sign container images
on: push

jobs:
 build-sign-container-image:
    runs-on: ubuntu-latest
    steps:
      - name: "checkout"
        uses: actions/checkout@v2
      - name: Generate uuid from shortened commit SHA
        id: uuid
        run: echo "::set-output name=sha_short::$(git rev-parse --short HEAD)"
      - name: Build and push
        env:
          IMAGE_TAG: signed-test-${{ steps.uuid.outputs.sha_short }}
        run: |
          docker build -t ttl.sh/${IMAGE_TAG}:1h .
          docker push ttl.sh/${IMAGE_TAG}:1h
      - name: Install Cosign
        uses: sigstore/cosign-installer@main
      - name: Signing the image with a key
        run: |
          cosign sign --key env://COSIGN_PRIVATE_KEY ttl.sh/${IMAGE_TAG}:1h
        env:
          IMAGE_TAG: signed-test-${{ steps.uuid.outputs.sha_short }}
          COSIGN_PRIVATE_KEY: ${{secrets.COSIGN_PRIVATE_KEY}}
          COSIGN_PASSWORD: ${{secrets.COSIGN_PASSWORD}}
```

You would see that i am not login into any repository here, either docker hub or aws ecr, thats because i am using ttl.sh repository which allows me to push images anonymously.

But if you happen to use github container or ecr repository then you will need to login to your repository.

So now you need to set the ```COSIGN_PRIVATE_KEY``` and ```COSIGN_PASSWORD``` environment credentials in your github repo.

so just run ```cat cosign.key``` and copy the output and add it, also the private key you just set to it.

<picture>
  <source type="image/webp" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/variables-github-repo.webp`} alt="variables github repo"/>
  <source type="image/jpeg" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/variables-github-repo.jpg`} alt="variables github repo"/>
  <img src={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/variables-github-repo.jpg`} alt="variables github repo"/>
</picture>

So once the workflow is done building, pushing and signing the container image, you can verify the images using your public key.

<picture>
  <source type="image/webp" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/sign-container-images-github.webp`} alt="sign container images github"/>
  <source type="image/jpeg" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/sign-container-images-github.jpg`} alt="sign container images github"/>
  <img src={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/sign-container-images-github.jpg`} alt="sign container images github"/>
</picture>

verify the image using your public key

```yaml
cosign verify --key cosign.pub ttl.sh/signed-test-960c8cb:1h | jq
```

if the public key is ours, then the verification should go through, and you should see a result similar to this.

<picture>
  <source type="image/webp" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/verify-signed-images.webp`} alt="verify-signed-images"/>
  <source type="image/jpeg" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/verify-signed-images.jpg`} alt="verify-signed-images"/>
  <img src={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/verify-signed-images.jpg`} alt="verify-signed-images"/>
</picture>

Now we've successfully signed and verify the container image, but we can still add annotations to signing our container images for a detailed information from the container image verification

We are going to modify our yaml file to add the signing author's name to the image signing.

```yaml
      - name: Signing the image with a key
        run: |
          cosign sign --key env://COSIGN_PRIVATE_KEY -a "author=SaintMalik" ttl.sh/${IMAGE_TAG}:1h
        env:
          IMAGE_TAG: signed-test-${{ steps.uuid.outputs.sha_short }}
          COSIGN_PRIVATE_KEY: ${{secrets.COSIGN_PRIVATE_KEY}}
          COSIGN_PASSWORD: ${{secrets.COSIGN_PASSWORD}}
```

Once your workflow is done running and the image is signed, you can now verify it with your public key and you should see an output that looks like this showing the signing author's names

<picture>
  <source type="image/webp" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/verify-signing-images-author.webp`} alt="verify signing images author"/>
  <source type="image/jpeg" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/verify-signing-images-author.jpg`} alt="verify signing images author"/>
  <img src={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/verify-signing-images-author.jpg`} alt="verify signing images author"/>
</picture>

You know how to sign and verify container images now, but thats now all, we also have another signing option called keyless, this process uses OIDC(authentication) to sign container images.

The idea of keyless is to peg to users identity, so you can sign your container images using github authentication or other OIDC authenticator, this process is not in production yet, you can check cosign repo for more details.

Signing with keyless is not also advsable on a private repo, infact its also disabled on github, because artifacts from keyless signed images are published on a transparent log where everyone can see.

But why would you ever need to sign using keyless?

- compromised keys in the long run
- not so good in the scalable viewpoint

Well thats all on the signing process, lets jump into to the signed image enforcement for users of who uses orchestrators like kubernetes

## Signed Image Policy Enforcement on Kubernetes

When it comes to policy on kubernetes, that are various policy engines to use like OPA, Kyverno and Conaisseur.

but here i will be using Kyverno, i also want to believe your cluster is up already, if not you can always spin one up locally using minikube.

So let's jump into it;

<picture>
  <source type="image/jpeg" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/lets-get-started.gif`} alt="signing container images"/>
  <img src={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/lets-get-started.gif`} alt="signing container images"/>
</picture>

I wont be going over what policies as code are in kubernetes nor the installation process, but to install Kyverno, head over to their <a href="https://kyverno.io/docs/installation/" target="_blank">documentation</a>

Now lets assume you have kyverno already up on your cluster, so you need to create the cluster policy and deploy using ```kubectl apply -f clusterpolicy.yaml -n kyverno```

```yaml title="clusterpolicy.yaml"
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: check-image
spec:
  validationFailureAction: enforce
  background: false
  webhookTimeoutSeconds: 30
  failurePolicy: Fail
  rules:
    - name: check-image
      match:
        any:
        - resources:
            kinds:
              - Pod
      verifyImages:
      - imageReferences:
        - "ghcr.io/kyverno/test-verify-image:*"
        attestors:
        - count: 1
          entries:
          - keys:
              publicKeys: |-
                -----BEGIN PUBLIC KEY-----
                MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE8nXRh950IZbRj8Ra/N9sbqOPZrfM
                5/KAQN0/KjHcorm/J5yctVd7iEcnessRQjU917hmKO6JWVGHpDguIyakZA==
                -----END PUBLIC KEY-----
```

<picture>
  <source type="image/webp" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/kyverno-policy-apply.webp`} alt="kyverno policy apply"/>
  <source type="image/jpeg" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/kyverno-policy-apply.jpg`} alt="kyverno policy apply"/>
  <img src={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/kyverno-policy-apply.jpg`} alt="kyverno policy apply"/>
</picture>

Replace the public here with your own public key, you can get that by running ```cat cosign.pub``` and also the replace the image link with your own container registry images.

you will notice the asterisk here ```"ghcr.io/kyverno/test-verify-image:*"``` it's used to generalize the tags, so which so ever tag that the image has, it will bevalid for the check.

But in a situation where you are running microservices? you might just want to use ```"*"``` to generalize it across your microservices pod.

You can also read more over their <a href="https://kyverno.io/docs/writing-policies/verify-images" target="_blank">documentation</a> to for more detailed guide.

<picture>
  <source type="image/webp" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/clusterpolicy-deployed.webp`} alt="clusterpolicy deployed"/>
  <source type="image/jpeg" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/clusterpolicy-deployed.jpg`} alt="clusterpolicy deployed"/>
  <img src={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/clusterpolicy-deployed.jpg`} alt="clusterpolicy deployed"/>
</picture>

Once your cluster policy has been deployed, let's test it out, firstly we are going to run a signed image.

```yaml
kubectl run signed --image=ttl.sh/signed-test-41d6573:1h
```

<picture>
  <source type="image/webp" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/signed-pod.webp`} alt="signed pod"/>
  <source type="image/jpeg" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/signed-pod.jpg`} alt="signed pod"/>
  <img src={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/signed-pod.jpg`} alt="signed pod"/>
</picture>

As you can see, the pod was created successfully, now lets run it against an unsigned container image.

```yaml
kubectl run unsigned --image=ttl.sh/signed-test-a4d2a1b:1h
```
<picture>
  <source type="image/webp" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/unsigned-images-policy.webp`} alt="unsigned image policy"/>
  <source type="image/jpeg" srcset={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/unsigned-images-policy.jpg`} alt="unsigned image policy"/>
  <img src={`${useDocusaurusContext().siteConfig.customFields.imgurl}/bgimg/unsigned-images-policy.jpg`} alt="unsigned image policy"/>
</picture>

Great, you can see the pod was stopped from starting, the policy is been enforced, and you can be rest assured that any container image that isnt signed by your private key, would never make it into your clusters.

That's it folks! i hope this was useful and helpful, might also write about using the keyless signing soon too, so stay tuned!

<br/>
<h2>Comments</h2>
<Giscus
id="comments"
repo="saintmalik/blog.saintmalik.me"
repoId="MDEwOlJlcG9zaXRvcnkzOTE0MzQyOTI="
category="General"
categoryId="DIC_kwDOF1TQNM4CQ8lN"
mapping="title"
term="Comments"
reactionsEnabled="1"
emitMetadata="0"
inputPosition="top"
theme="preferred_color_scheme"
lang="en"
loading="lazy"
crossorigin="anonymous"
    />