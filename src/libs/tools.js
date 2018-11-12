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
