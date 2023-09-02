# cfworker-stateless-acme

## 使用Cloudflare-worker实现Stateless ACME
[English](https://github.com/lietblue/cfworker-stateless-acme/blob/main/README.md) | 中文
需要: [acme.sh](https://github.com/acmesh-official/acme.sh)
食用方法:
```
$ acme.sh --register-account
[Sat 02 Sep 2023 01:32:39 PM CST] Create account key ok.
[Sat 02 Sep 2023 01:32:39 PM CST] Registering account: https://acme-v02.api.letsencrypt.org/directory
[Sat 02 Sep 2023 01:32:42 PM CST] Registered
[Sat 02 Sep 2023 01:32:42 PM CST] ACCOUNT_THUMBPRINT='<这里是你密钥的摘要>'
```
将密钥摘要填写至代码中的 `acmeAccountThumbprint` 变量
之后复制部署到Cloudflare-workers并部署再绑定到域名就可以了
使用以下脚本进行证书订阅
`acme.sh --issue -d <你的域名>  --stateless`

如果你域名下还有网站的需求 可以使用Cloudflare的路由功能
路径为 
`<你的域名>/.well-known/acme-challenge/*`

#### 关于多机使用Stateless ACME的事项
在`acme.sh --register-account`之后会在acme ca账户目录创建一个`account.key`的密钥文件

密钥文件的位置通常为:
`~/.acme.sh/ca/<你的ACME CA提供者>/directory/account.key`
以Let's Encrypt为例:
`~/.acme.sh/ca/acme-v02.api.letsencrypt.org/directory/account.key`

然后将account.key文件分发到其他acme.sh客户端的相同位置
之后执行`acme.sh --register-account`就可以统一密钥特征

如果害怕文件夹输错可以使用`acme.sh --create-account-key`来让acme.sh为你创建拥有`account.key`的文件夹把自动生成的这个替换成你自己的就行

经测试邮箱信息**不会影响特征值**
