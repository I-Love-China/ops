## 功能列表 & 使用
### MySqlBackup
- 备份数据库，包含建表语句: `npx dotenv-run-script .env.db.32111 -- mysqldump`

### GitlabBackup
- 备份个人的所有项目: `npm run env-gitlab-oms gitlabdump`

### CryptoCommand
- 使用 AES 加解密: `node index.js crypt -c [e|d] -p password -i input`