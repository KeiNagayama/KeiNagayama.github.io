'use strict';

const
	storageName = 'stopWatch_status',
	elem = {};

let
	startTime = 0,
	lapTime = 0,
	lapCount = 0,
	lapRecords = [];

window.onload = function () {
	elem.start.textContent = 'START';
	elem.clear.textContent = 'CLEAR';
	elem.clear;
	clickClear();
};

window.addEventListener('DOMContentLoaded', function () {
	['start', 'clear', 'display', 'lap'].forEach(function (id) {
		elem[id] = document.getElementById(id)
	});

	// ボタンへのイベントリスナー追加
	const e = window.ontouchstart !== undefined ? 'touchstart' : 'mousedown';
	elem.start.addEventListener(e, clickStart);
	elem.clear.addEventListener(e, clickClear);

	timePrint(0, 0);
	const storage = getStorage();
	// localStorageにデータがあれば状態復元
	if (Object.keys(storage).length > 0) {
		startTime = storage.startTime;
		lapTime = storage.lapTime;
		lapRecords = storage.lapRecords;
		// 動作中
		if (startTime > 0) {
			elem.start.textContent = 'STOP';
			elem.clear.textContent = 'LAP';
			countUp();
		}
		// 一時停止中
		else if (startTime < 0) {
			timePrint(-startTime, -lapTime);
		}
		// ラップタイムレコード復元
		if (lapRecords.length > 0) {
			let str = '';
			for (let i in lapRecords) {
				str = '[' + (++lapCount) + '] ' + lapRecords[i] + '<br>' + str;
			}
			elem.lap.innerHTML = str;
		}
	}
});

// START/STOPボタン押下
function clickStart() {
	const now = Date.now();
	// 停止時
	if (startTime <= 0) {
		// 計測開始
		startTime += now;
		lapTime += now;
		countUp();
		elem.start.textContent = 'STOP';
		elem.clear.textContent = 'LAP';
		elem.start.style.backgroundColor = "#f30d"
		elem.clear.style.backgroundColor = "yellow"
	}
	// 動作時
	else {
		// 一時停止
		startTime -= now;
		lapTime -= now;
		timePrint(-startTime, -lapTime);
		elem.start.textContent = 'START';
		elem.clear.textContent = 'CLEAR';
		elem.start.style.backgroundColor = "greenyellow"
		elem.clear.style.backgroundColor = "cyan"
	}
	setStorage();
}

// CLEAR/LAPボタン押下
function clickClear() {
	// 計測中
	if (startTime > 0) {
		// LAP
		const now = Date.now();
		timePrint(now - startTime, now - lapTime);
		lapTimePrint();
		lapTime = now;
		setStorage();
		window.scrollTo(0, 0);
	}
	// 停止中
	else {
		// リセット
		startTime = lapTime = 0;
		timePrint(0, 0);
		elem.lap.textContent = '';
		lapCount = 0;
		lapRecords = [];
		clearStorage();
	}
}

// 計測
function countUp() {
	if (startTime > 0) {
		const now = Date.now();
		timePrint(now - startTime, now - lapTime);
		requestAnimationFrame(countUp);
	}
}

// タイム表示
function timePrint(t, l) {
	elem.display.textContent = timeFormat(l) + ' / ' + timeFormat(t);
}

// 時間表示フォーマット
function timeFormat(t) {
	return Math.floor(t / 36e5) + new Date(t).toISOString().slice(13, 19);
}

// ラップタイムレコード追加
function lapTimePrint() {
	const str = display.textContent;
	lapRecords.push(str);
	elem.lap.innerHTML = lap.innerHTML + '<br>' + '#' + (++lapCount) + '&nbsp;&nbsp;' + str;
}

// localStorageデータ保存
function setStorage() {
	localStorage.setItem(storageName, JSON.stringify({
		startTime: startTime,
		lapTime: lapTime,
		lapRecords: lapRecords,
	}));
}

// localStorageデータ削除
function clearStorage() {
	localStorage.removeItem(storageName);
}

// localStorageデータ取得
function getStorage() {
	const params = localStorage.getItem(storageName);
	return params ? JSON.parse(params) : {};
}

// 現在時刻の表示
function set2fig(num) {
	// 桁数が1桁だったら先頭に0を加えて2桁に調整する
	var ret;
	if (num < 10) { ret = "0" + num; }
	else { ret = num; }
	return ret;
}
function showClock() {
	var nowTime = new Date();
	var nowHour = set2fig(nowTime.getHours());
	var nowMin = set2fig(nowTime.getMinutes());
	var nowSec = set2fig(nowTime.getSeconds());
	var msg = "Current Time: " + nowHour + ":" + nowMin + ":" + nowSec;
	document.getElementById("clock").innerHTML = msg;
}
setInterval('showClock()', 1000);