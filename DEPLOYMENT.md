# CECC网站部署到ionos配置指南

## 域名信息
- 域名：www.ccecx.com
- 托管服务：ionos

## 文件上传清单

### 必需文件
```
根目录文件：
├── index.html
├── about.html
├── contact.html
├── projects.html
├── safety.html
├── services.html
├── 404.html
├── .htaccess
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── img/
        ├── about/
        ├── common/
        ├── home/
        ├── projects/
        ├── safety/
        └── services/
```

## ionos配置步骤

### 1. 文件上传
1. 登录ionos控制面板
2. 进入网站管理
3. 使用FTP或文件管理器上传所有文件到网站根目录（通常是 `htdocs` 或 `public_html`）
4. 确保文件权限正确设置（644 for files, 755 for directories）

### 2. 域名解析配置
在ionos DNS管理中添加以下记录：

```
类型: A
名称: www
值: [ionos提供的IP地址]
TTL: 3600

类型: A
名称: @
值: [ionos提供的IP地址]
TTL: 3600

类型: CNAME
名称: ccecx.com
值: www.ccecx.com
TTL: 3600
```

### 3. SSL证书配置
1. 在ionos控制面板中启用SSL证书
2. 选择Let's Encrypt免费证书或购买商业证书
3. 确保证书覆盖 www.ccecx.com 和 ccecx.com

### 4. 网站设置
- 默认文档：index.html
- 错误页面：404.html
- 启用URL重写（.htaccess已配置）

## 功能特性

### URL重写规则
- 自动添加www前缀
- 强制HTTPS重定向
- 移除.html扩展名（如：about.html → about）
- 启用GZIP压缩
- 设置缓存头

### 安全配置
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## 测试检查清单

### 基本功能测试
- [ ] 首页加载正常
- [ ] 所有页面链接工作正常
- [ ] 图片显示正确
- [ ] 联系表单功能正常
- [ ] 项目过滤功能正常
- [ ] 响应式设计在不同设备上正常

### URL测试
- [ ] www.ccecx.com 重定向到 https://www.ccecx.com
- [ ] ccecx.com 重定向到 https://www.ccecx.com
- [ ] about.html 可访问为 about
- [ ] 404页面正常显示

### 性能测试
- [ ] 页面加载速度
- [ ] 图片压缩效果
- [ ] 缓存头设置生效

## 维护说明

### 内容更新
1. 修改相应的HTML文件
2. 上传更新的文件到ionos
3. 清除浏览器缓存测试

### 图片优化
- 使用WebP格式（如果支持）
- 压缩图片文件大小
- 确保所有图片路径正确

### 定期检查
- 监控网站正常运行
- 检查SSL证书有效期
- 备份网站文件
- 更新安全补丁

## 联系信息
如有技术问题，请联系网站管理员。

---
最后更新：2024年






