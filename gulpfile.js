/****************************************************************************
 Copyright (c) 2014 Louis Y P Chen.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
/**
 * Created by Louis Y P Chen on 2014/12/30.
 */
var gulp = require('gulp'),

    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    fs = require('fs'),
    path = require('path'),
    gReplace = require('gulp-replace'),
    rd = require("rd"),
    gulpsync = require('gulp-sync')(gulp),
    gutil = require('gulp-util'),
    inject = require("gulp-inject"),
    crypto = require('crypto'),
    rename = require("gulp-rename"),
    swig = require("swig"),
    concat = require("gulp-concat"),
        fileIncluder = require("gulp-file-includer"),
    prettify = require('gulp-prettify'),
    includer = require('gulp-htmlincluder');

var magenta = gutil.colors.magenta;
var cyan = gutil.colors.cyan;
var red = gutil.colors.red;


var htmlDir = ["html"],
    buildCfg = "build.json",
    injectCfg = "injectCfg.json",
    injectionDefault = [
        //js
        "src/jq.js",
        "src/t.js",
        "src/cobra.js",
        "src/plugins/metisMenu/jquery.metisMenu.js",
        //css
        "style/css/bootstrap.min.css",
        "style/font-awesome/css/font-awesome.css",
        "style/css/plugins/iCheck/custom.css",
        "style/css/plugins/chosen/chosen.css",
        "style/css/animate.css",
        "style/css/style.css"
    ],
    gDest = "bin";

function getbuildCfg(config){
    var data = fs.readFileSync(config, "utf-8");
    return JSON.parse(data);
}

function setTestPath(){
    gDest = "D:\\SVN\\dev\\pms";
}

function setRCOrProPath(){
    gDest = "D:\\SVN\\trunk\\pms";
}

function setUnitPath(){
    gDest = "D:\\SVN\\udev\\pms";
}


function md5(text){
    return crypto.createHash('md5').update(text).digest('base64');
}

var g_data = getbuildCfg(buildCfg), g_injectData = getbuildCfg(injectCfg);
//g_data.version = md5(g_data.version);
//only update cobra
gulp.task("cobra", function(){
    //console.log(__dirname);
    return gulp.src(["src/cobra.js"]).pipe(gReplace(/{{version}}/g, g_data.version)).pipe(gReplace(/{{loginPage}}/g, g_data.loginPage)).pipe(gReplace(/{{debug}}/g, g_data.debug))
        .pipe(uglify()).pipe(gulp.dest(gDest));
});

function dirs(from,minify){
    var dirs = fs.readdirSync(from);
    dirs.forEach(function(dir){
        var extname = path.extname(dir);
        if(extname){
            if(extname == ".js") return minify ? miniJS(path.join(from, dir), path.join(gDest, from)) : moveTo(path.join(from, dir), path.join(gDest, from));
            if(extname == ".css") return minify ? miniCSS(path.join(from, dir), path.join(gDest, from)) : moveTo(path.join(from, dir), path.join(gDest, from));
        }else{
            dir = path.join(from, dir);
            rd.eachSync(dir, function(f,s){
                var ext = path.extname(f),
                    basePath = path.join(gDest, path.dirname(f).replace(__dirname,""));
                switch (ext){
                    case ".js":
                        return minify ? miniJS(f, basePath) : moveTo(f, basePath);
                        break;
                    case ".css":
                        return minify ? miniCSS(f, basePath) : moveTo(f, basePath);
                        break;
                    default :
                        return moveTo(f, basePath);
                        break;
                }
            });
        }
    });
}
function miniJS(source, dest){
    if(source.indexOf("cobra.js") > -1){
       return gulp.src(source).pipe(gReplace(/{{version}}/g,g_data.version)).pipe(gReplace(/{{debug}}/g, g_data.debug)).pipe(gReplace(/{{loginPage}}/g, g_data.loginPage)).pipe(uglify()).pipe(gulp.dest(dest));
    }else{
        if(source.indexOf("cfg.js")> -1) return;
        return gulp.src(source).pipe(uglify()).pipe(gulp.dest(dest));
    }
}
function miniCSS(source, dest){
    return gulp.src(source).pipe(minifycss({keepBreaks:false})).pipe(gulp.dest(dest));
}
function moveTo(source, dest){
    if(source.indexOf("cobra.js") > -1){
        return gulp.src(source).pipe(gReplace(/{{version}}/g, g_data.version)).pipe(gReplace(/{{debug}}/g, g_data.debug)).pipe(gReplace(/{{loginPage}}/g, g_data.loginPage)).pipe(gulp.dest(dest));
    }
    if(source.indexOf("cfg.js")> -1) return;
    return gulp.src(source).pipe(gulp.dest(dest));
}

gulp.task("src", function(){
    dirs("src", true);
});

gulp.task("css", function(){
    dirs("style",true);
});
gulp.task("cfg", function(){
    dirs("cfg",true);
});

gulp.task("src-dev", function(){
    dirs("src", false);
});

gulp.task("css-dev", function(){
    dirs("style", false);
});
gulp.task("cfg-dev", function(){
    dirs("cfg", false);
});

