// 操作的数据量较大

// 示例2：对象需要频繁的创建/销毁，或操作对象本身较大，如：
var sites = [];

for (var x = 0; x < 5000; x++) {
  var site = [];
  for (var y = 0; y < 5000; y++) {
    site = [y, 'BalmJS', 'balmjs.com'];
    sites.push(site);
  }
}
