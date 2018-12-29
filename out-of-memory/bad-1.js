// 密集型运算

// 示例1：
// 当我们需要批量处理一些数据（如：更新用户某项信息）时，
// 我们可能需要一个较大的for或while循环来完成所有的数据的更新，如：
for (var i = 0; i < 10000000; i++) {
  (i => {
    var site = {};
    site.name = 'BalmJS';
    site.domain = 'balmjs.com';

    // 这里是一个保存或更新等操作
    setTimeout(() => {
      console.log(i, site);
    }, 0);
  })(i);
}
