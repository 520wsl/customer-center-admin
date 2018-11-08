import moment from "moment";
/**
 * @Title: 时间处理-工具类提供一些便捷地工具服务
 * @Author: Mad Dragon 【 395548460@qq.com 】
 * @Date: 2017/11/22 22:00
 * @Version V2.0.2
 *
 * =====================================================================
 * @Description: 工具索引
 *     1、formatTime 格式化时间
 *     2、formatAddTime 时间 加法 并 格式化时间
 *     3、formatSubtractTime 时间 减法 并 格式化时间
 *     4、formatInitTime 格式化 初始 时间
 *     5、startTime 搜索 开始时间
 *     6、endTime 搜索 结束时间
 * ============================================================================
 */

/**
 * @Title: 1、格式化时间
 * @Author: Mad Dragon 【 395548460@qq.com 】
 * @Date: 2017/11/22 20:33
 * @Version V2.0.2
 *
 * @param time 需要格式化时间  默认当前时间
 * @param norms 格式化规则 默认 YYYY-MM-DD
 *
 * @Description:
 */
export const formatTime = (time = new Date(), norms = "YYYY-MM-DD") => {
	return (time && moment(time).format(norms)) || "";
};

/**
 * @Title: 2、时间 加法 并 格式化时间
 * @Author: Mad Dragon 【 395548460@qq.com 】
 * @Date: 2017/11/22 20:33
 * @Version V2.0.2
 *
 * @param time 需要格式化时间  默认当前时间
 * @param norms 格式化规则 默认 YYYY-MM-DD
 * @param addNum 加数
 * @param addNorms 加法规则 默认 "days"
 *
 * @Description:
 */
export const formatAddTime = (
	time = new Date(),
	norms = "YYYY-MM-DD",
	addNum = 1,
	addNorms = "days"
) => {
	return (
		(time &&
			moment(time)
				.add(addNum, addNorms)
				.format(norms)) ||
		""
	);
};

/**
 * @Title: 3、时间 减法 并 格式化时间
 * @Author: Mad Dragon 【 395548460@qq.com 】
 * @Date: 2017/11/23 16:28
 * @Version V2.0.2
 *
 * @param time 需要格式化时间  默认当前时间
 * @param norms 格式化规则 默认 YYYY-MM-DD
 * @param addNum 减数
 * @param addNorms 减法规则 默认 "days"
 *
 * @Description:
 */
export const formatSubtractTime = (
	addNum = 1,
	addNorms = "days",
	time = new Date(),
	norms = "YYYY-MM-DD"
) => {
	return (
		(time &&
			moment(time)
				.subtract(addNum, addNorms)
				.format(norms)) ||
		""
	);
};

/**
 * @Title: 4、格式化 初始 时间
 * @Author: Mad Dragon 【 395548460@qq.com 】
 * @Date: 2017/11/24 13:59
 * @Version V2.0.2
 *
 * @param time 初始时间
 * @param norms 时间格式化规则
 * @return string 2017-11-24
 *
 * @Description:
 */
export const formatInitTime = (time = new Date(), norms = "YYYY-MM-DD") => {
	return (time && moment(time).format(norms)) || "";
};

/**
 * @Title: 5、搜索 开始时间
 * @param {*} time 需要格式化时间  默认当前时间
 * @param {*} norms 格式化规则 默认 YYYY-MM-DD
 */
export const startTime = (time = new Date(), norms = "YYYY-MM-DD") => {
	return (
		(formatInitTime(time) && moment(formatInitTime(time)).format(norms)) ||
		""
	);
};

/**
 * 6、搜索 结束时间
 * @param {*} time 需要格式化时间  默认当前时间
 * @param {*} norms 格式化规则 默认 YYYY-MM-DD
 * @param {*} addNum 加数
 * @param {*} addNorms 加法规则 默认 "days"
 */
export const endTime = (
	time = new Date(),
	norms = "YYYY-MM-DD",
	addNum = 1,
	addNorms = "days"
) => {
	return (
		(formatInitTime(time) &&
			moment(formatInitTime(time))
				.add(addNum, addNorms)
				.format(norms)) ||
		""
	);
};
