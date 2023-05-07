---
slug: fixing-restart-service-error
title: Fixing Restart Service Error in DigitalOcean Droplet
description: "Fixing restart service error in DigitalOcean Droplet after SSH save copy push"
author: KingDaemonx
author_title: Backend Engineer
author_url: https://twitter.com/KingDaemonX
# author_image_url: https://res.cloudinary.com/saintmalik/image/upload/e_sharpen:2000,q_74,r_0/v1641922078/saintmalik.webp
# image: https://saintmalikme.mo.cloudinary.net/bgimg/ubuntu-vps-linux-pentesting-offensive-security.jpg
tags: [golang, digitalocean, deploy, ssh, service file, linux]
---

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Giscus from "@giscus/react";

<!--truncate-->

Setting up a DigitalOcean Droplet should be hassle-free if you follow their documentation. However, working with the droplet can be challenging for those with little knowledge in Linux, like backend engineers.

Most of the time, you find the server side operation and configuration done by the guys with that special skill "DevOps 🐋" and some times you meet guys like me "Backend Engineers 🌀" playing around in the server and praying not to break something that'd cost production lol :) but fun fact is we do 🥲 and the software engineering instinct to fix and shout 'yeaaaaaahhh Thank God I can Breathe' after hours of mental stress and random rants on how we broke something we know nothing about with our favourite non-living thing then we fix it.

One error that can occur is when stopping and restarting a service, usually a Go binary, and getting a file busy error after a broken connection. This can make it difficult to run the file because the machine interprets it as a file in progress and labels it as busy.

Here's an example of how this error can occur:

- Compiling Go code into a Linux binary on a local machine using the command:

  ```zsh/bash
  GOOS=linux GOARCH=amd64 go build
  ```

SSHing into the remote Ubuntu server:

```zsh/bash

ssh root@[Droplet_IP_Address] or [domain name]
```

Stopping the service with the following command:

```zsh/bash

sudo systemctl stop example.service
```

Pushing the executable from the local machine:

```zsh/bash

scp example root@[Droplet_IP_Address] or [domain name]
```

If the push breaks, attempting to push again without killing the process on the droplet will likely result in the file busy error.

To fix this error, run the following command to see if an instance of the program file is still running:

```zsh/bash

lsof | grep example.service
```

If no response is returned, you're likely on the safe side. If a response similar to the following is returned:

```
example.ser 1234 user cwd DIR 8,3 4096 197644 /home/user
example.ser 1234 user txt REG 8,3 12345 197645 /usr/local/bin/example.service
example.ser 1234 user mem REG 8,3 1325168 1842864 /usr...
```

you will need to kill the running process using the command:

```zsh/bash

kill -9 <process-id>
```

Once the process has been killed, run the following command to start the service:

```zsh/bash

sudo systemctl start example.service
```

Check the status of the service by running:

```zsh/bash

sudo systemctl status example.service

```

If it returns and active status 😌, you are all good and it is okay to check endpoint health

Thank you for reading to this point and I hope this helps you fix your error
