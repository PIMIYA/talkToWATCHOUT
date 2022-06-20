# talk to WATCHOUT #

## Prerequisites ##

- npm = 6.14.16
- node = 12.22.12

## Install ##

```sh
npm install
```

## Usage ##

```sh
sudo node app.js
```

## Note ##

### process.js ###

- UDP 接收/傳送 WATCHOUT的訊號。
- 依據每個場景，啟動計時，觸發cue。

### btnManager.js ###

- 按鈕功能：按下按鈕，回送按鈕在矩陣的座標。

### wsController.js ###

- 按鈕燈功能：控制ws2813 led 在矩陣裡的亮暗、顏色。

## TODO ##

- 喇叭功能：播放每個場景音效包的wav檔。需可隨機播放資料夾檔案/指定播放資料夾裡某個檔案。
- 燈條功能：呼吸/跟音樂節拍閃爍/
  