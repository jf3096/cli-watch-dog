const path = require('path');
const constants = require('./constants');

/**
 * 路径配置
 * @type {{config: string}}
 */
const paths = {
	/**
	 * 配置文件路径
	 */
	config: path.resolve(process.cwd(), constants.CONFIG_FILE_NAME),
};

module.exports = paths;