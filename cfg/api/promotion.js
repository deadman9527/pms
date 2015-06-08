/****************************************************************************
 Copyright (c) 2014 Louis W M Wu

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
cobra.add({
    /* 创建促销活动开始 */
    "getUserInfo" : {
        url : "/user_info.html",
        dev_url : "../../../stub/user_info.json"
    },
    "getUserGroup" : {
        url : "/user_group.html",
        dev_url : "../../../stub/user_group.json"
    },
    "getIncludeExcludeList" : {
        url : "/search_performance.html",
        dev_url : "../../../stub/promotion_performance_list.json"
    },
    "getTicketList" : {
        url : "/search_ticket.html",
        dev_url : "../../../stub/promotion_ticket_list.json"
    },
    "getFreeGiftList" : {
        url : "/search_ticket.html",
        dev_url : "../../../stub/promotion_freegift_list.json"
    },
    //新增或者修改优惠
    getPreferentialList:{
        dev_url : "../../../stub/promotion_getPreferentialList.json",
        url : "/promotion_getPreferentialList.html"
    },
    /* 创建促销活动结束 */
    /* 促销活动管理开始 */
    "getPromotionActivityList" : {
        url : "/promotion_list.html",
        dev_url : "../../../stub/promotion_activity_list.json"
    },
    "getPromotionDelete" : {
        url : "/promotion_delete.html",
        dev_url : "../../../stub/promotion_delete.json"
    },
    "getPromotionResume" : {
        url : "/promotion_resume.html",
        dev_url : "../../../stub/promotion_resume.json"
    },
    "getPromotionPause" : {
        url : "/promotion_pause.html",
        dev_url : "../../../stub/promotion_pause.json"
    }
    /* 促销活动管理结束 */
});