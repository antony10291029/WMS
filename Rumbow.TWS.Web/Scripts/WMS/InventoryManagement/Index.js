﻿$(document).ready(function () {
    if ($('#AdjustmentCondition_CustomerID').val() == "") {
        $('#AdjustmentCondition_CustomerID option:first').next().attr("selected", "selected");

    } else {

    }
    $(".Ooperation").live("mouseover", function () {
        $(this).prev()[0].style.display = "none";
    });
    $(".Ooperation").live("mouseenter", function () {
        $(this).prev()[0].style.display = "";
    })
    $(".Adiv").live("mouseleave", function () {
        $(this)[0].style.display = "none";
    })
    $("tr").live("mouseenter", function () {
        $(".Adiv").each(function (a, b) {
            $(b)[0].style.display = "none";
        })

    })
    //$('select[id=CustomerID]').live('change', function () {


    //    window.location.href = "/WMS/InventoryManagement/Index/?customerID=" + $(this).val();
    //});
    $(function ($) {
        $('body').click(function () {
            ShowsOut()
        });
    });
    $('select[id=CustomerID]').live('change', function () {
        //if ($(this).val().length > 0) {
        var selec = $(this).val(); //获取改变的选项值
        document.all['warehousename'].length = 0;
        if (selec != "") {
            $.ajax({
                type: "POST",
                url: "/WMS/InventoryManagement/ChangeCustomer",
                data: {
                    "ID": selec == null ? 0 : selec,
                },
                async: "false",
                success: function (data) {

                    var js = JSON.parse(data);
                    if (js.length != 0) {

                        for (var i = 0; i < js.length; i++) {
                            document.all['warehousename'].options.add(new Option(js[i]["Text"], js[i]["Value"]));
                        }
                    }

                },
                error: function (msg) {
                    alert(msg.val);
                }
            });
        }
        //}
    });

    var setPageControlVal = function () {
        $('.DropDownList').each(function (index) {
            var id = $(this).attr("id");
            var descId = "AdjustmentCondition_" + id.substr(0, id.length - 4) + "ID";
            $('#' + descId).val($(this).val());
        });
        $(".calendarRange").each(function (index) {
            var id = $(this).attr('id');
            var pref = id.split('_')[0];
            var actualID = id.split('_')[1];

            var descID = 'AdjustmentCondition_';
            if (pref === 'start') {
                descID += 'Start' + actualID;
            }
            else {
                descID += 'End' + actualID;
            }
            $('#' + descID).val($(this).val());
        });
    };



    $('#searchButton').click(function () {
        setPageControlVal();
    });
    //全选
    $('#selectAll').click(function () {
        var checkBoxs = $("#resultTable tbody input[type='checkbox']");

        if ($(this).attr("checked") === "checked") {
            checkBoxs.attr("checked", "checked");
        } else {
            checkBoxs.removeAttr("checked");
        }
    });

    //客户  仓库联动
    $('select[id=AdjustmentCondition_CustomerID]').live('change', function () {
        //window.location.href = "/WMS/InventoryManagement/Index/?customerID=" + $(this).val();
    });
    //仓库  库区联动
    $('select[id=AdjustmentCondition_Warehouse]').live('change', function () {
        //window.location.href = "/WMS/InventoryManagement/Index/?warehouseID=" + $(this).val() + "&customerID=" + $("#AdjustmentCondition_CustomerID").val();

    });
    //库区  库位联动
    $('select[id=AdjustmentCondition_str19]').live('change', function () {
        //window.location.href = "/WMS/InventoryManagement/Index/?warehouseID=" + $("#AdjustmentCondition_Warehouse").val() + "&warehouseAreaID=" + $(this).val();
    });
})
$("#confirmReturn").live('click', function () {
    closePopup();
});
//单条取消
var IDs = '';
var oneself = '';
function Cancel(ID, oneselfs) {
    layer.confirm('<font size="4">确认是否取消</font>', {
        btn: ['确定', '放弃'], icon: 3, area: ['400px', '200px'], shift: 0, closeBtn: 1,
        //shade: [0.8, '#393D49'],
        title: ['提示', 'font-size:18px;']
        //按钮
    }, function (index) {
        layer.close(index);
        IDs = ID;
        oneself = oneselfs;
        if (IDs != "" && IDs != 0) {
            $.ajax({
                type: "POST",
                url: "/WMS/InventoryManagement/Cancel",
                data: {
                    "ID": IDs,
                },
                async: "false",
                success: function (data) {
                    showMsg("取消成功!", "4000");
                    closePopup();
                    if ($(oneself).parent().parent().prev().prev().prev()[0].innerText.trim() == "冻结") {
                        $(oneself).prev()[0].style.visibility = "hidden";
                        $(oneself).prev().prev()[0].style.visibility = "hidden";
                        $(oneself)[0].style.visibility = "hidden";
                        $(oneself).next()[0].style.visibility = "hidden";
                        $(oneself).parent().parent().prev().prev().prev().prev()[0].innerText = "取消"
                    } else {
                        $(oneself).prev()[0].style.visibility = "hidden";
                        $(oneself).prev().prev()[0].style.visibility = "hidden";
                        $(oneself)[0].style.visibility = "hidden";
                        $(oneself).parent().parent().prev().prev().prev().prev()[0].innerText = "取消"
                    }
                },
                error: function (msg) {
                    showMsg("操作失败！", 4000);
                }
            });
        }
    });


    //IDs = ID;
    //oneself = oneselfs;
    //openPopup('popp', true, 300, 200, null, 'confirm');
}
$("#confirmOK").live('click', function () {
    if (IDs != "" && IDs != 0) {
        $.ajax({
            type: "POST",
            url: "/WMS/InventoryManagement/Cancel",
            data: {
                "ID": IDs,
            },
            async: "false",
            success: function (data) {
                showMsg("取消成功!", "4000");
                closePopup();
                if ($(oneself).parent().prev().prev().prev()[0].innerText.trim() == "冻结") {
                    $(oneself).prev()[0].style.visibility = "hidden";
                    $(oneself).prev().prev()[0].style.visibility = "hidden";
                    $(oneself)[0].style.visibility = "hidden";
                    $(oneself).next()[0].style.visibility = "hidden";
                    $(oneself).parent().prev().prev().prev().prev()[0].innerText = "取消"
                } else {
                    $(oneself).prev()[0].style.visibility = "hidden";
                    $(oneself).prev().prev()[0].style.visibility = "hidden";
                    $(oneself)[0].style.visibility = "hidden";
                    $(oneself).parent().prev().prev().prev().prev()[0].innerText = "取消"
                }
            },
            error: function (msg) {
                showMsg("操作失败！", "4000");
            }
        });
    }
});

