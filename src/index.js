const childProcess = require('child_process');
const config = require('./config');

/**
 * 杀死子进程
 */
const killCp = (cp) => {
	cp.manualKilled = true;
	cp.stdin.pause();
	cp.kill();
};

/**
 * 重生
 */
const respawn = () => {
	const cp = childProcess.spawn('cmd.exe', ['/c', config.watchProgram]);
	cp.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});
	cp.stdout.on('data', async (source) => {
		const logText = source.toString();
		const isMatch = config.indicators.restarts.some((restart) => {
			return logText.indexOf(restart) > -1 || (typeof restart === 'function' && restart(logText));
		});
		if (isMatch) {
			console.log('\x1b[31mFound restart indicator. Killed child process. Respawning...\x1b[0m');
			killCp(cp);
			restart();
		} else {
			console.log(logText);
		}
	});
	cp.stdout.on('close', () => {
		if (!cp.manualKilled) {
			if (config.restartIfProcessDead) {
				console.log('\x1b[31m程序已结束\x1b[0m');
				restart();
			}
		}
	});
};

const restart = () => {
	console.log(`\x1b[31m程序将在 ${config.restartDelay} 秒重启\x1b[0m`);
	setTimeout(respawn, config.restartDelay * 1000);
};

respawn();
