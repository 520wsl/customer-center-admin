<template>
	<div>
		<Card class="md-card">
			<div slot="title">消息记录</div>
			<div class="btn-group flex">
				<div class="flex-left">
					<Button class="btn" icon="ios-call" type="success" ghost>拨号</Button>
					<Button class="btn" icon="md-settings" type="info" ghost>电话号码采集</Button>
					<Button class="btn" icon="md-settings" type="info" ghost>账号密码采集</Button>
				</div>
				<div class="flex-right">
					<Button class="btn" icon="md-refresh" type="warning" ghost>刷新</Button>
				</div>
			</div>
		</Card>
		<Card class="md-card message">
			<Form>
				<FormItem label="">
					<Input
						v-model="replyMessage"
						type="textarea"
						:autosize="{minRows: 5,maxRows: 30}"
						placeholder="请填写回复信息。。。"
					>
						<span></span>
					</Input>
				</FormItem>
			</Form>
			<div class="btn-group flex message-bottom">
				<div class="flex-left flex">
					<div class="flex-left flex message-group">
						<div class="flex-left img">
							<img
								src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u101.png"
								alt=""
							>
						</div>
						<div class="flex-left img">
							<img
								src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u102.png"
								alt=""
							>
						</div>
					</div>
					<div class="flex-left btn" style="padding-top:6px;">
						<Upload multiple action="//jsonplaceholder.typicode.com/posts/">
							<Button class="btn" type="primary" ghost icon="ios-cloud-upload">上传附件</Button>
						</Upload>
					</div>
				</div>
				<div class="flex-right move-down">
					<span style="margin-right:30px;">倒计时: 16点47分</span>
					<Button class="btn" type="success" ghost>回复</Button>
				</div>
			</div>
		</Card>
		<Card class="md-card message">
			<Card class="md-card">
				<div class="flex message-top">
					<div class="flex-left">
						<span>项婷（新少林）：</span>
					</div>
					<div class="flex-right">2018-01-02 13:20</div>
				</div>
				<div
					class="message-counter"
				>客户要求美工的图做的再精细一点再精细一点再精细一点，但实际上我们的图已经做的很靖西很精细了，所以我反馈给客户说我们会努力的把图做的更精细一点</div>
				<div class="flex message-bottom">
					<div class="flex-left flex message-group">
						<div class="flex-left img">
							<img
								src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u101.png"
								alt=""
							>
						</div>
						<div class="flex-left img">
							<img
								src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u102.png"
								alt=""
							>
						</div>
					</div>
					<div class="flex-right btn-group move-down">
						<Button type="primary" class="btn" icon="ios-cloud-download" ghost>下载附件</Button>
					</div>
				</div>
			</Card>
			<Card class="md-card message">
				<div class="flex message-bottom">
					<div class="flex-left">
						<span>客户：</span>
					</div>
					<div class="flex-right">2018-01-02 13:20</div>
				</div>
				<div
					class="message-counter"
				>客户要求美工的图做的再精细一点再精细一点再精细一点，但实际上我们的图已经做的很靖西很精细了，所以我反馈给客户说我们会努力的把图做的更精细一点</div>
				<div class="flex message-bottom">
					<div class="flex-left flex message-group">
						<div class="flex-left img">
							<img
								src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u101.png"
								alt=""
							>
						</div>
						<div class="flex-left img">
							<img
								src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u102.png"
								alt=""
							>
						</div>
					</div>
					<div class="flex-right btn-group move-down">
						<Button type="primary" class="btn" icon="ios-cloud-download" ghost>下载附件</Button>
						<Button type="warning" class="btn" icon="ios-brush" ghost>编辑摘要</Button>
					</div>
				</div>
			</Card>
		</Card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			replyMessage: "22"
		};
	}
};
</script>
