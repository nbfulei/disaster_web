// Generated on 2016-03-30 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files','uglify-save-license', 'del']
});
var cleanCSS = require('gulp-clean-css');
var path = require('path')
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var util = require('util');
var wiredep = require('wiredep').stream;
var proxyMiddleware = require('http-proxy-middleware');

/*压缩插件start*/
//图片压缩
var imagemin=require('gulp-imagemin');
//压缩图片类型 png,jpg
var pngquant=require('imagemin-pngquant');
/*压缩插件end*/


//sass编译
gulp.task('styles',function(){
   return gulp.src('app/styles/*.scss')
        .pipe($.sass({outputStyle:'expanded',precision:10}))
        .pipe($.autoprefixer())
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest(".tmp/styles"))
});
//script检测
gulp.task('scripts',function(){
   return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest(".tmp/scripts"))
});
//js,css等文件注入
gulp.task('inject',['styles','scripts'],function(){
  //注入css文件
  var injectStyles = gulp.src([
    path.join('.tmp', '/**/*.css'),
    path.join('app','/**/*.css')
    ], { read: false});
  //注入js文件
  var injectScripts = gulp.src([
    path.join('app', 'scripts/**/*.js')
  ]).pipe($.angularFilesort());//����ע��angular�ű�
  //注入文件的地址项
  var injectOptions = {
    ignorePath: ['app', path.join('.tmp', '/')],
    addRootSlash: false
  };
  return gulp.src('app/**/*.html')
       .pipe($.inject(injectStyles, injectOptions))
       .pipe($.inject(injectScripts,injectOptions))
       .pipe(wiredep({
        directory:'bower_components'
       }))
       .pipe(gulp.dest('app'))
});
//返回文件启动类型
function isOnlyChange(event) {
  return event.type === 'changed';
};
//监听文件
gulp.task('watch',['inject'],function(){
  //监听html,bower.json等变化
  // gulp.watch([path.join('app', '/**/*.html'), 'bower.json'], ['inject']);
  gulp.watch([
    path.join('app', '/**/*.css'),
    path.join('app', '/**/*.scss')
    ], function(event) {
      if(isOnlyChange(event)) {
        gulp.start('styles');
      } else {
        gulp.start('inject');
      }
  });
  //监听JS文件变化
  gulp.watch(path.join('app', '/**/*.js'), function(event) {console.log(event)
    if(isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('inject');
    }
  });
  //监听html文件变化
  gulp.watch(path.join('app', '/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});
//服务启动
function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  //根据项目目录，启动加载bower项
  if(baseDir === 'app' || (util.isArray(baseDir) && baseDir.indexOf('app') !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,//地址启动项
    routes: routes  //bower加载项
  };
  /*
   * You can add a proxy to your backend by uncommenting the line bellow.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
   */
   var context=['/areas','/socket.io','/bigViews','/flowSwitch','/assess','/disaster','/monitor','/om','/switch','/status','/Load','/operation','/dr','/manage','/oggProcess','/array','/inspection'];//请求地址API
   var options={
    target: 'http://127.0.0.1:8888'//请求地址端口
    //target:'http://192.168.0.41:8080'
    //target:'http://192.168.0.148:8080'
    //target:'http://192.168.0.249:8080'
   };
   server.middleware =proxyMiddleware(context,options);//代理设置

  browserSync.instance = browserSync.init({
    startPath: '/',//启动地址
    server: server,//服务启动
    browser: browser//加载bower文件
  });
}
browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));
//服务启动
gulp.task('serve', ['watch'], function () {
  browserSyncInit([path.join('.tmp', '/'),'app']);//启动地址项
});
//build
gulp.task('images', function () {
  return gulp.src('app/img/*.*')
    .pipe(gulp.dest('dist/img'));
});
gulp.task('build',['inject','images','fonts'],function(){
  var htmlFilter=$.filter(['**/*.html','!node_modules'], {restore: true});
  var jsFilter = $.filter(['**/*.js','!node_modules'], {restore: true});
    var cssFilter = $.filter(['**/*.css','!node_modules'], {restore: true});
  var assets=$.useref.assets();
  return gulp.src(path.join('app', '/**/*.html'))
       .pipe(assets)
       .pipe($.rev())
       .pipe(jsFilter)
       .pipe($.ngAnnotate())
       .pipe($.uglify())
       .pipe(jsFilter.restore)
       .pipe(cssFilter)
       .pipe(cleanCSS({compatibility: 'ie8'}))
       .pipe($.csso())
       .pipe(cssFilter.restore)
       .pipe(assets.restore())
       .pipe($.useref())
       .pipe($.revReplace())
       .pipe(htmlFilter)
       .pipe($.minifyHtml({
        empty: true,//不删除空属性
        spare: true,//不删除冗余属性
        quotes: true,//不删除任意引号
        conditionals: true//不删除ie引导的条件属性
      }))
       .pipe(htmlFilter.restore)
       .pipe(gulp.dest("dist"));
});
gulp.task('fonts', function () {
  console.log('1111');
  return gulp.src('bower_components/bootstrap/fonts/*.*')//
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())//递归
    .pipe(gulp.dest(path.join('dist', '/fonts/')));
});
//文件注入
gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join('app', '/**/*'),
    path.join('!app', '/**/*.{html,js,css,png,gif,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join('dist', '/')));
});
//清空临时文件
gulp.task('clean', function (done) {
  $.del([path.join('dist', '/'), path.join('.tmp', '/')], done);
});

