forLoops(0);

function forLoops(i) {
  if (i < 15000000) {
    var site = {};
    site.name = 'BalmJS';
    site.domain = 'balmjs.com';

    // 这里是一个保存或更新等操作
    setTimeout(() => {
      console.log(i, site);
    }, 0);
    process.nextTick(forLoops, (i += 1));
  }
}