//$("#skulist").live('keydown', function () {
//    $(this).autocomplete({
//        source: function (request, response) {
//            if (request.term.length > 4) {
//                $.ajax({
//                    url: "/WMS/InventoryManagement/GetALLSKU",
//                    type: "POST",
//                    dataType: "json",
//                    data: { sku: request.term, CustomerID: $("#CustomerID").val() },
//                    success: function (data) {
//                        response($.map(data, function (item) {
//                            return { label: item.Text, value: item.Text, data: item }
//                        }));
//                    }
//                })
//            };
//        },
//        select: function (event, ui) {
//            $("#skulist").val(ui.item.data.Text);
//        }
//    })
//})
//
$("#locationselect").live('keydown', function () {
    $(this).autocomplete({
        source: function (request, response) {
            if (request.term.length > 4) {
                $.ajax({
                    url: "/WMS/InventoryManagement/GetLocationList",
                    type: "POST",
                    dataType: "json",
                    data: { location: request.term, warehouseid: $("#AdjustmentCondition_Warehouse").val(), areaid: $("#AdjustmentCondition_str19").val() },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return { label: item.Text, value: item.Text, data: item }
                        }));
                    }
                })
            };
        },
        select: function (event, ui) {
            $("#locationselect").val(ui.item.data.Text);
        }
    })
})

