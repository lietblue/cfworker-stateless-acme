# cfworker-stateless-acme

## Stateless ACME using Cloudflare-worker

English | [中文](https://github.com/lietblue/cfworker-stateless-acme/blob/main/README.zh-CN.md)

Requirements: [acme.sh](https://github.com/acmesh-official/acme.sh)

Usage:
```
$ acme.sh --register-account
[Sat 02 Sep 2023 01:32:39 PM CST] Create account key ok.
[Sat 02 Sep 2023 01:32:39 PM CST] Registering account: https://acme-v02.api.letsencrypt.org/directory
[Sat 02 Sep 2023 01:32:42 PM CST] Registered
[Sat 02 Sep 2023 01:32:42 PM CST] ACCOUNT_THUMBPRINT='<Here is your account thumbprint>'
```
Copy your account thumbprint to the`acmeAccountThumbprint` variable


Then copy the script to the Cloudflare-workers edit page
Press save & deploy then bound your domain to the cfworker

Use the following command to issus a cert
`acme.sh --issue -d <Your domain here>  --stateless`


if your domain also contain a cf-cdn based website you may want to use the cf routing feature
`<Your domain here>/.well-known/acme-challenge/*`


#### For multiple machine share the same account thumbprint
This command `acme.sh --register-account`will create `account.key` file in the ACME CA folder


`account.key` usually located at:
`~/.acme.sh/ca/<Your ACME CA Provider>/directory/account.key`

For Let's Encrypt:
`~/.acme.sh/ca/acme-v02.api.letsencrypt.org/directory/account.key`


Then copy the `account.key` to other acme.sh client then use `acme.sh --register-account` to create account file needed by acme.sh


If you don't know where you should put your account key 

use `acme.sh --create-account-key` acme.sh will create the folder containing`account.key` for you replace that key with your own key


Note: According to my test ACME email address **WILL NOT** AFFECT ACCOUNT THUMBPRINT