//压缩
//启动压缩
gulp.task('build', ['html','fonts','other','imageMin','commonInject']);
/*开始压缩文件*/
gulp.task('html', ['inject', 'partials'], function () {
  //测试文件导入
  var partialsInjectFile = gulp.src(path.join('.tmp', '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join('.tmp', '/partials'),
    addRootSlash: false
  };
  //需要压缩的js，html，css等文件地址
  var htmlFilter = $.filter('**/*.html',{restore: true});
  var jsFilter = $.filter('**/*.js',{restore: true});
  var cssFilter = $.filter('**/*.css',{restore: true});
  var assets;

  return gulp.src(path.join('.tmp', '/**/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))//导入测试文件
    .pipe(assets = $.useref.assets())//定义一个解析html中build:{type}模块解析器
    .pipe($.rev())//重命名文件
    .pipe(jsFilter)//需要压缩的js文件地址
    .pipe($.ngAnnotate())//压缩angular代码
    .pipe($.uglify({compress:false,mangle:true,preserveComments:'all'})).on('error', errorHandler('Uglify'))//压缩文件，使文件变小
    .pipe(jsFilter.restore)//文件修复，并新建压缩后的文件
    .pipe(cssFilter) //需要压缩的css文件地址
    .pipe($.csso())//css追踪器，压缩css文件
    .pipe(cssFilter.restore)//文件修复，并新建压缩后的文件
    .pipe(assets.restore())//解析html文件中有(build:{type})的模块,并将里面的文件合并起来
    .pipe($.useref())//将html中的模块文件关连起来
    .pipe($.revReplace())//重写已经重新命名的文件
    .pipe(htmlFilter) //需要压缩的html文件地址
    .pipe($.minifyHtml({
      empty: true,//不删除空属性
      spare: true,//不删除冗余属性
      quotes: true,//不删除任意引号
      conditionals: true//不删除ie引导的条件属性
    }))
    .pipe(htmlFilter.restore)//文件修复，并新建压缩后的文件
    .pipe(gulp.dest(path.join('dist', '/')))//输出文件地址
    //.pipe($.size({ title: path.join('dist', '/'), showFiles: true }));//显示压缩后的文件大小
});
//以bower.json为源解析
gulp.task('fonts', function () {
  return gulp.src('bower_components/bootstrap/fonts/*.*')//以bower.json为源解析
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())//递归
    .pipe(gulp.dest(path.join('dist', '/fonts/')));
});
//文件注入
gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
      path.join('app', '/**/*'),
      path.join('!app', '/**/*.{html,js,css,png,gif,scss}')
    ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join('dist', '/')));
});
//压缩图片
gulp.task('imageMin',function(){
  return gulp.src([
      path.join('app','/img/*.*'),
      path.join('app','/scripts/util/msgBar/img/*.png')
    ])
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img'))
});
//引入不压缩的静态文件
gulp.task('commonInject',function(){
  return gulp.src([
    path.join('app','/common/*.*')
  ]).pipe(gulp.dest('dist/common'));
});
/**
 测试
 */
gulp.task('partials', function () {
  return gulp.src([
      path.join('app', '/**/*.html'),
      path.join('.tmp', '/**/*.html')
    ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {//主要用来处理频繁的工作
      module: 'security',
      root: 'app'
    }))
    .pipe(gulp.dest('.tmp' + '/partials/'));
});
//错误日志信息
function errorHandler(title){
  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
}