//批量导入新增
function fileImportClick() {
    if ($('#importExcel').val() === '') {
        showMsg("请选择要导入的Excel", "4000");
        return false;
    }

    var exp = /.xls$|.xlsx$/;
    var fileImport = $('#fileImport').clone();
    if (exp.exec($('#importExcel').val()) == null) {
        showMsg("请选择Excel格式的文件", "4000");
        $(this).before(fileImport);
        return false;
    };
    WebPortal.MessageMask.Show("导入中...");
    var CustomerID = $("#CustomerID").val()
    var customername = $('select#CustomerID').find('option:selected').text();
    var warehousename = $('select#warehousename').find('option:selected').text();
    $.ajaxFileUpload({
        url: '/WMS/InventoryManagement/Imports',
        secureuri: false,
        fileElementId: 'importExcel',
        dataType: 'json',
        data: {
            "customerid": CustomerID,
            "customername": customername,
            "warehousename": warehousename,
        },
        success: function (data, status) {
            WebPortal.MessageMask.Close();
            $('#outPutResult').html("<h4>" + data.result + " </h4 > ");
        },
        error: function (data, status, e) {
            $('#outPutResult').html("<h4><font color='#FF0000'>导入失败！<br/>" + data.result + "</font></h4>");
            WebPortal.MessageMask.Close();
        }
    });
    return false;
}
//批量取消
function Cancels() {
    layer.confirm('<font size="4">确认是否取消</font>', {
        btn: ['确定', '放弃'], icon: 3, area: ['400px', '200px'], shift: 0, closeBtn: 1,
        //shade: [0.8, '#393D49'],
        title: ['提示', 'font-size:18px;']
        //按钮
    }, function (index) {
        layer.close(index);
        if ($("#resultTable tbody input[type='checkbox']:checked").size() == 0) {
            showMsg("请选择单据！", "4000");
            return;
        } else {
            var status = '';
            var id = '';
            $('.checkForSelect').each(function (index) {
                if ($(this).attr('checked') === 'checked') {
                    status += "'" + $(this).attr('data-name') + "'" + ",";
                    id += "'" + $(this).attr('data-id') + "'" + ",";
                }
            })
            id = id.substring(0, id.length - 1).trim();
            status = status.substring(0, status.length - 1).trim();
            var arrys = new Array();
            arrys = status.split(',');
            var count = 0;

            for (var i = 0; i < arrys.length; i++) {
                if (arrys[i] == "'1'") {
                    count++;
                }
            }
            if (count == 0) {
                showMsg("没有符合要求的单据!", "4000");
                return;
            } else {
                var messages = '';
                if (arrys.length == count) {
                    messages = "您一共选择" + arrys.length.toString() + "条单据您确定执行取消操作吗？";
                } else {
                    messages = "您一共选择" + arrys.length.toString() + "条单据,符合要求的有" + count + "条,其它" + (arrys.length - count).toString() + "条因为状态不是新增,您确定执行取消操作吗？";
                }
                $.ajax({
                    type: "POST",
                    url: "/WMS/InventoryManagement/Cancels",
                    data: {
                        "IDs": id,
                    },
                    async: "false",
                    success: function (data) {
                        showMsg("取消成功!", "4000");
                        location.href = "/WMS/InventoryManagement/Index";
                        //window.location.reload();
                    },
                    error: function (msg) {
                        showMsg("操作失败！", "4000");
                    }
                });
            }
        }
    });


}
//批量完成
function PLComplet() {
    layer.confirm('<font size="4">确认是否完成</font>', {
        btn: ['确定', '放弃'], icon: 3, area: ['400px', '200px'], shift: 0, closeBtn: 1,
        //shade: [0.8, '#393D49'],
        title: ['提示', 'font-size:18px;']
        //按钮
    }, function (index) {
        layer.close(index);
        if ($("#resultTable tbody input[type='checkbox']:checked").size() == 0) {
            showMsg("请选择单据！", "4000");
            return;
        } else {
            var status = '';
            var id = '';
            var type = '';
            $('.checkForSelect').each(function (index) {
                if ($(this).attr('checked') === 'checked') {
                    status += "'" + $(this).attr('data-name') + "'" + ",";
                    id += $(this).attr('data-id') + ",";
                    //第一行直接添加
                    if (type == '') {
                        type += $(this).attr('data') + ",";
                    }
                    //重复数据不再添加 
                    var types = new Array();
                    types = type.split(',');
                    var isexist = false;
                    for (var i = 0; i < types.length; i++) {
                        if (types[i].indexOf($(this).attr('data'))) {
                            isexist = true;
                        }
                    }
                    if (!isexist) {
                        type += $(this).attr('data') + ",";
                    }
                    //type +=  $(this).attr('data')  + ",";
                }
            })
            id = id.substring(0, id.length - 1).trim();
            status = status.substring(0, status.length - 1).trim();
            type = type.substring(0, type.length - 1).trim();

            var arrys = new Array();
            arrys = status.split(',');

            var types = new Array();
            types = type.split(',');

            for (var i = 0; i < types.length; i++) {
                if (types.length >= 2 && types[i] != types[i + 1]) {
                    showMsg("只能选择同一单据类型！", "4000");
                    return;
                }
            }
            var count = 0;

            for (var i = 0; i < arrys.length; i++) {
                if (arrys[i] == "'1'") {
                    count++;
                }
            }
            if (count == 0) {
                showMsg("没有符合要求的单据!", "4000");
                return;
            } else {
                var messages = '';
                if (arrys.length == count) {
                    messages = "您一共选择" + arrys.length.toString() + "条单据您确定执行完成操作吗？";
                } else {
                    messages = "您一共选择" + arrys.length.toString() + "条单据,符合要求的有" + count + "条,其它" + (arrys.length - count).toString() + "条因为状态不是新增,您确定执行完成操作吗？";
                }
                $.ajax({
                    type: "POST",
                    url: "/WMS/InventoryManagement/PLComplet",
                    data: {
                        "IDs": id,
                        "type": types[0],
                    },
                    async: "false",
                    success: function (data) {
                        if (data == "操作成功") {
                            showMsg("操作成功!", "4000");
                            location.href = "/WMS/InventoryManagement/Index";
                        }
                        else {
                            showMsg(data, "4000");
                        }
                        //window.location.reload();
                    },
                    error: function (msg) {
                        showMsg("操作失败！", "4000");
                    }
                });
            }
        }
    });


}
//反馈鲸仓
function submitAndSend(AdjNumber, ID, type, oneself) {
    layer.confirm('<font size="4">确认是否提交并反馈鲸仓</font>', {
        btn: ['确定', '放弃'], icon: 3, area: ['400px', '200px'], shift: 0, closeBtn: 1,
        //shade: [0.8, '#393D49'],
        title: ['提示', 'font-size:18px;']
        //按钮
    }, function (index) {
        layer.close(index);
        $.ajax({
            type: "POST",
            url: "/WMS/InventoryManagement/Complet",
            data: {
                "ID": ID,
                "type": "库存调整单",
            },
            async: "false",
            success: function (data) {

                if (data == "操作成功") {
                    $.ajax({
                        type: "POST",
                        url: "/WMS/InventoryManagement/submitAndSend",
                        data: {
                            "AdjustmentNumber": AdjNumber
                        },
                        async: "false",
                        success: function (data) {
                            if (data.Result.length != 0) {
                                var table1 = $('#OrderCheck01');
                                $("#OrderCheck01  tr:not(:first)").empty("");
                                for (var i = 0; i < data.Result.length; i++) {
                                    var row = $("<tr></tr>");
                                    var td1 = $("<td>" + data.Result[i].relatednumber + "</td>");
                                    var td2 = $("<td>" + (data.Result[i].flag == "success" ? "成功" : "失败") + "</td>");
                                    var td3 = $("<td>" + data.Result[i].message + "</td>");
                                    row.append(td1);
                                    row.append(td2);
                                    row.append(td3);
                                    table1.append(row);
                                }
                                layer.open({
                                    type: 1,
                                    title: '反馈结果',
                                    skin: 'layui-layer-rim', //加上边框
                                    area: ['800px', '600px'], //宽高
                                    content: $('#OrderCheck01Div')

                                });
                            }
                            else {
                                showMsg("反馈失败！" + data, 3000);
                            }

                        },
                        error: function (msg) {
                            showMsg("操作失败！", "4000");
                        }
                    });

                    $(oneself)[0].style.visibility = "hidden";

                    $(oneself).parent().next().attr('disabled', 'disabled');
                    //$(oneself).parent().parent().prev().prev().prev().prev()[0].innerText = "完成"
                    $(oneself).parent().parent().next().next().next().next().next().next().next()[0].innerText = "完成";

                } else {
                    showMsg(data, "4000");
                }

            },
            error: function (msg) {
                showMsg("操作失败！", "4000");
            }
        });




    });
}