gulp.task("t", function(){
    setTestPath();
});

gulp.task("o", function(){
    gDest = "bin";
});

gulp.task("r", function(){
    setRCOrProPath();
});

gulp.task("u", function(){
    setUnitPath();
});

gulp.task("html",gulpsync.sync(["src","cfg", "css"]), function(){
    weaveHTML();
});

gulp.task("html-dev",gulpsync.sync(["src-dev","cfg-dev", "css-dev"]), function(){
    weaveHTML();
});

function weaveHTML(){
    htmlDir.forEach(function(dir){
        rd.eachSync(dir, function(f, s){
            (function(){
                var extname = path.extname(f);
                if(extname === ".html"){
                    var key = path.basename(f, extname), bastPath = path.join(gDest, dir), injectSuspect = buildInject(g_injectData[key]);
                    if(injectSuspect.length > 0){
                        gulp.src(f).
                            pipe(fileIncluder({def : g_data.nav, doT : true}))
                            .pipe(inject(gulp.src(injectSuspect, {read: false}),{relative:true, v:g_data.version}))
                            .pipe(includer()).pipe(prettify({indent_size: 2})).pipe(gulp.dest(bastPath));
                    }else{
                        gulp.src(f).pipe(fileIncluder({def : g_data.nav, doT : true})).pipe(includer()).pipe(prettify({indent_size: 2})).pipe(gulp.dest(bastPath));
                    }
                }
            })();
        });
    });
}

function mkdirsSync(dirname, mode){
    if(fs.existsSync(dirname)){
        return true;
    }else{
        if(mkdirsSync(path.dirname(dirname), mode)){
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
}

function buildHost(env){
    var isStub = false;
    if(env === "stub") {
        env = "dev";
        isStub = true;
    }
    var data = {}, cfg = "cfg", target = path.join(gDest, "cfg/host"), m = env === "production" ? "" : "." + env, includes = g_data["includes"],
        tpl = "cobra.add({{cfg|json|raw}});";
    cfg = cfg + m + ".js";
    var host = g_data[env];
    for(var p in includes){
        data[p] = includes[p].replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g, function(){
            return host;
        });
    }
    data[env] = host;
    data["use"] = env;
    if(isStub){
        data["stub"] = "stub";
        data["use"] = "stub";
    }
    data = swig.render(tpl, {
        locals : {
            cfg : data
        }
    });
    mkdirsSync(target);
    fs.writeFileSync(path.join(target, cfg), data);
}

gulp.task("env-dev", function(){
   buildHost("dev");
});

gulp.task("env-stub", function(){
    buildHost("stub");
});

gulp.task("env-test", function(){
    buildHost("test");
});

gulp.task("env-rc", function(){
    buildHost("rc");
});

gulp.task("env-u", function(){
    buildHost("u");
});

gulp.task("env-pro", function(){
    buildHost("production");
});

gulp.task("env-all", ["env-dev", "env-u", "env-test", "env-rc", "env-pro"], function(){
   console.log("build all environment configs ");
});

function buildInject(i){
    if(!i) return [];
    var data = [];
    data = data.concat(injectionDefault);
    data = data.concat(i.script);
    data = data.concat(i.style);
    if(i.exclude){
        i.exclude.forEach(function(e){
            var index = data.indexOf(e);
            if(index > -1){
                data.splice(index,1);
            }
        });
    }
    return data;
}

function clearBin(from){
    var files = [];
    if( fs.existsSync(from) ) {
        files = fs.readdirSync(from);
        files.forEach(function(file,index){
            var curPath = from + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                clearBin(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(from);
    }
}

gulp.task("dummy", function(){
    gulp.src("stub/*.json").pipe(gulp.dest(path.join(gDest, "stub")));
});

gulp.task("clear", function(){
    clearBin(gDest);
});

gulp.task("dev", gulpsync.sync(["clear", "o", "html-dev", "env-dev", "watch-dev"]), function(){
    console.log("build development version");
});

gulp.task("ut", gulpsync.sync(["u","html-dev", "env-u"]), function(){
    console.log("build unit test version");
});

gulp.task("test", gulpsync.sync(["t","html-dev", "env-test"]), function(){
    console.log("build test version");
});

gulp.task("rc", gulpsync.sync(["r","html", "env-rc", "env-pro"]), function(){
    console.log("build rc version");
});

gulp.task("stub", gulpsync.sync(["clear", "o", "html-dev", "env-stub", "dummy", "watch-dev"]), function(){
    console.log("build stub version");
});

gulp.task("watch-dev", function(){
    setTimeout(function(){
        gulp.watch("src/*.js", ["src-dev"]);
        gulp.watch("src/*/*.js", ["src-dev"]);
        gulp.watch("cfg/*/*.js", ["cfg-dev"]);
        gulp.watch("style/*/*.css", ["css-dev"]);
        gulp.watch("html/*.html", ["html-dev"]);
        gulp.watch("common/templates/*.html", ["html-dev"]);
    }, 500);
});

function log(message){
    gutil.log(magenta("Cobra"), message);
}
