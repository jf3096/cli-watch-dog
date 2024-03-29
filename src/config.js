const paths = require('./paths');
const fs = require('fs');
const path = require('path');

/**
 * 配置
 */
class Config {
	/**
	 * 标准化 watch program 路径
	 */
	normalizeWatchProgram(watchProgram) {
		const isAbsolutePath = path.isAbsolute(watchProgram);
		let finalWatchProgramPath;
		if (isAbsolutePath) {
			finalWatchProgramPath = watchProgram;
		} else {
			finalWatchProgramPath = path.resolve(process.cwd(), watchProgram);
		}
		fs.accessSync(finalWatchProgramPath);
		this.watchProgram = finalWatchProgramPath;
	}

	/**
	 * 标准化 indicator
	 */
	normalizeIndicators(indicators) {
		if (!indicators.restarts) {
			throw new Error('配置文件格式不正确, indicators.restarts 无法找到');
		}

		if (!Array.isArray(indicators.restarts)) {
			throw new Error('配置文件格式不正确, indicators.restarts 必须为数组类型');
		}

		indicators.restarts.forEach((restart) => {
			const restartType = typeof restart;
			if (restartType !== 'string' && restartType !== 'function') {
				throw new Error('配置文件格式不正确, indicators.restarts 每一项必须为 string 或 function 类型');
			}
		});

		indicators.restarts.forEach((restart) => {
			const restartType = typeof restart;
			if (restartType !== 'string' && restartType !== 'function') {
				throw new Error('配置文件格式不正确, indicators.restarts 每一项必须为 string 或 function 类型');
			}
		});

		this.indicators = indicators;
	}

	/**
	 * 校验重启延迟时间
	 */
	validateRestartDelay(restartDelay) {
		if (typeof restartDelay === 'number' && restartDelay >= 0) {
			this.restartDelay = restartDelay;
			return;
		}
		throw new Error('配置文件格式不正确, restartDelay 必须为有效数字类型且必须大于等于0');
	}

	/**
	 * 加载
	 */
	load() {
		const configPath = paths.config;
		fs.accessSync(configPath);
		const config = require(configPath);
		this.normalizeWatchProgram(config.watchProgram);
		this.normalizeIndicators(config.indicators);
		this.validateRestartDelay(config.restartDelay);
		this.restartIfProcessDead = config.restartIfProcessDead;
	}
}

const config = new Config();
config.load();

module.exports = config;