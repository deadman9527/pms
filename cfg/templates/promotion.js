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
cobra.add({
    promotion_new_add: '',
    user_info: '    <span>\
                        <img alt="image" class="img-circle" src="{{?it && it.data && it.data.icon}}{{=it.data.icon}}{{??}}../style/img/user.png{{?}}"/>\
                    </span>\
                    <span class="clear">\
                        <span class="block m-t-xs"><strong class="font-bold" cb-node="username"><a class="account">{{=it.data.name}}</a></strong></span>\
                    </span>',
    //选择包含专场商品
    goods_include_exclude_pop: '<div class="col-lg-12">\
                                    <div class="ibox float-e-margins">\
                                        <div class="ibox-content">\
                                            <div class="row">\
                                                <div class="col-sm-1 col-sm-1-extra">\
                                                    <lable>ID:</lable>\
                                                </div>\
                                                <div class="col-sm-5 col-sm-extra">\
                                                    <div class="input-group">\
                                                        <input type="text" placeholder="{{?it.IDPlaceholder}}{{=it.IDPlaceholder}}{{?}}" class="input-sm form-control">\
                                                    </div>\
                                                </div>\
                                                <div class="col-sm-1 col-sm-1-extra col-sm-extra">\
                                                    <lable>名称:</lable>\
                                                </div>\
                                                <div class="col-sm-5 col-sm-extra">\
                                                    <div class="input-group">\
                                                        <input type="text" placeholder="{{?it.namePlaceholder}}{{=it.namePlaceholder}}{{?}}" class="input-sm form-control">\
                                                        <span class="input-group-btn">\
                                                            <span type="span" class="btn btn-sm btn-primary-go" cb-event="click~getIncludeExcludeList">查询</span>\
                                                        </span>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                            <div class="table-responsive" cb-node="goods_include_exclude_box">\
                                            </div>\
                                            <div class="btn-group btn-center" style="align-content: center;">\
                                                <ul class="pagination">\
                                                    {{? it.page-1>0}}<li class="paginate_button previous" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_previous"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page-1}}">上一页</a></li>{{?}}\
                                                    {{? it.page-2>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page-2}}">{{= it.page-2}}</a></li>{{?}}\
                                                    {{? it.page-1>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page-1}}">{{= it.page-1}}</a></li>{{?}}\
                                                    {{? it.page && it.page>0}}<li class="paginate_button active" aria-controls="DataTables_Table_0" tabindex="0"><span class="current" cb-node="page_current">{{= it.page}}</span></li>{{?}}\
                                                    {{? it.page+1<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page+1}}">{{= it.page+1}}</a></li>{{?}}\
                                                    {{? it.page+2<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page+2}}">{{= it.page+2}}</a></li>{{?}}\
                                                    {{? it.page+1<=it.total_pages}}<li class="paginate_button next" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_next"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page+1}}">下一页</a></li>{{?}}\
                                                    &nbsp;&nbsp;<span class="help-block m-b-none linedisplay">{{? parseInt(it.total) > it.pagesize}}当前{{=it.pagesize}}项{{??}}当前{{=it.total}}项{{?}} - {{? it.total}}共{{=it.total}}项{{?}}</span>\
                                                </ul>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>',
    goods_include_exclude_table:'     <table class="table">\
                                        <thead>\
                                           <tr>\
                                                <th><div class="icheckbox_square-green" style="position: relative;" cb-event="click~checkSelectAllUserEvent:table,perf_list,false;mouseover~showHover:1;mouseout~showHover:0;"><input type="checkbox" checked="" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"></div></th>\
                                                <th>专场ID </th>\
                                                <th>专场名称 </th>\
                                                <th>状态</th>\
                                                <th></th>\
                                            </tr>\
                                        </thead>\
                                        <tbody>\
                                            {{~it.data:val:index}}\
                                                <tr {{? val.status_code=="1"}}class="disabledtr"{{?}}>\
                                                    <td>{{? val.status_code=="0"}}<div class="icheckbox_square-green" style="position: relative;" cb-event="click~checkSelectEvent:perf_list,{{=val.id}},false;mouseover~showHover:1;mouseout~showHover:0;"><input type="checkbox" checked="" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"></div>{{?}}</td>\
                                                    <td>{{=val.id}}</td>\
                                                    <td>{{=val.name}}</td>\
                                                    <td>{{=val.status}}</td>\
                                                    <td></td>\
                                                </tr>\
                                            {{~}}\
                                        </tbody>\
                                    </table>',
    //选择排除专场商品
    goods_exclude_performance: '<div class="col-lg-12">\
    <div class="ibox float-e-margins">\
    <div class="ibox-content">\
    <div class="row">\
    <div class="col-sm-1 col-sm-1-extra"><lable>ID:</lable></div><div class="col-sm-5 col-sm-extra">\
    <div class="input-group"><input type="text" placeholder="请输入专场ID" class="input-sm form-control"></div>\
    </div>\
    <div class="col-sm-1 col-sm-1-extra col-sm-extra"><lable>名称:</lable></div><div class="col-sm-5 col-sm-extra">\
    <div class="input-group"><input type="text" placeholder="请输入专场名称" class="input-sm form-control"> <span class="input-group-btn">\
        <span type="span" class="btn btn-sm btn-primary-go" cb-event="click~requestPerformance">查询</span> </span></div>\
    </div>\
    </div>\
    <div class="table-responsive" cb-node="popupNoPerformance">\
        <table class="table">\
            <thead>\
               <tr>\
                    <th><div class="icheckbox_square-green" style="position: relative;" cb-event="click~checkSelectAllUserEvent:table,no_perf_list,false;mouseover~showHover:1;mouseout~showHover:0;"><input type="checkbox" checked="" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"></div></th>\
                    <th>专场ID </th>\
                    <th>专场名称 </th>\
                    <th>状态</th>\
                    <th></th>\
                </tr>\
            </thead>\
            <tbody>\
                {{~it.data:val:index}} <tr {{? val.status_code=="1"}}class="disabledtr"{{?}}>\
                    <td>{{? val.status_code=="0"}}<div class="icheckbox_square-green" style="position: relative;" cb-event="click~checkSelectEvent:no_perf_list,{{=val.id}},false;mouseover~showHover:1;mouseout~showHover:0;"><input type="checkbox" checked="" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"></div>{{?}}</td>\
                        <td>{{=val.id}}</td>\
                        <td>{{=val.name}}</td>\
                        <td>{{=val.status}}</td>\
                        <td></td>\
                    </tr>{{~}}\
                            </tbody>\
                        </table>\
                    </div>\
                    <div class="btn-group btn-center" style="align-content: center;"><ul class="pagination">\
                        {{? it.page-1>0}}<li class="paginate_button previous" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_previous"><a href="javascript:;" cb-event="click~goPage:2,{{= it.page-1}}">上一页</a></li>{{?}}\
         {{? it.page-2>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:2,{{= it.page-2}}">{{= it.page-2}}</a></li>{{?}}\
         {{? it.page-1>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:2,{{= it.page-1}}">{{= it.page-1}}</a></li>{{?}}\
         {{? it.page && it.page>0}}<li class="paginate_button active" aria-controls="DataTables_Table_0" tabindex="0"><span class="current" cb-node="page_current">{{= it.page}}</span></li>{{?}}\
         {{? it.page+1<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:2,{{= it.page+1}}">{{= it.page+1}}</a></li>{{?}}\
         {{? it.page+2<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:2,{{= it.page+2}}">{{= it.page+2}}</a></li>{{?}}\
         {{? it.page+1<=it.total_pages}}<li class="paginate_button next" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_next"><a href="javascript:;" cb-event="click~goPage:2,{{= it.page+1}}">下一页</a></li>{{?}}\
         &nbsp;&nbsp;<span class="help-block m-b-none linedisplay">{{? parseInt(it.total) > it.pagesize}}当前{{=it.pagesize}}项{{??}}当前{{=it.total}}项{{?}} - {{? it.total}}共{{=it.total}}项{{?}}</span>\
               </ul> </div>\
                </div>\
            </div>\
        </div>',
    //选择包含单品
    goods_include_single: '<div class="col-lg-12">\
    <div class="ibox float-e-margins">\
    <div class="ibox-content">\
    <div class="row">\
    <div class="col-sm-1 col-sm-1-extra"><lable>ID:</lable></div><div class="col-sm-5 col-sm-extra">\
    <div class="input-group"><input type="text" placeholder="请输入商品ID" class="input-sm form-control"></div>\
    </div>\
    <div class="col-sm-1 col-sm-1-extra col-sm-extra"><lable>名称:</lable></div><div class="col-sm-5 col-sm-extra">\
    <div class="input-group"><input type="text" placeholder="请输入商品名称" class="input-sm form-control"> <span class="input-group-btn">\
        <span type="span" class="btn btn-sm btn-primary-go" cb-event="click~requestGoods">查询</span> </span></div>\
    </div>\
    </div>\
    <div class="table-responsive" cb-node="popupGood">\
        <table class="table">\
            <thead>\
                <tr>\
                    <th><div class="icheckbox_square-green" style="position: relative;" cb-event="click~checkSelectAllUserEvent:table,good_list,false;mouseover~showHover:1;mouseout~showHover:0;"><input type="checkbox" checked="" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"></div></th>\
                    <th>商品ID </th>\
                    <th>商品名称 </th>\
                    <th>商品分类</th>\
                    <th>供应商</th>\
                    <th>状态</th>\
                </tr>\
            </thead>\
            <tbody>\
                {{~it.data:val:index}} <tr {{? val.status_code=="1"}}class="disabledtr"{{?}}>\
                    <td>{{? val.status_code=="0"}}<div class="icheckbox_square-green" style="position: relative;" cb-event="click~checkSelectEvent:good_list,{{=val.id}},false;mouseover~showHover:1;mouseout~showHover:0;"><input type="checkbox" checked="" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"></div>{{?}}</td>\
                        <td>{{=val.id}}</td>\
                        <td>{{=val.name}}</td>\
                        <td>{{=val.type}}</td>\
                        <td>{{=val.support}}</td>\
                        <td>{{=val.status}}</td>\
                    </tr>{{~}}\
                            </tbody>\
                        </table>\
                    </div>\
                    <div class="btn-group btn-center" style="align-content: center;"><ul class="pagination">\
                        {{? it.page-1>0}}<li class="paginate_button previous" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_previous"><a href="javascript:;" cb-event="click~goPage:1,{{= it.page-1}}">上一页</a></li>{{?}}\
         {{? it.page-2>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:1,{{= it.page-2}}">{{= it.page-2}}</a></li>{{?}}\
         {{? it.page-1>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:1,{{= it.page-1}}">{{= it.page-1}}</a></li>{{?}}\
         {{? it.page && it.page>0}}<li class="paginate_button active" aria-controls="DataTables_Table_0" tabindex="0"><span class="current" cb-node="page_current">{{= it.page}}</span></li>{{?}}\
         {{? it.page+1<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:1,{{= it.page+1}}">{{= it.page+1}}</a></li>{{?}}\
         {{? it.page+2<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:1,{{= it.page+2}}">{{= it.page+2}}</a></li>{{?}}\
         {{? it.page+1<=it.total_pages}}<li class="paginate_button next" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_next"><a href="javascript:;" cb-event="click~goPage:1,{{= it.page+1}}">下一页</a></li>{{?}}\
         &nbsp;&nbsp;<span class="help-block m-b-none linedisplay">{{? parseInt(it.total) > it.pagesize}}当前{{=it.pagesize}}项{{??}}当前{{=it.total}}项{{?}} - {{? it.total}}共{{=it.total}}项{{?}}</span>\
               </ul> </div>\
                </div>\
            </div>\
        </div>',
    //选择排除单品
    goods_exclude_single: '<div class="col-lg-12">\
    <div class="ibox float-e-margins">\
    <div class="ibox-content">\
    <div class="row">\
    <div class="col-sm-1 col-sm-1-extra"><lable>ID:</lable></div><div class="col-sm-5 col-sm-extra">\
    <div class="input-group"><input type="text" placeholder="请输入商品ID" class="input-sm form-control"></div>\
    </div>\
    <div class="col-sm-1 col-sm-1-extra col-sm-extra"><lable>名称:</lable></div><div class="col-sm-5 col-sm-extra">\
    <div class="input-group"><input type="text" placeholder="请输入商品名称" class="input-sm form-control"> <span class="input-group-btn">\
        <span type="span" class="btn btn-sm btn-primary-go" cb-event="click~requestGoods">查询</span> </span></div>\
    </div>\
    </div>\
    <div class="table-responsive" cb-node="popupNoGood">\
        <table class="table">\
            <thead>\
                <tr>\
                    <th><div class="icheckbox_square-green" style="position: relative;" cb-event="click~checkSelectAllUserEvent:table,no_good_list,false;mouseover~showHover:1;mouseout~showHover:0;"><input type="checkbox" checked="" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"></div></th>\
                    <th>商品ID </th>\
                    <th>商品名称 </th>\
                    <th>商品分类</th>\
                    <th>供应商</th>\
                    <th>状态</th>\
                </tr>\
            </thead>\
            <tbody>\
                {{~it.data:val:index}} <tr {{? val.status_code=="1"}}class="disabledtr"{{?}}>\
                    <td>{{? val.status_code=="0"}}<div class="icheckbox_square-green" style="position: relative;" cb-event="click~checkSelectEvent:no_good_list,{{=val.id}},false;mouseover~showHover:1;mouseout~showHover:0;"><input type="checkbox" checked="" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"></div>{{?}}</td>\
                        <td>{{=val.id}}</td>\
                        <td>{{=val.name}}</td>\
                        <td>{{=val.type}}</td>\
                        <td>{{=val.support}}</td>\
                        <td>{{=val.status}}</td>\
                    </tr>{{~}}\
                            </tbody>\
                        </table>\
                    </div>\
            <div class="btn-group btn-center" style="align-content: center;"><ul class="pagination">\
                {{? it.page-1>0}}<li class="paginate_button previous" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_previous"><a href="javascript:;" cb-event="click~goPage:3,{{= it.page-1}}">上一页</a></li>{{?}}\
                {{? it.page-2>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:3,{{= it.page-2}}">{{= it.page-2}}</a></li>{{?}}\
                {{? it.page-1>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:3,{{= it.page-1}}">{{= it.page-1}}</a></li>{{?}}\
                {{? it.page && it.page>0}}<li class="paginate_button active" aria-controls="DataTables_Table_0" tabindex="0"><span class="current" cb-node="page_current">{{= it.page}}</span></li>{{?}}\
                {{? it.page+1<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:3,{{= it.page+1}}">{{= it.page+1}}</a></li>{{?}}\
                {{? it.page+2<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:3,{{= it.page+2}}">{{= it.page+2}}</a></li>{{?}}\
                {{? it.page+1<=it.total_pages}}<li class="paginate_button next" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_next"><a href="javascript:;" cb-event="click~goPage:3,{{= it.page+1}}">下一页</a></li>{{?}}\
                &nbsp;&nbsp;<span class="help-block m-b-none linedisplay">{{? parseInt(it.total) > it.pagesize}}当前{{=it.pagesize}}项{{??}}当前{{=it.total}}项{{?}} - {{? it.total}}共{{=it.total}}项{{?}}</span>\
               </ul> </div>\
                </div>\
            </div>\
        </div>',
    //选择优惠券
    select_ticket: '<div class="col-lg-12">\
    <div class="ibox float-e-margins">\
    <div class="ibox-content">\
    <div class="row">\
    <div class="col-sm-1 col-sm-1-extra"><lable>ID:</lable></div><div class="col-sm-5 col-sm-extra">\
    <div class="input-group"><input type="text" placeholder="请输入优惠券编号" class="input-sm form-control"></div>\
    </div>\
    <div class="col-sm-1 col-sm-1-extra col-sm-extra"><lable>名称:</lable></div><div class="col-sm-5 col-sm-extra">\
    <div class="input-group"><input type="text" placeholder="请输入优惠券名称" class="input-sm form-control"> <span class="input-group-btn">\
        <span type="span" class="btn btn-sm btn-primary-go" cb-event="click~requestTicket">查询</span> </span></div>\
    </div>\
    </div>\
    <div class="table-responsive" cb-node="popupTicket">\
        <table class="table">\
            <thead>\
                <tr>\
                    <th><div class="icheckbox_square-green" style="position: relative;" cb-event="click~checkSelectAllUserEvent:table,ticket_list,false;mouseover~showHover:1;mouseout~showHover:0;"><input type="checkbox" checked="" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"></div></th>\
                    <th>优惠券 </th>\
                    <th>优惠券名称 </th>\
                    <th></th>\
                    <th></th>\
                </tr>\
            </thead>\
            <tbody>\
                {{~it.data:val:index}} <tr>\
                    <td><div class="icheckbox_square-green" style="position: relative;" cb-event="click~checkSelectEvent:ticket_list,{{=val.id}},false;mouseover~showHover:1;mouseout~showHover:0;"><input type="checkbox" checked="" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"></div></td>\
                        <td>{{=val.id}}</td>\
                        <td>{{=val.name}}</td>\
                        <td></td>\
                        <td></td>\
                    </tr>{{~}}\
                            </tbody>\
                        </table>\
                    </div>\
            <div class="btn-group btn-center" style="align-content: center;"><ul class="pagination">\
                {{? it.page-1>0}}<li class="paginate_button previous" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_previous"><a href="javascript:;" cb-event="click~goPage:4,{{= it.page-1}}">上一页</a></li>{{?}}\
                {{? it.page-2>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:4,{{= it.page-2}}">{{= it.page-2}}</a></li>{{?}}\
                {{? it.page-1>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:4,{{= it.page-1}}">{{= it.page-1}}</a></li>{{?}}\
                {{? it.page && it.page>0}}<li class="paginate_button active" aria-controls="DataTables_Table_0" tabindex="0"><span class="current" cb-node="page_current">{{= it.page}}</span></li>{{?}}\
                {{? it.page+1<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:4,{{= it.page+1}}">{{= it.page+1}}</a></li>{{?}}\
                {{? it.page+2<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page+2}}">{{= it.page+2}}</a></li>{{?}}\
                {{? it.page+1<=it.total_pages}}<li class="paginate_button next" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_next"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page+1}}">下一页</a></li>{{?}}\
                &nbsp;&nbsp;<span class="help-block m-b-none linedisplay">{{? parseInt(it.total) > it.pagesize}}当前{{=it.pagesize}}项{{??}}当前{{=it.total}}项{{?}} - {{? it.total}}共{{=it.total}}项{{?}}</span>\
               </ul> </div>\
            </div>\
        </div>',
    //选择赠品商品
    select_free_gift: '<div class="col-lg-12">\
    <div class="ibox float-e-margins">\
    <div class="ibox-content">\
    <div class="row">\
    <div class="col-sm-1 col-sm-1-extra"><lable>ID:</lable></div><div class="col-sm-5 col-sm-extra">\
    <div class="input-group"><input type="text" placeholder="请输入赠品编号" class="input-sm form-control"></div>\
    </div>\
    <div class="col-sm-1 col-sm-1-extra col-sm-extra"><lable>名称:</lable></div><div class="col-sm-5 col-sm-extra">\
    <div class="input-group"><input type="text" placeholder="请输入赠品名称" class="input-sm form-control"> <span class="input-group-btn">\
        <span type="span" class="btn btn-sm btn-primary-go" cb-event="click~requestFreeGift">查询</span> </span></div>\
    </div>\
    </div>\
    <div class="table-responsive" cb-node="popupFreeGift">\
        <table class="table">\
            <thead>\
                <tr>\
                    <th><div class="icheckbox_square-green" style="position: relative;" cb-event="click~checkSelectAllUserEvent:table,gift_list,false;mouseover~showHover:1;mouseout~showHover:0;"><input type="checkbox" checked="" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"></div></th>\
                    <th>赠品编号 </th>\
                    <th>赠品名称 </th>\
                    <th></th>\
                    <th></th>\
                </tr>\
            </thead>\
            <tbody>\
               {{~it.data:val:index}} <tr>\
                    <td><div class="icheckbox_square-green" style="position: relative;" cb-event="click~checkSelectEvent:gift_list,{{=val.id}},false;mouseover~showHover:1;mouseout~showHover:0;"><input type="checkbox" checked="" class="i-checks" name="input[]" style="position: absolute; opacity: 0;"></div></td>\
                        <td>{{=val.id}}</td>\
                        <td>{{=val.name}}</td>\
                        <td></td>\
                        <td></td>\
                    </tr>{{~}}\
                            </tbody>\
                        </table>\
                    </div>\
                    <div class="btn-group btn-center" style="align-content: center;"><ul class="pagination">\
                        {{? it.page-1>0}}<li class="paginate_button previous" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_previous"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page-1}}">上一页</a></li>{{?}}\
                        {{? it.page-2>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page-2}}">{{= it.page-2}}</a></li>{{?}}\
                        {{? it.page-1>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page-1}}">{{= it.page-1}}</a></li>{{?}}\
                        {{? it.page && it.page>0}}<li class="paginate_button active" aria-controls="DataTables_Table_0" tabindex="0"><span class="current" cb-node="page_current">{{= it.page}}</span></li>{{?}}\
                        {{? it.page+1<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page+1}}">{{= it.page+1}}</a></li>{{?}}\
                        {{? it.page+2<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page+2}}">{{= it.page+2}}</a></li>{{?}}\
                        {{? it.page+1<=it.total_pages}}<li class="paginate_button next" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_next"><a href="javascript:;" cb-event="click~goPage:0,{{= it.page+1}}">下一页</a></li>{{?}}\
                        &nbsp;&nbsp;<span class="help-block m-b-none linedisplay">{{? parseInt(it.total) > it.pagesize}}当前{{=it.pagesize}}项{{??}}当前{{=it.total}}项{{?}} - {{? it.total}}共{{=it.total}}项{{?}}</span>\
               </ul> </div>\
                </div>\
            </div>\
        </div>',
    //基础信息模板
    ruleBaseInfo:'  <div class="ibox float-e-margins">\
                        <div class="ibox-title">\
                            <h5>基础信息</h5>\
                            <div class="ibox-tools">\
                                <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>\
                            </div>\
                        </div>\
                        <div class="ibox-content">\
                            <div class="form-horizontal">\
                                <div class="form-group">\
                                    <label class="col-sm-2 control-label">基础信息：</label>\
                                    <div class="col-sm-10">\
                                        <input type="text" autofocus class="form-control baseinfo" placeholder="请填写基础信息" value="{{?it && it.base_info}}{{=it.base_info}}{{?}}" cb-node="baseinfo"/>\
                                    </div>\
                                </div>\
                                <div class="hr-line-dashed"></div>\
                                <div class="form-group">\
                                    <label class="col-sm-2 control-label">活动提示信息：</label>\
                                    <div class="col-sm-10">\
                                        <input type="text" autofocus class="form-control helpmsg" placeholder="请填写提示信息" value="{{?it && it.tip}}{{=it.tip}}{{?}}" cb-node="helpmsg"/>\
                                        <span class="help-block m-b-none linedisplay">* 支持首页、专场页、商品详情页、购物车页显示</span>\
                                    </div>\
                                </div>\
                                <div class="hr-line-dashed"></div>\
                                <div class="form-group" id="data_5">\
                                    <label class="col-sm-2 control-label">活动时间：</label>\
                                    <div class="col-sm-10">\
                                        <div class="input-daterange input-group" id="datepicker">\
                                            <input type="text" class="input-sm form-control act_time start_time" value="{{?it && it.start_time}}{{=it.start_time}}{{?}}" placeholder="请选择活动开始日期" cb-node="act_start_time"/>\
                                            <span class="input-group-addon no_border">到</span>\
                                            <input type="text" class="input-sm form-control act_time end_time" value="{{?it && it.end_time}}{{=it.end_time}}{{?}}" placeholder="请选择活动结束日期" cb-node="act_end_time"/>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="hr-line-dashed"></div>\
                                <div class="form-group">\
                                    <label class="col-sm-2 control-label">平台环境：</label>\
                                    <div class="col-sm-10">\
                                        <div class="checkbox checkbox-inline i-checks">\
                                            <div class="UIstock icheckbox_square-green env {{if(it && it.env.indexOf(1)!=-1){out+="checked"}}} " style="position: relative;" value="1"></div>\
                                            <span>PC</span>\
                                        </div>\
                                        <div class="checkbox checkbox-inline i-checks">\
                                            <div class="UIstock icheckbox_square-green env {{if(it && it.env.indexOf(2)!=-1){out+="checked"}}} " style="position: relative;" value="2"></div>\
                                            <span>移动</span>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="hr-line-dashed"></div>\
                                <div class="form-group">\
                                    <label class="col-sm-2 control-label">是否叠加优惠券：</label>\
                                    <div class="col-sm-10">\
                                        <div class="radio i-checks linedisplay">\
                                            <div>\
                                                <div class="UIstock iradio_square-green is_add {{?it && it.add_ticket}}checked{{?}}" value="1" style="position: relative;"></div>\
                                                <span>是</span>\
                                            </div>\
                                        </div>\
                                        <div class="radio i-checks linedisplay">\
                                            <div>\
                                                <div class="UIstock iradio_square-green is_add {{?it && it.add_ticket==false}}checked{{?}}{{?!it}}checked{{?}}" value="0" style="position: relative;"></div>\
                                                <span>否</span>\
                                            </div>\
                                        </div>\
                                        <span class="help-block m-b-none linedisplay">例：考虑结合满减优惠力度较大，除非大促，建议默认选择“否”。</span>\
                                        <label style="color:#FF0000;font-weight: normal">优惠券在计算运费之后使用</label>\
                                    </div>\
                                </div>\
                                <div class="hr-line-dashed"></div>\
                                <div class="form-group"><label class="col-sm-2 control-label">活动优先级别：</label>\
                                    <div class="col-sm-10">\
                                        <select class="form-control m-b linedisplay priority" name="priority_level" style="width: 20%">\
                                            <option value="1" {{?it && it.act_priority==1}}selected{{?}}{{?!it}}selected{{?}}>高</option>\
                                            <option value="2" {{?it && it.act_priority==2}}selected{{?}}>中</option>\
                                            <option value="3" {{?it && it.act_priority==3}}selected{{?}}>低</option>\
                                        </select>\
                                        <span class="help-block m-b-none linedisplay hidden">注意：活动优先级数值越小,表示优先级越大。</span>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>',
    //商品信息模板
    goodsInfo:' <div class="ibox float-e-margins">\
                    <div class="ibox-title">\
                        <h5>专场与商品信息 &nbsp;&nbsp;&nbsp;&nbsp;\
                        <small style="color:#B2B2B2">备注：选择全站\
                        <lable style="color:#FF0000;font-weight: normal">ABC...</lable>\
                        后并同时选择不包含（专场+单品）<label style="color:#FF0000;font-weight: normal">A</label>，最后只有\
                        <label\
                        style="color:#FF0000;font-weight: normal">BC</label>...参与本次促销活动。\
                        </small>\
                        </h5>\
                        <div class="ibox-tools">\
                            <a class="collapse-link">\
                                <i class="fa fa-chevron-up"></i>\
                            </a>\
                        </div>\
                    </div>\
                    <div class="ibox-content">\
                        <div class="row borderbottom">\
                            <div class="col-sm-6 b-r">\
                                <!-- include -->\
                                <div class="ibox float-e-margins">\
                                    <div class="ibox-content inspinia-timeline" style="border: none;">\
                                        <div class="timeline-item">\
                                            <div class="row">\
                                                <div class="col-xs-3 date toppadding" style="font-weight: 700">\
                                                    包含：\
                                                    <br>\
                                                    <small class="text-navy"></small>\
                                                </div>\
                                                <div class="col-xs-8 content no-top-border">\
                                                    <div class="col-sm-10 checkboxpadding">\
                                                        <div class="checkbox checkbox-inline i-checks" cb-node="goods_include_all_checkbox">\
                                                            <div class="goods-include-all UIstock icheckbox_square-green"\
                                                                style="position: relative;"></div>\
                                                            全站\
                                                        </div>\
                                                        <div class="checkbox checkbox-inline i-checks" cb-node="goods_include_performance_checkbox">\
                                                            <div class="goods-include-performance UIstock icheckbox_square-green"\
                                                                style="position: relative;"></div>\
                                                            专场\
                                                        </div>\
                                                        <div class="checkbox checkbox-inline i-checks" cb-node="goods_include_single_checkbox">\
                                                            <div class="goods-include-single UIstock icheckbox_square-green"\
                                                                style="position: relative;"></div>\
                                                            单品\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <div class="timeline-item" cb-node="goods_include_performance" style="display: none;">\
                                            <div class="row">\
                                                <div class="col-xs-3 date">\
                                                </div>\
                                                <div class="col-xs-8 content">\
                                                    <div class="form-group">\
                                                        <div class="font-noraml">选择专场</div>\
                                                        <div class="input-group adjust_width">\
                                                            <div class="chosen-container chosen-container-multi adjust_width"\
                                                                title="">\
                                                                <ul class="chosen-choices">\
                                                                    <div cb-node="perf_list"></div>\
                                                                    <li class="search-field"><input type="text"\
                                                                        value=""\
                                                                        class="adjust_width"\
                                                                        autocomplete="off"\
                                                                        tabindex="4"\
                                                                        placeholder="请点击此处选择专场"\
                                                                        cb-event="click~requestIncludeExcludeList:include_performance">\
                                                                    </li>\
                                                                </ul>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <div class="timeline-item" cb-node="goods_include_single" style="display: none;">\
                                            <div class="row">\
                                                <div class="col-xs-3 date">\
                                                </div>\
                                                <div class="col-xs-8 content">\
                                                    <div class="form-group">\
                                                        <div class="font-noraml">选择单品</div>\
                                                        <div class="input-group adjust_width">\
                                                            <div class="chosen-container chosen-container-multi adjust_width"\
                                                                title="">\
                                                                <ul class="chosen-choices">\
                                                                    <div cb-node="good_list"></div>\
                                                                    <li class="search-field"><input type="text"\
                                                                        value=""\
                                                                        class="adjust_width"\
                                                                        autocomplete="off"\
                                                                        placeholder="请点击此处选择单品"\
                                                                        tabindex="4"\
                                                                        cb-event="click~requestIncludeExcludeList:include_single">\
                                                                    </li>\
                                                                </ul>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="col-sm-6 leftborder" cb-node="not_include_div">\
                                <!-- exclude -->\
                                <div class="ibox float-e-margins">\
                                    <div class="ibox-content inspinia-timeline" style="border: none;">\
                                        <div class="timeline-item">\
                                            <div class="row">\
                                                <div class="col-xs-3 date toppadding" style="font-weight: 700">\
                                                    不包含：\
                                                    <br>\
                                                    <small class="text-navy"></small>\
                                                </div>\
                                                <div class="col-xs-8 content no-top-border">\
                                                    <div class="col-sm-10 checkboxpadding">\
                                                        <div class="checkbox checkbox-inline i-checks" cb-node="goods_exclude_performance_checkbox">\
                                                            <div class="goods-exclude-performance UIstock icheckbox_square-green"\
                                                                style="position: relative;"></div>\
                                                            专场\
                                                        </div>\
                                                        <div class="checkbox checkbox-inline i-checks" cb-node="goods_exclude_single_checkbox">\
                                                            <div class="goods-exclude-single UIstock icheckbox_square-green"\
                                                                style="position: relative;"></div>\
                                                            单品\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <div class="timeline-item" style="display: none;" cb-node="goods_exclude_performance">\
                                            <div class="row">\
                                                <div class="col-xs-3 date">\
                                                </div>\
                                                <div class="col-xs-8 content">\
                                                    <div class="form-group">\
                                                        <div class="font-noraml">选择专场</div>\
                                                        <div class="input-group adjust_width">\
                                                            <div class="chosen-container chosen-container-multi adjust_width"\
                                                                title="">\
                                                                <ul class="chosen-choices">\
                                                                    <div cb-node="no_perf_list"></div>\
                                                                    <li class="search-field"><input type="text"\
                                                                        value=""\
                                                                        class="adjust_width"\
                                                                        placeholder="请点击此处选择专场"\
                                                                        autocomplete="off"\
                                                                        tabindex="4"\
                                                                        cb-event="click~requestIncludeExcludeList:exclude_performance">\
                                                                    </li>\
                                                                </ul>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <div class="timeline-item" style="display: none;" cb-node="goods_exclude_single">\
                                            <div class="row">\
                                                <div class="col-xs-3 date">\
                                                </div>\
                                                <div class="col-xs-8 content">\
                                                    <div class="form-group">\
                                                        <div class="font-noraml">选择单品</div>\
                                                        <div class="input-group adjust_width">\
                                                            <div class="chosen-container chosen-container-multi adjust_width"\
                                                                title="">\
                                                                <ul class="chosen-choices">\
                                                                    <div cb-node="no_good_list"></div>\
                                                                    <li class="search-field"><input type="text"\
                                                                        value=""\
                                                                        class="adjust_width"\
                                                                        placeholder="请点击此处选择单品"\
                                                                        autocomplete="off"\
                                                                        tabindex="4"\
                                                                        cb-event="click~requestIncludeExcludeList:exclude_single">\
                                                                    </li>\
                                                                </ul>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>',
    //优惠信息面板模板
    rulesPanel:'<div class="col-lg-6 sampletemplate"><div class="ibox float-e-margins" cb-node="panel_{{=it.num}}">\
                    <div class="ibox-title">\
                        <h5>优惠目标设置</h5>\
                        <div class="ibox-tools">\
                            <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>\
                            <a class="close-link delPanel"><i class="fa fa-times"></i></a>\
                        </div>\
                    </div>\
                    <div class = "ibox-content" style = "display: block;">\
                        <div class="form-horizontal">\
                            <div class="form-group">\
                                <label class="col-sm-2 control-label" style="width: 123px">用户目标：</label>\
                                <div class="col-sm-10">\
                                    <div class="checkbox checkbox-inline i-checks">\
                                        <div class="target_user UIstock all icheckbox_square-green" style="position: relative;">\
                                        </div>\
                                        全部用户\
                                    </div>\
                                   {{~it.usergroup :value:index}}\
                                    <div class="checkbox checkbox-inline i-checks">\
                                        <div data-type="target_user" data-id="{{=value.id}}" class="target_user UIstock icheckbox_square-green {{?value.checked}}checked{{?}}" style="position: relative;">\
                                        </div>\
                                        {{=value.type}}\
                                        </div>\
                                    {{~}}\
                                </div>\
                            </div>\
                            <div class="rules_box" cb-node="rules_box_{{=it.num}}">\
                            </div>\
                            <div class="form-group addNewRule">\
                                <label class="col-sm-2 control-label" style="width: 123px;">参加上不封顶：</label>\
                                    <div class="col-sm-10">\
                                        <div class="radio i-checks linedisplay">\
                                            <div>\
                                                <div data-id="1" class="not_exceed_limit_check UIstock iradio_square-green {{?it.not_exceed_limit}}checked{{?}}" style="position: relative;">\
                                                </div>\
                                                是\
                                            </div>\
                                        </div>\
                                        <div class="radio i-checks linedisplay">\
                                            <div>\
                                                <div data-id="" class="not_exceed_limit_check UIstock iradio_square-green {{?!it.not_exceed_limit}}checked{{?}}" style="position: relative;">\
                                                </div>\
                                                否\
                                                </div>\
                                            </div>\
                                            <span class="help-block m-b-none linedisplay">例：默认档次为满100-20.当前选择“是”，自动满200-40，满300-60...以此类推。</span>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>',
    //优惠规则条目模板
    rule:'                      <div class="ruleDiv sampletemplate rule_item" cb-node="rule_item_{{=it.p}}_{{=it.num}}">\
                                    <div class="form-group">\
                                        <label class="col-sm-2 control-label" style="width: 123px">优惠规则：</label>\
                                        <div class="ibox-tools right-padding large-icon">\
                                            {{?it.num!==0}}<a class="delNewRule data-p={{=it.p}} data-num={{=it.num}}"><i class="fa fa-minus"></i></a>{{?}}\
                                            <a class="addNewRule"><i class="fa fa-plus"></i></a>\
                                        </div>\
                                        {{?it.rule}}\
                                        <div class="col-sm-11 radio-box">\
                                            <div class="radio i-checks">\
                                                <div>\
                                                    <div data-id=1 class="UIstock rule_check iradio_square-green {{?it.rule.type==1}}checked{{?}}" style="position: relative;">\
                                                    </div>\
                                                    当订单商品总金额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                                                    <select class="rule_check_value rule_check_type form-control m-b linedisplay" name="priority_level" style="width: 135px;font-size:12px;" {{?it.rule.type!=1}}disabled{{?}}>\
                                                        <option value="1" {{?it.rule.type==1 && it.rule.value && it.rule.value[0] && it.rule.value[0]==1}}selected{{?}} {{?it.rule.type==2}}selected{{?}}>大于或等于</option>\
                                                        <option value="2" {{?it.rule.type==1 && it.rule.value && it.rule.value[0] && it.rule.value[0]==2}}selected{{?}}>小于或等于</option>\
                                                        <option value="3" {{?it.rule.type==1 && it.rule.value && it.rule.value[0] && it.rule.value[0]==3}}selected{{?}}>介于</option>\
                                                    </select>\
                                                    <input type="text" fixed=2 autofocus class="rule_check_value type_1 form-control limit-width {{?it.rule.type!=1 || it.rule.value[0]!=1 || it.rule.type==2}}disabled{{?}}" style="{{?it.rule.type==2}}{{??it.rule.value[0]!=1}}display: none;{{?}}width:80px;" {{?it.rule.type!=1 || it.rule.value[0]!=1 || it.rule.type==2}}disabled{{?}} value="{{?it.rule.type==1 && it.rule.value && it.rule.value[0] && it.rule.value[0]==1}}{{?it.rule.value[1]}}{{=it.rule.value[1]}}{{??}}0{{?}}{{??}}0{{?}}"/>\
                                                    <input type="text" fixed=2 autofocus class="rule_check_value type_2 form-control limit-width {{?it.rule.type!=1 || it.rule.value[0]!=2}}disabled{{?}}" style="{{?it.rule.value[0]!=2}}display: none;{{?}}width:80px;" {{?it.rule.type!=1 || it.rule.value[0]!=2}}disabled{{?}} value="{{?it.rule.type==1 && it.rule.value && it.rule.value[0] && it.rule.value[0]==2}}{{?it.rule.value[1]}}{{=it.rule.value[1]}}{{??}}0{{?}}{{??}}0{{?}}"/>\
                                                    <input type="text" fixed=2 autofocus class="rule_check_value type_3 form-control limit-width {{?it.rule.type!=1 || it.rule.value[0]!=3}}disabled{{?}}" style="{{?it.rule.value[0]!=3}}display: none;{{?}}width:80px;" {{?it.rule.type!=1 || it.rule.value[0]!=3}}disabled{{?}} value="{{?it.rule.type==1 && it.rule.value && it.rule.value[0] && it.rule.value[0]==3}}{{?it.rule.value[1]}}{{=it.rule.value[1]}}{{??}}0{{?}}{{??}}0{{?}}"/>\
                                                    <span type="text" class="rule_check_value type_3" style="{{?it.rule.type!=1}}display: none;{{?}}">&nbsp;~&nbsp;</span>\
                                                    <input type="text" fixed=2 autofocus class="rule_check_value type_3 form-control limit-width {{?it.rule.type!=1 || it.rule.value[0]!=3}}disabled{{?}}" style="{{?it.rule.value[0]!=3}}display: none;{{?}}width:80px;" {{?it.rule.type!=1 || it.rule.value[0]!=3}}disabled{{?}} value="{{?it.rule.type==1 && it.rule.value && it.rule.value[0] && it.rule.value[0]==3}}{{?it.rule.value[2]}}{{=it.rule.value[2]}}{{??}}0{{?}}{{??}}0{{?}}"/>\
                                                    元(人民币)，对指定的商品优惠\
                                                </div>\
                                            </div>\
                                            <div class="radio i-checks">\
                                                <div>\
                                                    <div data-id=2 class="UIstock rule_check iradio_square-green {{?it.rule.type==2}}checked{{?}}" style="position: relative;">\
                                                    </div>\
                                                    当订单商品总数量满&nbsp;&nbsp;\
                                                    <input type="text" autofocus class="rule_check_value form-control limit-width" fixed=0 {{?it.rule.type!=2}}disabled{{?}} value="{{?it.rule.type==2 && it.rule.value && it.rule.value[0]}}{{=it.rule.value[0]}}{{??}}0{{?}}"/>\
                                                    &nbsp;件，对指定的商品优惠\
                                                </div>\
                                            </div>\
                                        </div>\
                                        {{?}}\
                                    </div>\
                                    <div class="form-group">\
                                        {{?it.apply}}\
                                        <label class="col-sm-2 control-label" style="width: 123px;">优惠应用：</label>\
                                        <div class="col-sm-11 radio-box">\
                                            <div class="radio i-checks">\
                                                <div class="selectLable">\
                                                    <div data-id=1 class="UIstock apply_check iradio_square-green {{?it.apply.type==1}}checked{{?}}" style="position: relative;">\
                                                    </div>\
                                                    订单支持货到付款\
                                                </div>\
                                            </div>\
                                            <div class="radio i-checks">\
                                                <div class="selectLable">\
                                                    <div data-id=2 class="UIstock apply_check iradio_square-green {{?it.apply.type==2}}checked{{?}}" style="position: relative;">\
                                                    </div>\
                                                    订单支持免邮&nbsp;&nbsp;\
                                                </div>\
                                            </div>\
                                            <div class="radio i-checks">\
                                                <div>\
                                                    <div data-id=3 class="UIstock apply_check iradio_square-green {{?it.apply.type==3}}checked{{?}}" style="position: relative;">\
                                                    </div>\
                                                    订单以固定折扣&nbsp;&nbsp;\
                                                    <input type="text" autofocus class="apply_check_value form-control limit-width" fixed=0 max=100 min=0 {{?it.apply.type!=3}}disabled{{?}} value="{{?it.apply.type==3}}{{?it.apply.value && it.apply.value[0]}}{{=it.apply.value[0]}}{{??}}0{{?}}{{??}}0{{?}}"/> &nbsp;%\
                                                </div>\
                                            </div>\
                                            <div class="radio i-checks">\
                                                <div>\
                                                    <div data-id=4 class="UIstock apply_check iradio_square-green {{?it.apply.type==4}}checked{{?}}" style="position: relative;">\
                                                    </div>\
                                                    订单减固定金额&nbsp;&nbsp;\
                                                    <input type="text" autofocus class="apply_check_value form-control limit-width" fixed=2 min=0 {{?it.apply.type!=4}}disabled{{?}} value="{{?it.apply.type==4}}{{?it.apply.value && it.apply.value[0]}}{{=it.apply.value[0]}}{{??}}0{{?}}{{??}}0{{?}}"/> &nbsp;元(人民币)\
                                                </div>\
                                            </div>\
                                            <div class="radio i-checks">\
                                                <div>\
                                                    <div data-id=5 class="UIstock apply_check iradio_square-green {{?it.apply.type==5}}checked{{?}}" style="position: relative;">\
                                                    </div>\
                                                    订单送赠品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                                                    <a href="javascript:;" class="btn btn-primary btn-sm {{?it.apply.type!=5}}disabled{{?}}" style="width:130px" cb-event="click~requestIncludeExcludeList">选择赠品</a>\
                                                    <input type="text" class="hidden apply_check_value form-control limit-width {{?it.apply.type!=5}}disabled{{?}}" {{?it.apply.type!=5}}disabled{{?}}/>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        {{?}}\
                                    </div>\
                                </div>'
});