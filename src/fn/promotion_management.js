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
 * Created by Louis W M Wu on 2014/12/24.
 */

(function (cb) {
    cb._({
        "~name": "pms.promotion",

        "~superclass": cb.base,

        ctor: function (options) {
            this.api = "promotion";
            this._super(options);
        },
        postCreate: function () {
            this.addInx = 0;
            this.$.side_menu.metisMenu();
            this.$.starttime.datetimepicker({value: '', step: 5});
            this.$.endtime.datetimepicker({value: '', step: 5});
            this.request("getUserInfo");
        },
        getUserInfoArgs: function () {
            return {
                type: "post",
                data: {},
                done: cobra.ride(this, function (data) {
                    $.when(this.compile(this.$.user_info, "promotion>user_info", data)).done(cobra.ride(this, function(){
                        cobra.cookie("username",this.$.user_info.text(),{ path : "/"});
                        this.request('getPromotionActivityList');
                    }));
                }),
                fail: function () {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        searchResult:function(){
            this.request('getPromotionActivityList');
        },
        getPromotionActivityListArgs: function () {
            return {
                type: 'post',
                data: {id:'',
                name:'',
                starttime:'',
                endtime:'',
                status:'',
                pageId:this.pageId},
                done: cobra.ride(this, function (data) {
                    this.$.th_checkbox.removeClass('checked');
                    $.when(this.compile(this.$.promotion_activity_list, "promotion_management>promotion_list", data)).done(cobra.ride(this, function(){
                        this.compile(this.$.pagination, "promotion_management>pagination", data)
                    }))
                }),
                fail: function () {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        goToDelete:function(inx){
            inx?this.inxArr=inx:this.checkselected();
            if(this.inxArr&&this.inxArr.length>0) {
                this.request('getPromotionDelete');
            }
        },
        getPromotionDeleteArgs: function () {
                        return {
                            type: 'post',
                            data: {inxArr:this.inxArr},
                            done: cobra.ride(this, function (data) {
                               /* $.when(this.compile(this.$.promotion_activity_list, "promotion_management>promotion_list", data)).done(cobra.ride(this, function(){
                                    this.compile(this.$.pagination, "promotion_management>pagination", data)
                                }))*/
                                this.request('getPromotionActivityList');
                }),
                fail: function () {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        goToResume:function(inx){
            inx?this.inxArr=inx:this.checkselected();
            if(this.inxArr&&this.inxArr.length>0) {
                this.request('getPromotionResume');
            }
        },
        getPromotionResumeArgs: function () {
            return {
                type: 'post',
                data: {inxArr:this.inxArr},
                done: cobra.ride(this, function (data) {
                    /*$.when(this.compile(this.$.promotion_activity_list, "promotion_management>promotion_list", data)).done(cobra.ride(this, function(){
                        this.compile(this.$.pagination, "promotion_management>pagination", data)
                    }))*/
                    this.request('getPromotionActivityList');
                }),
                fail: function () {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        goToPause:function(inx){
            inx?this.inxArr=inx:this.checkselected();
            if(this.inxArr&&this.inxArr.length>0) {
                this.request('getPromotionPause');
            }
        },
        getPromotionPauseArgs: function () {
            return {
                type: 'post',
                data: {inxArr:this.inxArr},
                done: cobra.ride(this, function (data) {
/*                    $.when(this.compile(this.$.promotion_activity_list, "promotion_management>promotion_list", data)).done(cobra.ride(this, function(){
                        this.compile(this.$.pagination, "promotion_management>pagination", data)
                    }))*/
                    this.request('getPromotionActivityList');
                }),
                fail: function () {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        goPage:function(pageId){
            this.pageId = pageId;
            this.request('getPromotionActivityList');
        },
        select_box:function(){
            this.$.th_checkbox.toggleClass('checked');
            if(this.$.th_checkbox.hasClass('checked')){
                this.$.promotion_activity_list.find('.icheckbox_square-green').addClass('checked');
            }else{
                this.$.promotion_activity_list.find('.icheckbox_square-green').removeClass('checked');
            }
        },
        selectPromotion:function(){
            var ele = arguments[arguments.length - 1];
            ele.toggleClass('checked');
        },
        checkselected:function(){
            this.$.promotion_activity_list.find('.checked').each(function(val, i){
               this.inxArr.push(val.textContent);
            });
            if(this.inxArr&&this.inxArr.length>0){
                return this.inxArr;
            }else{
                this._msgBox.warn('请先选中您要操作的选项！');
                return false;
            }
        }
    });
    $(function () {
        new pms.promotion();
    });
})(cobra);