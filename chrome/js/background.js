chrome.browserAction.setBadgeText({text: 'new'});
chrome.storage.sync.set({color: 'fdsfsdafasdf'}, function() {
	console.log('保存成功！');
});
