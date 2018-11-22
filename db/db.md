## 简书数据库设计

### 用户基础表 t_user_base

| 字段 | 类型 | 字段长度 | 说明 | 备注 |
| :------: |:------:|:------: | :------: | :------: | 
| id | varchar | 30 | 表主键id | - |
| header_url | varchar | 150 | 用户头像 | - |
| user_name | varchar | 30 | 用户名称 | - |
| user_email | varchar | 30 | 电子邮件 | - |
| phone | varchar | 11 | 用户手机 | - |
| phone_validate | int | 1 | 用户手机是否已经校验 | 0 已校验 / 1 未校验 |
| edit_type | int | 1 | 编译文本类型 | 0 富文本 / 1 markdown |
| language | int | 1 | 语言 | 0 简体中文 / 1 繁体 / 2 英文  |
| receive_msg | int | 1 | 接收简讯 | 0 所有 / 1 我关注的 |
| notice | int | 1 | 邮件通知 | 0 所有动态 / 1 每天未读汇总 / 2 不接收 |
| create_time | date | 100 | 创建时间 | - |

### 个人资料表 t_user_data

| 字段 | 类型 | 字段长度 | 说明 | 备注 |
| :------: |:------:|:------: | :------: | :------: | 
| id | varchar | 30 | 表主键id | - |
| user_id | varchar | 30 | 用户id | - |
| sex | int | 1 | 性别 | 0 男 / 1 女 / 2 保密 |
| introduction | varchar | 150 | 个人简介 | - |
| web | varchar | 500 | 个人网站链接 | - |
| wx_qrcode_url | varchar | 150 | 微信二维码 | - |
| create_time | date | 100 | 创建时间 | - |

### 黑名单表 t_user_blacklist

| 字段 | 类型 | 字段长度 | 说明 | 备注 |
| :------: |:------:|:------: | :------: | :------: | 
| id | varchar | 30 | 表主键id | - |
| user_id | varchar | 30 | 用户id | - |
| black_user_id | varchar | 30 | 拉黑用户id | - |
| create_time | date | 100 | 创建时间 | - |

### 赞赏表 t_user_appreciate

| 字段 | 类型 | 字段长度 | 说明 | 备注 |
| :------: |:------:|:------: | :------: | :------: | 
| id | varchar | 30 | 表主键id | - |
| user_id | varchar | 30 | 用户id | - |
| describe | varchar | 300 | 描述 | - |
| status | int | 1 | 开启状态 | 0 关闭 / 1 开启 |
| create_time | date | 100 | 创建时间 | - |

###  文章类型表/标签表 t_article_type

| 字段 | 类型 | 字段长度 | 说明 | 备注 |
| :------: |:------:|:------: | :------: | :------: | 
| id | varchar | 30 | 表主键id | - |
| type_name | varchar | 30 | 类型名称 | - |
| user_id | varchar | 30 | 用户id | - |
| delete | int | 1 | 是否删除 | 0 正常/1 删除 |
| create_time | date | 100 | 创建时间 | - |

###  文章表 t_article

| 字段 | 类型 | 字段长度 | 说明 | 备注 |
| :------: |:------:|:------: | :------: | :------: | 
| id | varchar | 30 | 表主键id | - |
| title | varchar | 100 | 标题 | - |
| content | varchar | 10000 | 内容 | - |
| user_id | varchar | 30 | 用户id | - |
| type_id | varchar | 30 | 类型id | - |
| article_num | int | 100 | 文章字数 | - |
| ready_num | int | 100 | 阅读数 | - |
| like_num | int | 100 | 喜欢 | - |
| comment_num | int | 100 | 评论数 | - |
| edit_time | date | 100 | 文章编译时间 | - |
| status | int | 1 | 文章状态 | 0 已发布/ 1 删除 /2 私密 |

### 文章备份表/草稿表/历史表 t_article_backup

| 字段 | 类型 | 字段长度 | 说明 | 备注 |
| :------: |:------:|:------: | :------: | :------: | 
| id | varchar | 30 | 表主键id | - |
| article_id | varchar | 30 | 文章表id | - |
| title | varchar | 100 | 标题 | - |
| content | varchar | 10000 | 内容 | - |
| user_id | varchar | 30 | 用户id | - |
| type | int | 1 | 表类型 | 0 草稿 / 1 历史表 |
| delete | int | 1 | 文章是否删除 | 0 正常 / 1 删除 |
| edit_time | date | 100 | 文章编译时间 | - |

### 评论表 t_comment

| 字段 | 类型 | 字段长度 | 说明 | 备注 |
| :------: |:------:|:------: | :------: | :------: | 
| id | varchar | 30 | 表主键id | - |
| article_id | varchar | 255 | 文章表id | - |
| content | varchar | 10000 | 内容 | - |
| user_id | varchar | 30 | 用户id | - |
| edit_time | date | 100 | 编译时间 | - |

### 评论子表 t_comment_multi

| 字段 | 类型 | 字段长度 | 说明 | 备注 |
| :------: |:------:|:------: | :------: | :------: | 
| id | varchar | 30 | 表主键id | - |
| comment_id | varchar | 30 | 文章表id | - |
| content | varchar | 10000 | 内容 | - |
| user_id | varchar | 30 | 用户id | - |
| edit_time | date | 100 | 编译时间 | - |

### 收藏/喜欢表 t_collection

| 字段 | 类型 | 字段长度 | 说明 | 备注 |
| :------: |:------:|:------: | :------: | :------: | 
| id | varchar | 30 | 表主键id | - |
| article_id | varchar | 250 | 文章id | - |
| article_url | varchar | 250 | 文章链接 | - |
| user_id | varchar | 30 | 用户id | - |
| type | int | 1 | 收藏类型 | 0 收藏 / 1 喜欢 |
| create_time | date | 100 | 编译时间 | - |

### 关注表 t_follow

| 字段 | 类型 | 字段长度 | 说明 | 备注 |
| :------: |:------:|:------: | :------: | :------: | 
| id | varchar | 30 | 表主键id | - |
| author_id | varchar | 250 | 作者id | - |
| user_id | varchar | 30 | 用户id | - |
| create_time | date | 100 | 编译时间 | - |
