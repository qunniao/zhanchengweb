    // 获取商城商品
     _ajax({
        url : "/product/productList",  // url---->地址
        type : "GET",   // type ---> 请求方式
        async : true,   // async----> 同步：false，异步：true 
        data : {        //传入信息
            pid:16,
            desc:'desc',
            page:1
        },
        success : function(data){  
            let datas =JSON.parse(data)
            if(datas.status==0){
                let shopdata=datas.data
                for(let i=0;i<shopdata.length;i++){
                    let appenddiv ='<li onclick="gotoproduct('+shopdata[i].pid+')"><img src="'+shopdata[i].url+'"><div class="shoptext"><div>'+shopdata[i].product_name+'</div><div class="shoptexttwo">'+shopdata[i].product_intro+'</div></div><div class="shopnumbottom"><div class="shopnumbottomleft"><img src="./img/index/shopsmall.png"><label>服务APP</label></div><div class="shopnumbottomright"><img src="./img/index/shopsamlltime.png"><label>90天</label></div></div></li>'
                    $('#shopmall').append(appenddiv)
                }
            }
        }
     })
    //  获取小程序案例
     _ajax({
        url : "/case",  // url---->地址
        type : "GET",   // type ---> 请求方式
        async : true,   // async----> 同步：false，异步：true 
        data : {        //传入信息
            page:1,
            bid:28
        },
        success : function(data){  
            let datas =JSON.parse(data)
            if(datas.status==0){
                let casedata=datas.data
                for(let i=0;i<casedata.length;i++){
                    let appenddiv ='<li onclick="gotocase('+casedata[i].case.cid+')"><img src="'+casedata[i].case.cover+'"><div class="casecontent"><img src="./img/companylogo.png"><div class="casecontetntext"><div>'+casedata[i].case.name+'</div><div>服务类APP</div></div></div><div class="casetybtn">扫码体验</div></li>'
                    $('#wxcaselist').append(appenddiv)
                }
            }
        }
     })
    //  获取PC序案例
     _ajax({
        url : "/case",  // url---->地址
        type : "GET",   // type ---> 请求方式
        async : true,   // async----> 同步：false，异步：true 
        data : {        //传入信息
            page:1,
            bid:30
        },
        success : function(data){  
            let datas =JSON.parse(data)
            if(datas.status==0){
                let casedata=datas.data
                for(let i=0;i<casedata.length;i++){
                    let appenddiv ='<li onclick="gotocase('+casedata[i].case.cid+')"><img src="'+casedata[i].case.cover+'"><div class="casecontent"><img src="./img/companylogo.png"><div class="casecontetntext"><div>'+casedata[i].case.name+'</div><div>服务类APP</div></div></div><div class="casetybtn">扫码体验</div></li>'
                    $('#pccaselist').append(appenddiv)
                }
            }
        }
     })
    //  获取app案例
     _ajax({
        url : "/case",  // url---->地址
        type : "GET",   // type ---> 请求方式
        async : true,   // async----> 同步：false，异步：true 
        data : {        //传入信息
            page:1,
            bid:27
        },
        success : function(data){  
            let datas =JSON.parse(data)
            if(datas.status==0){
                let casedata=datas.data
                for(let i=0;i<casedata.length;i++){
                    let appenddiv ='<li onclick="gotocase('+casedata[i].case.cid+')"><img src="'+casedata[i].case.cover+'"><div class="casecontent"><img src="./img/companylogo.png"><div class="casecontetntext"><div>'+casedata[i].case.name+'</div><div>服务类APP</div></div></div><div class="casetybtn">扫码体验</div></li>'
                    $('#appcaselist').append(appenddiv)
                }
            }
        }
     })
    function gotocase(id){
        location.href= './casedetail.html?cid='+id
    }
    function gotoproduct(id){
        location.href= './prodectdetail.html?pid='+id
    }
    //  获取新闻类目
    function getnewstitle(id){
        console.log(id)
       _ajax({
           url : "news/list",  // url---->地址
           type : "GET",   // type ---> 请求方式
           async : true,   // async----> 同步：false，异步：true 
           data : {        //传入信息
               current:1,
               size:6
           },
           success : function(data){
               $('#newslists').empty()
               let newsdatas=JSON.parse(data)
               if(newsdatas.status==0){
                   for(let i=0;i<newsdatas.data.records.length;i++){
                       let newsdiv='<li onclick="gotonewsdetail('+newsdatas.data.records[i].id+')"><div class="newscontent">'+newsdatas.data.records[i].title+'</div><div class="newstime">'+timeStamp2String(newsdatas.data.records[i].gmtCreate,3)+'</div></li>'
                        $('#newslists').append(newsdiv)
                   }
               }
           }
        })
    }
    function gotonewsdetail(id){
        location.href= './newsdetail.html?id='+id
    }
    _ajax({
        url : "newsTypes/list",  // url---->地址
        type : "GET",   // type ---> 请求方式
        async : true,   // async----> 同步：false，异步：true 
        data : {        //传入信息
            current:1,
            size:6
        },
        success : function(data){  
            let datas =JSON.parse(data)
            if(datas.status==0){
                let newtypedata=datas.data
                console.log(newtypedata)
                for(let i=0;i<newtypedata.records.length;i++){
                    console.log('执行了')
                    if(i==0){
                        getnewstitle(newtypedata.records[i].id)
                    }
                    $('#newtypedata').append('<li  onclick="getnewstitle('+newtypedata.records[i].id+')" >'+newtypedata.records[i].name+'</li>')
                }
                // for(let i=0;i<casedata.length;i++){
                //     let appenddiv ='<li><img src="'+casedata[i].case.cover+'"><div class="casecontent"><img src="./img/companylogo.png"><div class="casecontetntext"><div>'+casedata[i].case.name+'</div><div>服务类APP</div></div></div><div class="casetybtn">扫码体验</div></li>'
                //     $('#appcaselist').append(appenddiv)
                // }
            }
        }
     })