# 简介

书柜项目

## 技术栈

- SqlLite
- Prisma2
- typescript
- Koa
- Redis

## 思路

- 用户身份认证
- 用户管理自己的书柜

- 管理员身份认证
- 用户管理
- 角色管理
- 权限管理（菜单，数据颗粒，数据操作）
- 书柜管理

### 认证

#### 注册

1. 校验信息(用户名，密码, 邮箱)
2. 创建用户(..., 状态)
3. 成功注册

#### 忘记密码

阶段 = A

1. 校验信息(邮箱)
2. 检查信息有效性
3. 生成校验码
4. 生成邮件代码
5. 发送邮件
6. 发送成功

阶段 = B

1. 校验信息(邮箱，用户名，校验码，新密码)
2. 检查信息有效性
3. 设置成功

#### 登录

1. 校验信息(用户名，密码)
2. 检查信息有效性
3. 生成 token
4. 登录成功

#### 身份校验

1. 检验信息(token)
2. 检查信息有效性
3. 检查用户有效性
4. 校验成功(通过/未通过)

### 错误拦截器

1. 数据库错误
2. 服务层错误
3. 校验层错误
4. 应用层错误
