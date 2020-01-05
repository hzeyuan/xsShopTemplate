<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
			// uni.hideTabBar()
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";
	@import 'colorui/main.css';
	@import 'colorui/icon.css';
	@import 'colorui/animation.css';
</style>
