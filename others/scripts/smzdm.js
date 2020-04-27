const maid = getMaid('com.smzdm.client.android')

function task () {
  maid.launch()
  waitForActivity('com.smzdm.client.android.activity.HomeActivity')
  sleep(2000)
  const cancelUpdateBtn = id('iv_content_cancel').findOnce()
  const cancelAd = id('dialog_home_ads_close').findOnce()
  if (cancelUpdateBtn) {
    cancelUpdateBtn.click()
    sleep(1000)
  } else if (cancelAd) {
    cancelAd.click()
    sleep(1000)
  }

  const upEntry = text('签到福利').findOnce()
  if (upEntry) {
    clickWidget(upEntry)
    waitForActivity('com.smzdm.client.android.user_center.signin.SignInActivity')
    sleep(2000)
  }

  maid.close()
}

module.exports = task