//单条完成
function Complet(ID, type, oneself) {
    layer.confirm('<font size="4">确认是否完成</font>', {
        btn: ['确定', '放弃'], icon: 3, area: ['400px', '200px'], shift: 0, closeBtn: 1,
        //shade: [0.8, '#393D49'],
        title: ['提示', 'font-size:18px;']
        //按钮
    }, function (index) {
        layer.close(index);
        $.ajax({
            type: "POST",
            url: "/WMS/InventoryManagement/Complet",
            data: {
                "ID": ID,
                "type": type,
            },
            async: "false",
            success: function (data) {

                if (data == "操作成功") {
                    showMsg("操作成功!", "4000");
                    //if ($(oneself).parent().parent().prev().prev().prev()[0].innerText.trim() == "冻结") {
                    if ($(oneself).parent().parent().next().next().next().next().next().next().next().next()[0].innerText.trim() == "冻结") {
                        $(oneself).prev()[0].style.visibility = "hidden";
                        $(oneself)[0].style.visibility = "hidden";
                        $(oneself).next()[0].style.visibility = "hidden";
                        //$(oneself).next().next()[0].style.visibility = "hidden";
                        //$(oneself).parent().parent().prev().prev().prev().prev()[0].innerText = "完成"
                        $(oneself).parent().parent().next().next().next().next().next().next().next()[0].innerText = "完成";
                    } else {
                        $(oneself).prev()[0].style.visibility = "hidden";
                        $(oneself)[0].style.visibility = "hidden";
                        $(oneself).next()[0].style.visibility = "hidden";
                        $(oneself).parent().next().attr('disabled', 'disabled');
                        //$(oneself).parent().parent().prev().prev().prev().prev()[0].innerText = "完成"
                        $(oneself).parent().parent().next().next().next().next().next().next().next()[0].innerText = "完成";
                    }
                } else {
                    showMsg(data, "4000");
                }

            },
            error: function (msg) {
                showMsg("操作失败！", "4000");
            }
        });
    });

}
//解冻
function Unfreeze(ID, oneself) {
    layer.confirm('<font size="4">确认是否解冻</font>', {
        btn: ['确定', '放弃'], icon: 3, area: ['400px', '200px'], shift: 0, closeBtn: 1,
        //shade: [0.8, '#393D49'],
        title: ['提示', 'font-size:18px;']
        //按钮
    }, function (index) {
        layer.close(index);
        $.ajax({
            type: "POST",
            url: "/WMS/InventoryManagement/Unfreeze",
            data: {
                "ID": ID,
            },
            async: "false",
            success: function (data) {
                showMsg("解冻成功!", "4000");
                $(oneself)[0].style.visibility = "hidden";
                $(oneself).parent().parent().next().next().next().next().next().next().next()[0].innerText = "已解冻"
            },
            error: function (msg) {
                showMsg("解冻失败！", "4000");
            }
        });
    });



}
//新增操作
function createasn(ProjectName) {
    //弹出层
    openPopup("selectPop", true, 350, 200, null, 'selectType', true);
    $("#popupLayer_selectPop")[0].style.top = "200px";
    //var customerid = $('#AdjustmentCondition_CustomerID').val();
    //if (ProjectName == "Akzo") {
    //    location.href = "/WMS/InventoryManagement/AddorEditorViewAdjust_akzo/?ID=0" + "&customerID=" + customerid + "" + "&ViewType=1"
    //}
    //else {
    //    location.href = "/WMS/InventoryManagement/AddorEditorViewAdjust/?ID=0" + "&customerID=" + customerid + "" + "&ViewType=1"
    //}
}
function edit(ID, AdjustmentType) {
    var customerid = $('#AdjustmentCondition_CustomerID').val();
    //location.href = "/WMS/InventoryManagement/AddorEditorViewAdjust/?ID=" + ID + "&customerID=" + customerid + "" + "&ViewType=2"

    //if (type_value == "库存调整单") {
    //    window.location.href = "/WMS/InventoryManagement/AdjustAddorEditorView/?ID=0" + "&customerID=" + customerid + "" + "&ViewType=1";
    //} else if (type_value == "库存移动单") {
    //    window.location.href = "/WMS/InventoryManagement/MoveAddorEditorView/?ID=0" + "&customerID=" + customerid + "" + "&ViewType=1";
    //} else if (type_value == "库存冻结单") {
    //    window.location.href = "/WMS/InventoryManagement/FrozenAddorEditorView/?ID=0" + "&customerID=" + customerid + "" + "&ViewType=1";
    //} else if (type_value == "库存品级调整单") {
    //    window.location.href = "/WMS/InventoryManagement/AdjustGoodsTypeAddorEditorView/?ID=0" + "&customerID=" + customerid + "" + "&ViewType=1";
    //} else {
    //    showMsg("请选择调整单类型!", "4000");
    //}
    if (AdjustmentType == "库存调整单") {
        location.href = "/WMS/InventoryManagement/AdjustAddorEditorView/?ID=" + ID + "&customerID=" + customerid + "" + "&ViewType=2"
    } else if (AdjustmentType == "库存移动单") {
        window.location.href = "/WMS/InventoryManagement/MoveAddorEditorView/?ID=" + ID + "&customerID=" + customerid + "" + "&ViewType=2";
    } else if (AdjustmentType == "库存冻结单") {
        window.location.href = "/WMS/InventoryManagement/FrozenAddorEditorView/?ID=" + ID + "&customerID=" + customerid + "" + "&ViewType=2";
    } else if (AdjustmentType == "库存品级调整单") {
        window.location.href = "/WMS/InventoryManagement/AdjustGoodsTypeAddorEditorView/?ID=" + ID + "&customerID=" + customerid + "" + "&ViewType=2";
    } else {
        location.href = "/WMS/InventoryManagement/AdjustAddorEditorView/?ID=" + ID + "&customerID=" + customerid + "" + "&ViewType=2"
    }
}

