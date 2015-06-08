/****************************************************************************
 Copyright (c) 2014 Louis W M WU.

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
 * Created by Louis W M Wu on 2014/12/24.
 */

(function (cb) {
    cb._({
        "~name": "seller.promotion",

        "~superclass": cb.base,
        //data
        preferentialData: {

            id: 0,
            base_info: '',
            tip: '',
            start_time: '',
            end_time: '',
            env: [],
            add_ticket: false,
            act_priority: 1,
            selectAll: false,
            perf_list: [],
            good_list: [],
            no_perf_list: [],
            no_good_list: [],

            _Q: -1,
            preferentials: [],
            elements: {}
        },
        //优惠目标设置 object source
        __preferential_data: function () {
            return {
                id: 0,

                _Q: -1,
                target_user: [],
                not_exceed_limit: true,
                rules: [],
                element: '',
                elements: {}
            }
        },
        //单个规则数据
        __preferential_rule: function () {
            return {
                id: 0,
                rule: {
                    //优惠规则类型   type:int  [1,2]  mean:1-金额，2-数量
                    type: 1,
                    //当按额度来优惠的话，value.length>1,value[0]=[1(?<=A),2(?>=A),3(A-?-B)]
                    value: [1, 0, 0]
                },
                apply: {
                    //优惠应用类型： type:int [1,2,3,4,5]  
                    //mean: 1-订单支持货到付款
                    //      2-订单支持免邮
                    //      3-订单以固定折扣  value [count]-折扣
                    //      4-订单减固定金额  value [number]-金额
                    //      5-订单送赠品      value [389,23]-商品IDS
                    type: 1,
                    value: [0, 0]
                },
                element: ''
            }
        },
        ctor: function (options) {
            this.api = "promotion";
            this._super(options);
        },
        //初始化
        postCreate: function () {
            window._sf = this;
            //触发用户信息获取
            this.request("getUserInfo");
        },
        //用户信息处理
        getUserInfoArgs: function () {
            return {
                type: "get",
                data: {},
                done: cobra.ride(this, function (data) {
                    console.log(data);
                    $.when(this.compile(this.$.user_info, "promotion>user_info", data)).done(cobra.ride(this, function () {
                        cobra.cookie("username", this.$.username.val(), {path: "/"});

                        //请求用户组
                        this.request('getUserGroup');

                    }));
                }),
                fail: function () {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        getUserGroupArgs: function () {
            return {
                type: "get",
                data: {},
                done: cobra.ride(this, function (data) {
                    this._userGroup = data.usergroup;

                    //请求优惠列表
                    this.__modify_id = this.getQuery('id') || 0;
                    this.__edit_mode = this.__modify_id != 0 ? true : false;
                    (this.__edit_mode) ? (this.request('getPreferentialList')) : ((this.initBaseInfoPanel({})) && (this.initGoodsInfoPanel({})) && (this.newProgramme({})));
                }),
                fail: function () {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        getPreferentialListArgs: function () {
            return {
                type: "get",
                data: {
                    id: this.__modify_id
                },
                done: cobra.ride(this, function (data) {
                    //初始化基础信息面板
                    this.initBaseInfoPanel(data);
                    //初始化商品信息面板
                    this.initGoodsInfoPanel(data);
                    //开始方案布局
                    this.newProgramme(data);
                }),
                fail: function () {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        initBaseInfoPanel: function (data) {
            $.when(this.compile(this.$.base_info_box, "promotion>ruleBaseInfo", data.data)).done(cobra.ride(this, function () {

                //基础信息布局事件监听
                this.elementEventsListener(this.$.base_info_box, this.baseInfoEventCallBackHandler, this.preferentialData);
                //初始化页面控件
                //菜单
                this.$.side_menu.metisMenu();
                //时间选择
                var _opt = {
                    value: '',
                    step: 5,
                    format: 'Y-m-d H:i:s',
                    formatDate: 'Y-m-d',
                    onChangeDateTime: function (dp, $input) {
                        $input.trigger('change');
                    }
                }
                //createNewTime
                $.trim(this.$.act_start_time.val()) == "" ? this.$.act_start_time.val(this.createNewTime()) : this.$.act_start_time.val(this.createFixTime(this.$.act_start_time.val()));
                this.$.act_start_time.datetimepicker(_opt);
                $.trim(this.$.act_end_time.val()) == "" ? this.$.act_end_time.val(this.createNewTime()) : this.$.act_end_time.val(this.createFixTime(this.$.act_end_time.val()));
                this.$.act_end_time.datetimepicker(_opt);
            }));
            return this.$.base_info_box;
        },
        initGoodsInfoPanel: function (data) {
            $.when(this.compile(this.$.goods_info_box, "promotion>goodsInfo", data.data)).done(cobra.ride(this, function () {
                //商品信息布局事件监听
                this.elementEventsListener(this.$.goods_info_box, this.goodsInfoEventCallBackHandler, this.preferentialData);
                //TODO:setData

            }));
            return this.$.goods_info_box;
        },
        //新方案
        newProgramme: function (data) {
            if ($.isEmptyObject(data)) {
                //新方案
                this.makeNewPreferentialPanel({});
            } else {
                //自有方案
                //copy needless arguments
                var needlessArgs = ['act_priority', 'add_ticket', 'base_info', 'end_time', 'env', 'good_list', 'id', 'no_good_list', 'no_perf_list', 'perf_list', 'selectAll', 'start_time', 'tip'];
                $.each(needlessArgs, cobra.ride(this, function (i, e) {
                    this.preferentialData[e] = data.data[e] || '';
                }));
                var PanelData = data.data.rules;
                $.each(PanelData, cobra.ride(this, function (i, e) {
                    //制造新优惠Panel
                    this.makeNewPreferentialPanel(e);
                }));
            }
        },
        //制造新优惠Panel-handler
        makeNewPreferentialPanel: function (data) {
            try {
                if (!data) {
                    throw ('no data for new preferential panel data');
                }
                //data
                var preferential = new this.__preferential_data();

                //揉data
                $.extend(preferential, data);
                preferential.enable = true;

                //data
                this.preferentialData._Q++;
                var N = this.preferentialData._Q;
                preferential.num = N;
                this.preferentialData.preferentials.push(preferential);

                //部署目标用户数据
                preferential.usergroup = [];
                $.each(this._userGroup, cobra.ride(this, function (i, e) {
                    var obj = $.extend({}, e);
                    (preferential.target_user.indexOf(obj.id) > -1) && (obj.checked = true);
                    preferential.usergroup.push(obj);
                }));

                //elements
                var content = $("<div class='rule_panel'></div>");
                $.when(this.compile(content, "promotion>rulesPanel", preferential)).done(cobra.ride(this, function () {
                    this.$.add_sample.before(content);
                    this.preferentialData.elements[N] = {index: N, element: "panel_" + N, enable: true};
                    preferential.element = content;
                    //注册事件
                    this.regestryNewPreferentialPanelEvents(preferential);
                    //创建规则条目
                    //判断是否有规则存在，如果不存在，创建一个空规则
                    (preferential.rules.length == 0) && (preferential.rules.push(new this.__preferential_rule()));
                    $.each(preferential.rules, cobra.ride(this, function (i, rule) {
                        this.makeNewPreferentialItem(rule, preferential);
                    }));
                }));
                return content;

            } catch (error) {
                console.log(error);
                this._msgBox.warn(error);
            }
        },
        //制造新优惠Item-handler
        makeNewPreferentialItem: function (_rule, preferential) {
            try {
                var rule = _rule;
                if (!rule) {
                    throw ('no data for new preferential rule data');
                }
                //handler

                //如果是新增条目，将会是一条空条目，创建数据
                ($.isEmptyObject(rule)) && (rule = new this.__preferential_rule()) && (preferential.rules.push(rule));

                //Q & N
                preferential._Q++;
                var N = preferential._Q;
                var n = preferential.num;
                rule.p = n;
                rule.num = N;

                var ruleContent = $("<div class=''></div>");

                //elements
                $.when(this.compile(ruleContent, "promotion>rule", rule)).done(cobra.ride(this, function () {
                    this.$['rules_box_' + n].append(ruleContent);
                    preferential.elements[N] = {index: N, element: 'rule_item_' + n + '_' + N, enable: true};
                    //注册条目事件
                    this.regestryNewPreferentialItemEvents(preferential);
                }));
                return ruleContent;
            } catch (error) {
                console.log(error);
                this._msgBox.warn(error);
            }
        },
        //创建新规则面板
        createNewRulePanel: function () {
            this.makeNewPreferentialPanel({});
        },
        //注册新面板所有事件监听
        regestryNewPreferentialPanelEvents: function (preferential) {
            var that = this;
            var elementData = this.preferentialData.elements[preferential.num];
            var ele = this.$[elementData.element];

            //移除面板按钮触发
            ele.find('.delPanel').click(cobra.ride(that, function () {
                elementData.enable = false;
                ele.parents('.rule_panel').remove();
            }));

            //UI事件监听
            this.elementEventsListener(ele, this.preferentialEventCallBackHandler, preferential);
        },
        //注册新条目所有事件监听
        regestryNewPreferentialItemEvents: function (preferential) {
            var that = this;
            //获取面板中最后一个规则条目的Element
            var elementData = (preferential.elements[preferential._Q]);
            var ele = this.$[elementData.element];
            //新增规则按钮点击
            ele.find('.addNewRule').click(cobra.ride(that, function (e) {
                //制造新规则条目
                this.makeNewPreferentialItem({}, preferential);
            }));
            //删除规则按钮点击
            ele.find('.delNewRule').click(cobra.ride(that, function (e) {
                elementData.enable = false;
                ele.parents('.rule_item').remove();
            }));
            //UI事件监听
            this.elementEventsListener(ele, this.preferentialEventCallBackHandler, preferential);
        },
        elementEventsListener: function (_ele, callback, args) {

            //----------------------------
            //带轮廓线的鼠标移入移除
            _ele.find('.UIstock').mouseover(cobra.ride(this, function (e) {
                $(e.target).addClass('hover');
            })).mouseout(cobra.ride(this, function (e) {
                $(e.target).removeClass('hover');
            }));

            //----------------------------
            //radio的点击事件
            var radio = _ele.find('.radio');
            radio.click(cobra.ride(this, function (e) {
                var _target = $(e.target);
                console.log(_target);
                try {
                    //如果目标是radio
                    if (_target.hasClass('UIstock')) {
                        //如果点击的是已选中radio
                        if (!_target.hasClass('checked')) {
                            _target.toggleClass('checked')
                            _target.siblings('input:visible').removeAttr('disabled');
                            //alert(_target.siblings('input').is(':hidden'));
                            _target.siblings('select').removeAttr('disabled');
                            _target.siblings('.btn').removeClass('disabled');
                        }
                        var cls = _target.closest('.radio').siblings();
                        cls.find('.checked').removeClass('checked');
                        cls.find('input').attr('disabled', 'disabled');
                        cls.find('select').attr('disabled', 'disabled');
                        cls.find('.btn').addClass('disabled');
                    }
                    //callBack
                    callback.call(this, args, e.target);
                } catch (error) {
                    console.log(error);
                }
            }));

            //------------------------------
            //checkbox点击事件
            var checkbox = _ele.find('.checkbox');
            checkbox.click(cobra.ride(this, function (e) {
                var _target = $(e.target);
                try {
                    (_target.hasClass('UIstock')) && (_target.toggleClass('checked'));
                    //点击全选
                    _target.hasClass('all') && (_target.hasClass('checked') ? _target.parent().siblings().children().addClass('checked') : _target.parent().siblings().children().removeClass('checked'));
                    //反向监听全选
                    var all = 0;
                    $.each(_target.parent().parent().find('.UIstock'), function (i, item) {
                        !$(item).hasClass('all') && (!$(item).hasClass('checked') && all++);
                    })
                    all > 0 ? (_target.parent().parent().find('.all').removeClass('checked')) : (_target.parent().parent().find('.all').addClass('checked'));
                    //callBack
                    callback.call(this, args, e.target);
                } catch (error) {
                    console.log(error);
                }
            }));

            //------------------------------
            //select点击事件
            var select = _ele.find('select');
            select.change(cobra.ride(this, function (e) {
                try {
                    var _target = $(e.target);
                    console.log(_target);
                    //callBack
                    callback.call(this, args, e.target);
                } catch (error) {
                    console.log(error);
                }
            }));

            //------------------------------
            //input点击事件
            var input = _ele.find('input[type=text]');
            input.on('change mouseout mouseover', cobra.ride(this, function (e) {
                try {
                    var _target = $(e.target);
                    console.log(_target);
                    //callBack
                    callback.call(this, args, e.target);
                    //是否自动聚焦
                    var _is_auto_focus = _target.attr('autofocus') ? true : false;
                    (_is_auto_focus) && (e.type == 'mouseover') && ($(e.target).focus()) && ($(e.target).select());
                    //失焦
                    (e.type == 'mouseout') && ($(e.target).blur());
                } catch (error) {
                    console.log(error);
                }
            }));

            //折叠面板监听
            var collapse = _ele.find('.collapse-link');
            collapse.on('click', function (e) {
                var ibox = $(e.target).closest('div.ibox');
                var button = $(e.target).find('i');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                setTimeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            });
        },
        //preferential_event_callback_function
        preferentialEventCallBackHandler: function (_preferential, _element) {
            var preferential = _preferential;
            var element = $(_element);
            var P = (/(\d+)_(\d+)/g).exec(element.parents('.rule_item').attr('cb-node'));
            P = {p: P[1], n: P[2]}
            console.log(P);
            var className = element.attr('class');
            console.log('事件源：', element);
            try {
                //目标用户处理
                if ((/target_user/).test(className)) {
                    preferential.target_user = [];
                    $.each(preferential.element.find('*[data-type=target_user]'), function (i, e) {
                        $(e).hasClass('checked') && preferential.target_user.push(parseInt($(e).attr('data-id')));
                    });
                    console.log('用户处理：', preferential.target_user);
                }
                //是否参加不封顶处理
                if ((/not_exceed_limit_check/).test(className)) {
                    preferential.not_exceed_limit = Boolean(element.attr('data-id'));
                    console.log('参加不封顶：', preferential.not_exceed_limit);
                }
                //优惠(规则/应用)类型事件监听
                if ((/rule_check/).test(className) || (/apply_check/).test(className)) {
                    var type = '', vtype = '';
                    (/rule_check/).test(className) && (type = 'rule');
                    (/apply_check/).test(className) && (type = 'apply');
                    (/\brule_check_value\b/).test(className) && (vtype = 'rule');
                    (/\bapply_check_value\b/).test(className) && (vtype = 'apply');
                    console.log(element);
                    //类型监听，如果是数值变动，则类型不变
                    (!vtype) && (preferential.rules[P.n][type].type = parseInt(element.attr('data-id')));
                    //数值Type改变(规则条件改变)
                    if ((/\brule_check_type\b/).test(className)) {
                        console.log('改变规则类型');
                        var _v = element.val();
                        var _ipt = element.parent().find('[class*=type_]');
                        $.each(_ipt, function (i, ipt) {
                            var _e = $(ipt);
                            new RegExp(_v, 'g').test(_e.attr('class')) ? _e.removeClass('disabled').removeAttr('disabled').show() : _e.addClass('disabled').attr('disabled', 'disabled').hide();
                        });
                    }
                    //数值监听
                    preferential.rules[P.n][type].value = [];
                    var ipt = element.parents('.radio-box').find('input[type=text]:not([disabled]),select:not([disabled])');
                    ipt.length == 0 && preferential.rules[P.n][type].value.push(0);
                    ipt.length >= 1 && ($.each(ipt, cobra.ride(this, function (i, v) {
                        var _v, _f, _fixed, _max, _min, _is_max = false, _is_min = false, _rlt;
                        _v = parseFloat($(v).val());
                        _f = parseInt($(v).attr('fixed'));

                        //最大最小值处理
                        _max = parseFloat($(v).attr('max'));
                        _min = parseFloat($(v).attr('min'));
                        (_max != 'NaN') && (_is_max = true);
                        (_min != 'NaN') && (_is_min = true);
                        _is_max && (_v > _max) && (_v = _max);
                        _is_min && (_v < _min) && (_v = _min);

                        //浮点取位数
                        _fixed = this.fixedNumber(_v, _f);

                        _rlt = ((_f >= 0) && _v && _fixed) || _v || 0;
                        //如果fixed是0位，结果也是0，特殊处理
                        (_f === 0) && (_fixed === 0) && (_rlt = 0);

                        //还原fixed后的值至DOM
                        $(v).val(_rlt);
                        //保存数据
                        preferential.rules[P.n][type].value.push(_rlt);
                    })));
                    console.log('类型：', preferential.rules[P.n][type].type);
                    console.log('数据：', preferential.rules[P.n][type].value);
                }
                console.log(preferential);
            } catch (error) {
                console.log(error);
            }
        },
        //浮点数取小数位
        fixedNumber: function (number, fixed) {
            var _n = number;
            var _pow = Math.pow(10, fixed);
            return Math.round(number * _pow) / _pow;
        },
        //创建新时间
        createNewTime: function () {
            var _arr = /([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d{2}) (\d{4}) (\d+):(\d+):(\d+)/g.exec(new Date().toString());
            _arr[2] = _arr[2].replace('Jan', '01').replace('Feb', '02').replace('Mar', '03').replace('Apr', '04').replace('May', '05').replace('Jun', '06').replace('Jul', '07').replace('Aug', '08').replace('Sep', '09').replace('Oct', '10').replace('Nov', '11').replace('Dec', '12');
            _arr[7] = "00";
            return _arr[4] + "-" + _arr[2] + "-" + _arr[3] + " " + _arr[5] + ":" + _arr[6] + ":" + _arr[7];
        },
        //修正时间格式时间
        createFixTime: function (val) {
            try {
                var _arr = /([\d -]+)(\d+:\d+:)(\d+)/g.exec(val);
                _arr[3] = "00";
                return _arr[1] + _arr[2] + _arr[3];
            } catch (err) {
                return this.createNewTime();
            }
        },
        //Panel_event_callback_function
        baseInfoEventCallBackHandler: function (_data, _element) {
            console.log('基础信息处理：', arguments);
            var element = $(_element);
            var className = element.attr('class');
            try {
                //基础信息
                if (/baseinfo/.test(className)) {
                    var _v = element.val();
                    console.log('基础信息：', _v);
                    _v && $.trim(_v) && (_data.base_info = _v);
                }
                //活动提示信息
                if (/helpmsg/.test(className)) {
                    var _v = element.val();
                    console.log('活动提示：', _v);
                    _v && $.trim(_v) && (_data.tip = _v);
                }
                //活动时间
                if (/act_time/.test(className)) {
                    var _v = element.val();
                    console.log('活动时间：', _v);
                    (element.hasClass('start_time')) && _v && ($.trim(_v)) && (_data.start_time = _v);
                    (element.hasClass('end_time')) && _v && ($.trim(_v)) && (_data.end_time = _v);
                }
                //平台环境
                if (/env/.test(className)) {
                    _data.env = [];
                    $.each(element.parents('.form-group').find('.env'), function (i, e) {
                        $(e).hasClass('checked') && _data.env.push(parseInt($(e).attr('value')));
                    });
                    console.log('平台环境：', _data.env);
                }
                //是否叠加优惠券
                if (/is_add/.test(className)) {
                    _data.add_ticket = Boolean(parseInt(element.attr('value')));
                    console.log('叠加优惠券：', _data.add_ticket);
                }
                //活动优先级
                if (/priority/.test(className)) {
                    _data.act_priority = parseInt(element.val());
                    console.log('活动优先级：', _data.act_priority);
                }
            } catch (error) {
                console.log(error);
            }

        },
        //专场与商品信息处理
        goodsInfoEventCallBackHandler: function (_data, _element) {
            console.log('商品信息处理：', arguments);
            var element = $(_element);
            var className = element.attr('class');
            try {
                //左右对应选项处理
                var is_chd = /checked/.test(className);
                var _cn = (/goods[-\w]+/).exec(className);
                (_cn && _cn.length > 0) ? (_cn = _cn[0]) : (_cn = '');
                var map = '';
                switch (_cn) {
                    case "goods-include-all":
                        is_chd ? (map = "1,2,2,1,1,2,2,0,0") : (map = "1,1,1,1,1,2,2,0,0");
                        break;
                    case "goods-include-performance":
                        is_chd ? (map = "0,0,0,2,0,1,0,2,0") : (map = "0,0,0,1,0,2,0,0,0");
                        break;
                    case "goods-include-single":
                        is_chd ? (map = "0,0,0,2,2,0,1,2,2") : (map = "0,0,0,0,1,0,2,0,0");
                        break;
                    case "goods-exclude-performance":
                        is_chd ? (map = "0,0,0,0,0,0,0,1,0") : (map = "0,0,0,0,0,0,0,2,0");
                        break;
                    case "goods-exclude-single":
                        is_chd ? (map = "0,0,0,0,0,0,0,0,1") : (map = "0,0,0,0,0,0,0,0,2");
                        break;
                    default:
                        break;
                }
                //存在关于面板显示隐藏操作的面板处理
                (_cn != '') && (this.showGoodsIncludeAndExclude(map));

                //控件处理

            } catch (error) {
                console.log(error);
            }

        },
        showGoodsIncludeAndExclude: function (map) {
            console.dir(arguments);
            var _arr = [
                'goods_include_all_checkbox',
                'goods_include_performance_checkbox',
                'goods_include_single_checkbox',
                'goods_exclude_performance_checkbox',
                'goods_exclude_single_checkbox',
                'goods_include_performance',
                'goods_include_single',
                'goods_exclude_performance',
                'goods_exclude_single'
            ];
            $.each(map.split(','), cobra.ride(this, function (i, e) {
                (e > 0) && ((e == 1 && this.$[_arr[i]].show()) || (e == 2 && (this.$[_arr[i]].hide()) && i <= 4 && (this.$[_arr[i]].children('.UIstock').removeClass('checked'))) );
            }));
        },
        requestIncludeExcludeList: function (type) {
            console.log(type);
            this.__request_data = {};
            this.__request_type = type;
            switch (type) {
                case "include_performance":
                    break;
                case "include_single":
                    break;
                case "exclude_performance":
                    break;
                case "exclude_single":
                    break;
                default :
                    this.__request_type = '';
                    break;
            }
            this.showPopPanel();
            this.request('getIncludeExcludeList');
        },
        getIncludeExcludeListArgs: function () {
            var that = this;
            return {
                type: "get",
                data: this.__request_data,
                done: cobra.ride(this, function (data) {
                    var content=$("<div></div>");
                    $.when(this.compile(content, "promotion>goods_include_exclude_table", data)).done(cobra.ride(this, function () {
                        this.searchPageID = ""
                        this.$.goods_include_exclude_box.html(content);
                        $('body').unbind('keypress');
                        $('body').bind('keypress', function (e) {
                            (e.keyCode == 13) && that.request('getIncludeExcludeList');
                        })
                    }));
                }),
                fail: function () {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        _popOpts: {
            include_performance: {
                title: '选择要包含的专场',
                tip: '灰色行代表专场已经参加活动， 不可选做参与其他活动',
                IDPlaceholder:'请输入专场ID',
                namePlaceholder:'请输入专场名称',
                content: $('<div></div>'),
                confirm: cobra.ride(this, function () {
                    console.log('确定');
                    $('body').unbind('keypress');
                }),
                cancel: cobra.ride(this, function () {
                    console.log('取消');
                    $('body').unbind('keypress');
                })
            },
            include_single: {
                title: '选择要包含的单品',
                tip: '灰色行代表专场已经参加活动， 不可选做参与其他活动',
                IDPlaceholder:'请输入商品ID',
                namePlaceholder:'请输入商品名称',
                content: $('<div></div>'),
                confirm: cobra.ride(this, function () {
                    console.log('确定');
                    $('body').unbind('keypress');
                }),
                cancel: cobra.ride(this, function () {
                    console.log('取消');
                    $('body').unbind('keypress');
                })
            },
            exclude_performance: {
                title: '选择要排除的专场',
                tip: '灰色行代表专场已经参加活动， 不可选做参与其他活动',
                IDPlaceholder:'请输入专场ID',
                namePlaceholder:'请输入专场名称',
                content: $('<div></div>'),
                confirm: cobra.ride(this, function () {
                    console.log('确定');
                    $('body').unbind('keypress');
                }),
                cancel: cobra.ride(this, function () {
                    console.log('取消');
                    $('body').unbind('keypress');
                })
            },
            exclude_single: {
                title: '选择要排除的单品',
                tip: '灰色行代表专场已经参加活动， 不可选做参与其他活动',
                IDPlaceholder:'请输入商品ID',
                namePlaceholder:'请输入商品名称',
                content: $('<div></div>'),
                confirm: cobra.ride(this, function () {
                    console.log('确定');
                    $('body').unbind('keypress');
                }),
                cancel: cobra.ride(this, function () {
                    console.log('取消');
                    $('body').unbind('keypress');
                })
            }
        },
        showPopPanel: function () {
            var that = this;
            try {
                var _popOpt = {};
                if (this.__request_type == '') {
                    throw new Error("no pop type")
                }
                _popOpt = this._popOpts[this.__request_type];


                $.when(this.compile(_popOpt.content, "promotion>goods_include_exclude_pop", _popOpt)).done(cobra.ride(this, function () {
                    this.searchPageID = ""
                    if (this.$.modal_template) {
                        this.popup_dialog.update(this.popupContent);
                    } else {
                        this.popup_dialog = new cobra.modal(_popOpt);
                    }
                }));
            } catch (error) {
                console.log(error);
            }
        },
        //old ---------------------
        goPage: function (index, pageID) {
            this.searchPageID = pageID;
            switch (index) {
                case "0":
                    this.requestPerformance();
                    break;
                case "1":
                    this.requestGoods();
                    break;
                case "2":
                    this.requestNoIncludePerformance();
                    break;
                case "3":
                    this.requestNoIncludeGoods();
                    break;
                case "4":
                    this.requestTicket();
                    break;
                case "5":
                    this.requestFreeGift();
                    break;
            }
        },
        save: function () {
            var dialog = new cobra.modal({
                title: '保存',
                content: 'this is for testing !',
                confirm: function () {
                    console.log("I am the best");
                }
            });
        }
    });
    $(function () {
        new seller.promotion();
    });
})(cobra);