// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass");
const notify = require("browser-sync/dist/public/notify");

var browsersync = require("browser-sync").create();

// サーバーを立ち上げる
gulp.task('browser-sync', function (done) {
  browsersync.init({
    server: {
      baseDir: './'
    },
    //ローカルIPアドレスでサーバーを立ち上げる
    port: 8000,
    open: false,
    notify:false
    //IPアドレスを指定する
    //open: 'external'
    //host: '192.168.XXX.XXX'
  });
  done();
});


// style.scssの監視タスクを作成する
gulp.task("scss:watch", function() {
  // 監視のオプション

  var watchOptions = {
    usePolling: true,
    interval: 1500,
    binaryInterval: 1500
  };  
  // ★ style.scssファイルを監視
  return gulp.watch("css/style.scss", watchOptions, function() {
    // style.scssの更新があった場合の処理

    // style.scssファイルを取得
    return (
      gulp
        .src("css/style.scss")
        // Sassのコンパイルを実行
        .pipe(
          sass({
            outputStyle: "expanded"
          })
            // Sassのコンパイルエラーを表示
            // (これがないと自動的に止まってしまう)
            .on("error", sass.logError)
        )
        // cssフォルダー以下に保存
        .pipe(gulp.dest("css"))
    );
  });
});

gulp.task("default", gulp.series( gulp.parallel('browser-sync', 'scss:watch'), function(){
  // タスクの記述
}));
/*

開発環境の構成は以下のとおりです。
・VirtualBoxを使用。ホストOSはWindows、ゲストOSはLinux。
・ホストOS上のフォルダーをゲストOS側で共有フォルダーとしてマウントする。
・ゲストOS側でgulpを実行する。

この構成の場合、標準のwatchではファイルの変更を検知してくれません。その理由は、
標準のwatchの場合は更新を検知するためにファイルのatime(最終アクセス日時)が使用されるようなのですが、
VirtualBoxの共有フォルダーではatimeが更新されないためです。
そこで、監視オプションに「usePolling: true」を指定して監視方法をポーリング方式に変更し、
能動的に検知するようにしています。ただ、この方式では定期的にファイルの状態を問い合わせることになるため、
その分処理が重くなるのがネックです。「interval: 1500」のように監視のインターバルを指定することができますので、
リアルタイム性とシステム負荷を考慮したうえで決定するのがよいと考えます。

*/