function ShowsIn(ID, obj) {
    if ($("#operateTD" + ID)[0].style.display != "" && $("#operateTD" + ID)[0].style.display != "block") {
        $(".ddiv:not(obj)").animate({
            width: "hide",
            width: "400%",
            paddingRight: "hide",
            paddingLeft: "hide",
            marginRight: "hide",
            marginLeft: "hide"

        }, 100);
        $("#operateTD" + ID).animate({
            width: "show",
            width: "445%",
            paddingRight: "show",
            paddingLeft: "show",
            marginRight: "show",
            marginLeft: "show"
        });
    }
    //$("#operateTD" + ID)[0].style.display = "";
}

function ShowsOut() {
    //$("#operateTD" + ID).fadeOut("slow");

    $(".ddiv").animate({
        width: "hide",
        width: "400%",
        paddingRight: "hide",
        paddingLeft: "hide",
        marginRight: "hide",
        marginLeft: "hide"

    }, 100);
    //$("#operateTD" + ID)[0].style.display = "";
}

$("#portButtonTemplet").click(function () {
    demo();
})
function demo(url) {
    // $.send('/WMS/Product/demoExecl');
    // 绑定导出按钮

    var ID = $('select[id=CustomerID]')[0].value;
    var url = '/WMS/InventoryManagement/ReportExportExecl';
    var form = $("<form>");
    form.attr('style', 'display:none');
    form.attr('target', '');
    form.attr('method', 'post}');
    form.attr('action', url);//'/WMS/PreOrder/ReportExportExecl'
    var input1 = $('<input>');
    input1.attr('type', 'hidden');
    input1.attr('name', 'demo');
    input1.attr('value', 'Export');
    var input2 = $('<input>');
    input2.attr('type', 'hidden');
    input2.attr('name', 'fileId');
    input2.attr('value', "fileId");
    var input3 = $('<input id="ID" name="ID" type="hidden" value="' + ID + '" />');
    $('body').append(form);
    form.append(input1);
    form.append(input2);
    form.append(input3);

    form.submit();
    form.remove();
}
$("#selectReturn").live('click', function () {
    closePopup();
});

$("#selectOK").live('click', function () {
    var customerid = $('#AdjustmentCondition_CustomerID').val();
    var type_value = $("#select_adjustmenttype").val();
    if (type_value == "库存调整单") {
        window.location.href = "/WMS/InventoryManagement/AdjustAddorEditorView/?ID=0" + "&customerID=" + customerid + "" + "&ViewType=1";
    } else if (type_value == "库存移动单") {
        window.location.href = "/WMS/InventoryManagement/MoveAddorEditorView/?ID=0" + "&customerID=" + customerid + "" + "&ViewType=1";
    } else if (type_value == "库存冻结单") {
        window.location.href = "/WMS/InventoryManagement/FrozenAddorEditorView/?ID=0" + "&customerID=" + customerid + "" + "&ViewType=1";
    } else if (type_value == "库存品级调整单") {
        window.location.href = "/WMS/InventoryManagement/AdjustGoodsTypeAddorEditorView/?ID=0" + "&customerID=" + customerid + "" + "&ViewType=1";
    } else {
        showMsg("请选择调整单类型!", "4000");
    }
})