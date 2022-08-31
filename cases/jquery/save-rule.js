// 350         //提交保存规则信息
// 351         $(".preservation").off('click').on('click',function(){
// 352                 var firstTheme = $('#periodSel').text();
// 353                 var secondTheme = $('#periodSelTheme').text();
// 354                 var thirdTheme = $('#thirdTheme').val();
// 355                 if(thirdTheme =="---请选择---"){
// 356                         console.log('thirdTheme:=',thirdTheme)
// 357                         alert("主题3不能为空");
// 358                         return;
// 359                 }
// 360 
// 361                 if(firstTheme =="---请选择---" || secondTheme == "---请选择---"){
// 362                         alert("主题不能为空");
// 363                         return;
// 364                 }
// 365 
// 366 
// 367                 if($("#ruleName").val() == ""){
// 368                         alert("规则名称不能为空");
// 369                         return;
// 370                 }
// 371                 $(this).attr("disabled",true);
// 372                 $(this).text('保存规则设置中...');
// 373                 var ruleName = $("#ruleName").val();
// 374                 var ruleType = $("#periodSel").html();
// 375                 var routine = $("input[name='routine']:checked").val();
// 376                 var again = $("input[name='again']:checked").val();
// 377                 var ruleUsage = $("#ruleUsage").val();
// 378 
// 379                 $(".subject-matter").load('filter/saveRule/saveTemplate',{'ruleName':ruleName,'ruleType':ruleType,'routine':routine,'again':again,'ruleUsage':ruleUsage,'firstTheme':firstTheme,'secondTheme':secondTheme,'thirdTheme':thirdTheme});
// 380         });
        //提交保存规则信息
        $(".preservation").off('click').on('click',function(){
          var firstTheme = $('#periodSel').text();
          var secondTheme = $('#periodSelTheme').text();
          var thirdTheme = $('#thirdTheme').val();
          if(thirdTheme =="---请选择---"){
                  console.log('thirdTheme:=',thirdTheme)
                  alert("主题不能为空");
                  return;
          }

          if(firstTheme =="---请选择---" || secondTheme == "---请选择---"){
                  alert("主题不能为空");
                  return;
          }


          if($("#ruleName").val() == ""){
                  alert("规则名称不能为空");
                  return;
          }
          $(this).attr("disabled",true);
          $(this).text('保存规则设置中...');
          var ruleName = $("#ruleName").val();
          var ruleType = $("#periodSel").html();
          var routine = $("input[name='routine']:checked").val();
          var again = $("input[name='again']:checked").val();
          var ruleUsage = $("#ruleUsage").val();

          $(".subject-matter").load('filter/saveRule/saveTemplate',{'ruleName':ruleName,'ruleType':ruleType,'routine':routine,'again':again,'ruleUsage':ruleUsage,'firstTheme':firstTheme,'secondTheme':secondTheme,'thirdTheme':thirdTheme});
  });

// 循环数组，查找是否有重复的主题
function checkRepeat(arr){
  var newArr = [];
  for(var i=0;i<arr.length;i++){
    if(newArr.indexOf(arr[i]) == -1){
      newArr.push(arr[i]);
    }
  }
  return newArr;
}