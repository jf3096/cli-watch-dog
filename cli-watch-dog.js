module.exports = {
	/**
	 * 检测路径
	 * 同一级文件夹可以直接
	 */
	watchProgram: './test/http-server.bat',
	/**
	 * 重启延迟, 单位: 秒
	 */
	restartDelay: 5,
	/**
	 * 指标
	 */
	indicators: {
		/**
		 * 重启的字标, 当检测到下列字段时重启子进程.
		 * 场景: 例如我在使用 hpool 1.3.0 版本出现扫盘超时的时, 傻逼程序 hpool 不会自动重启, 此时我可以使用当前工具进行检测并自动重启这个进程
		 */
		restarts: [
			'Not found',
		],
	},
	/**
	 * 当进程挂掉后重启
	 */
	restartIfProcessDead: true,
};