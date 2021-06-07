# cli-watch-dog

> cli 命令行看门狗, 用于监听 cli 命令中出现特定语句时触发如重启命令.

## 适用平台

- window

## 机制
1. 打开 `cli-watch-dog-x.x.exe` 后, cli-watch-dog 会使用子进程的方式启动 hpool 官方程序 `hpool-miner-chia-console.exe`
2. 打开后 `cli-watch-dog-x.x.exe` 会监听所有日志, 当日志出现 `超过最大时间限制` 关键词时自动杀掉 `hpool-miner-chia-console.exe` 进程并重启

## 使用方式
1. 将仓库中的 cli-watch-dog-x.x.exe 复制到 hpool 挖矿程序目录中, 后续启动直接使用 `cli-watch-dog-x.x.exe` 即可

## 个人日常使用
为了方便矿机开关, 个人在 window 中将当前程序加入到开启启动中, 详细步骤如下:

1. 复制好 `cli-watch-dog-x.x.exe` 到指定目录后, 右键 `cli-watch-dog-x.x.exe` 发送到 `桌面快捷方式`
2. 使用快捷键 `win+r` 打开 `window 运行`, 并输入 `shell:startup`, 打开系统启动项目录
3. 将桌面 `快捷方式 cli-watch-dog-x.x.exe` 剪切到 `系统启动项目录` 即可做到开机启动

## API

目前大部分 API 已经在配置文件 `cli-watch-dog.js` 中有详细说明了, 故请根据配置文件中的注释编写即可. 以下为配置文件的拷贝方便使用者快速阅读

```js
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
```


## 360 安全警告
由于源码不足 30 行, 欢迎简单阅读. 不存在任何安全风险

## 变更日志

## 1.0.1 (2021-05-30)

* feat: 在 `cli-watch-dog.js` 配置文件中新增参数 `restartDelay`、`restartIfProcessDead`, 用于当子进程挂掉时能够及时重启 

## 1.0.0 (2021-05-22)

* init commit

## 作者
She Ailun
