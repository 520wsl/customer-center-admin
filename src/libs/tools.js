import config from "@/config";
export const randomPath = (name, size = "") => {
	const n = Math.floor(Math.random() * 5) + 1;
	return `http://${n}.img.dianjiangla.com/assets/${name}${size}`;
};

export const CDN = name => {
	return config.CDN + name;
};

/*
 * 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒
 * 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00
 * 返回精度为：秒，分，小时，天
 */
export const getDateDiff = (startTime, endTime, diffType) => {
	//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
	startTime = startTime.replace(/-/g, "/");
	endTime = endTime.replace(/-/g, "/");
	//将计算间隔类性字符转换为小写
	diffType = diffType.toLowerCase();
	var sTime = new Date(startTime); //开始时间
	var eTime = new Date(endTime); //结束时间
	//作为除数的数字
	var divNum = 1;
	switch (diffType) {
		case "second":
			divNum = 1000;
			break;
		case "minute":
			divNum = 1000 * 60;
			break;
		case "hour":
			divNum = 1000 * 3600;
			break;
		case "day":
			divNum = 1000 * 3600 * 24;
			break;
		case "month":
			divNum = 1000 * 3600 * 24 * 30;
			break;
		default:
			break;
	}
	return (
		parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum)) || 1
	);
};

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
	return targetarr.some(_ => arr.indexOf(_) > -1);
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
	return Array.from(new Set([...arr1, ...arr2]));
};

export const forEach = (arr, fn) => {
	if (!arr.length || !fn) return;
	let i = -1;
	let len = arr.length;
	while (++i < len) {
		let item = arr[i];
		fn(item, i, arr);
	}
};

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
	const keysArr1 = Object.keys(obj1);
	const keysArr2 = Object.keys(obj2);
	if (keysArr1.length !== keysArr2.length) return false;
	else if (keysArr1.length === 0 && keysArr2.length === 0) return true;
	/* eslint-disable-next-line */ else
		return !keysArr1.some(key => obj1[key] != obj2[key]);
};
