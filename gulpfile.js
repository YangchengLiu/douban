//引入gulp
var gulp = require('gulp');
//压缩css插件
var cleanCss = require('gulp-clean-css');
//文件合并
var concat = require('gulp-concat');
//js压缩插件
var uglify = require('gulp-uglify');
//html压缩插件
var htmlmin=require('gulp-htmlmin');
//引入提供静态资源服务的插件
var browserSync=require('browser-sync').create();
//用来刷新浏览器的方法
var reload=browserSync.reload;
gulp.task('default',['cssmin','jsmin','htmlmin'],function(){
    //开启了一个静态资源服务器
    browserSync.init({
        server:{
            baseDir:'./'
        }
    });
    gulp.watch(['src/*.html','src/css/*.css'],['htmlmin','cssmin']);
});
//css压缩
gulp.task('cssmin', function () {
    //获取要处理的文件
    gulp.src('src/css/*.css')
        //压缩操作
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}))
});
//js合并压缩
gulp.task('jsmin', function () {
    gulp.src(['src/js/*.js', 'src/views/**/*.js'])
        //文件合并 参数是文件合并之后的名字
        .pipe(concat('all.min.js'))
        //js代码压缩
        .pipe(uglify())
        //输出处理过后的文件
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream:true}))
});
//html压缩
gulp.task('htmlmin', function () {
   gulp.src('src/*.html')
       .pipe(htmlmin({collapseWhitespace:true}))
       .pipe(gulp.dest('dist'));
    gulp.src('src/views/**/*.html')
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest('dist/views'))
        .pipe(reload({stream:true}))

});