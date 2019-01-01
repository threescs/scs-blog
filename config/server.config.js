/**
 * server config
 */
const path = require('path');
// 交互式命令行
const { argv } = require('yargs');

exports.APP = {
	LIMIT: 10,
	PORT: 8000,
	ROOT_PATH: __dirname,
	NAME: 'threescs',
	URL: 'http://www.shangchengshuai.com',
	FRONT_END_PATH: path.join(__dirname, '..', 'shangchengshuai'),
};

exports.CROSS_DOMAIN = {
	allowedOrigins: [
		'http://www.shangchengshuai.com',
		'https://github.com/threescs',
	],
	allowedReferer: 'threescs',
};

exports.MONGODB = {
	uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/blogScsNode`,
	username: argv.db_username || 'DB_username',
	password: argv.db_password || 'DB_password',
};
exports.AUTH = {
	data: argv.auth_data || { user: 'root' },
	jwtTokenSecret: argv.auth_key || 'blog-Scs-node',
	defaultPassword: argv.auth_default_password || 'root',
};

exports.EMAIL = {
	account: argv.email_account || 'your email address like : i@threescs',
	password: argv.email_password || 'your email password',
	from: 'https://github.com/threescs',
	admin: 'threescs',
};

exports.AKISMET = {
	key: argv.akismet_key || 'your akismet Key',
	blog: argv.akismet_blog || 'your akismet blog site, like: http://www.shangchengshuai.com',
};

exports.GITHUB = {
	username: 'threescs',
};

exports.ALIYUN = {
	ip: argv.aliyun_ip_auth,
};

exports.BAIDU = {
	site: argv.baidu_site || 'your baidu site domain like : threescs',
	token: argv.baidu_token || 'your baidu seo push token',
};

exports.QINIU = {
	accessKey: argv.qn_accessKey || 'your access key',
	secretKey: argv.qn_secretKey || 'your secret key',
	bucket: argv.qn_bucket || 'your bucket name',
	origin: argv.qn_origin || 'http://nodepress.u.qiniudn.com',
	uploadURL: argv.qn_uploadURL || 'http://up.qiniu.com/',
};

exports.INFO = {
	github: 'https://github.com/threescs',
	powered: ['react', 'Nodejs', 'MongoDB', 'Express'],
};
