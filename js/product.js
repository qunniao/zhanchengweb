var app = new Vue({
    el:'#app',
    data:{
        type:[],
        typetwo:[],
        page:1,
        shoplist:[
           
        ],
        total:0,
        nowid:'',
        oneid:'',
        shoptext:'',
        setrchtwo:'',
        nowsearch:'',
        nowsearchftp:1,
        savesearch:1
    },
    methods: {
        findData:function(){
            var that = app;
            app.casea.push({
                title:'App定制开发',
                price:'3000-1万',
                leimu:'**'
            })
        },
        changefindData:function(type,id,ftp){
            var that = app;
           if(type==1){
               for(let i=0;i<that.type.length;i++){
                    that.type[i].check=false
               }
               for(let i=0;i<that.type.length;i++){
                    if(that.type[i].id==id){
                        that.type[i].check=true
                    }
                }
                app.gettwotype(id)
           }
           if(type==2){
                for(let i=0;i<that.typetwo.length;i++){
                    that.typetwo[i].check=false
                }
                if(ftp==1){
                    app.setrchtwo=''
                    app.getshopdata(app.oneid,1,1)
                }else{
                    for(let i=0;i<that.typetwo.length;i++){
                        if(that.typetwo[i].id==id){
                            that.typetwo[i].check=true
                        }
                    }
                    app.getshopdata(id,1,2)
                }
            }
        },getonetype:function(){
            _ajax({
                url : "/productType/firstType",  // url---->地址
                type : "GET",   // type ---> 请求方式
                async : true,   // async----> 同步：false，异步：true 
                data : {        //传入信息
                },
                success : function(data){  
                   let datas =JSON.parse(data)
                   console.log(datas)
                    if(datas.status==0){
                        let typeonedata =[]
                        for(let i=0;i<datas.data.length;i++){
                            if(i==0){
                                typeonedata.push({name:datas.data[i].typeName,id:datas.data[i].tid,check:true})
                                app.gettwotype(datas.data[i].tid)
                            }else{
                                typeonedata.push({name:datas.data[i].typeName,id:datas.data[i].tid,check:false})
                            }
                        }
                        app.type=typeonedata
                    }
                }
             })
        },gettwotype:function(id){
            app.oneid=id
            app.getshopdata(id,1,1)
            _ajax({
                url : "productType/secondType",  // url---->地址
                type : "GET",   // type ---> 请求方式
                async : true,   // async----> 同步：false，异步：true 
                data : {        //传入信息
                    pid:id
                },
                success : function(data){  
                   let datas =JSON.parse(data)
                   console.log(datas)
                    if(datas.status==0){
                        let typetwodata =[]
                        for(let i=0;i<datas.data.length;i++){
                            typetwodata.push({name:datas.data[i].typeName,id:datas.data[i].tid,check:false})
                        }
                        app.typetwo=typetwodata
                    }
                }
             })
        },getshopdata:function(id,page,type){
            app.page=page
            app.nowsearch=1
            app.nowid=id
            if(type==1){
                app.setrchtwo=''
            }else{
                app.setrchtwo='1'
            }
            _ajax({
                url : "/product/getList",  // url---->地址
                type : "GET",   // type ---> 请求方式
                async : true,   // async----> 同步：false，异步：true 
                data : {        //传入信息
                    tid:id,
                    sortType:app.nowsearchftp,
                    current :page,
                    size:8
                },
                success : function(data){  
                    let datas =JSON.parse(data)
                    if(datas.status==0){
                        let shoplistdata =[]
                        for(let i=0;i<datas.data.records.length;i++){
                            shoplistdata.push(datas.data.records[i])
                        }
                        app.total=datas.data.total
                        app.shoplist=shoplistdata
                        console.log(app.shoplist)
                    }
                }
             })
        },getshoptwo:function(page){
            app.page=page
            app.nowsearch=2
            _ajax({
                url : "/product/searchProduct",  // url---->地址
                type : "GET",   // type ---> 请求方式
                async : true,   // async----> 同步：false，异步：true 
                data : {        //传入信息
                    word :app.shoptext,
                    sortType:app.nowsearchftp,
                    page:page
                },
                success : function(data){  
                    let datas =JSON.parse(data)
                    if(datas.status==0){
                        let shoplistdata =[]
                        for(let i=0;i<datas.data.length;i++){
                            shoplistdata.push(datas.data[i])
                        }
                        app.shoplist=shoplistdata
                        console.log(app.shoplist)
                    }
                }
             })
        },gotdetails:function(id){
            location.href='./prodectdetail.html?pid='+id
        },changprice(){
            let type ='2'
            if(app.setrchtwo==''){
                type='1'
            }
            if(app.nowsearchftp==1){
                app.nowsearchftp=2
                if(app.nowsearch==1){
                    app.getshopdata(app.nowid,app.page,type)
                }else{
                    app.getshoptwo(app.nowid,app.page,type)
                }
            }else{
                app.nowsearchftp=app.savesearch
                if(app.nowsearch==1){
                    app.getshopdata(app.nowid,app.page,type)
                }else{
                    app.getshoptwo(app.nowid,app.page,type)
                }
            }
        },downpage(){
            if(app.page==1){
                alert('当前是第一页，没有上一页')
            }else{
                app.page-=1
                if(app.nowsearch==1){
                    _ajax({
                        url : "/product/getList",  // url---->地址
                        type : "GET",   // type ---> 请求方式
                        async : true,   // async----> 同步：false，异步：true 
                        data : {        //传入信息
                            tid:app.nowid,
                            sortType:app.nowsearchftp,
                            current :app.page,
                            size:8
                        },
                        success : function(data){  
                            let datas =JSON.parse(data)
                            if(datas.status==0){
                                let shoplistdata =[]
                                for(let i=0;i<datas.data.records.length;i++){
                                    shoplistdata.push(datas.data.records[i])
                                }
                                app.shoplist=shoplistdata
                                app.total=datas.data.total
                            }
                        }
                     })
                }else{
                    _ajax({
                        url : "/product/searchProduct",  // url---->地址
                        type : "GET",   // type ---> 请求方式
                        async : true,   // async----> 同步：false，异步：true 
                        data : {        //传入信息
                            word :app.shoptext,
                            sortType:app.nowsearchftp,
                            current :app.page,
                            size:8
                        },
                        success : function(data){  
                            let datas =JSON.parse(data)
                            if(datas.status==0){
                                let shoplistdata =[]
                                for(let i=0;i<datas.data.length;i++){
                                    shoplistdata.push(datas.data[i])
                                }
                                app.shoplist=shoplistdata
                                console.log(app.shoplist)
                            }
                        }
                     })
                }
            }
        },uppage(){
            if(app.page*8>app.total){
                alert('已经是最后一页,没有下一页')
            }else{
                app.page-=1
                if(app.nowsearch==1){
                    _ajax({
                        url : "/product/getList",  // url---->地址
                        type : "GET",   // type ---> 请求方式
                        async : true,   // async----> 同步：false，异步：true 
                        data : {        //传入信息
                            tid:app.nowid,
                            sortType:app.nowsearchftp,
                            page:app.page
                        },
                        success : function(data){  
                            let datas =JSON.parse(data)
                            if(datas.status==0){
                                let shoplistdata =[]
                                for(let i=0;i<datas.data.records.length;i++){
                                    shoplistdata.push(datas.data.records[i])
                                }
                                app.shoplist=shoplistdata
                                console.log(app.shoplist)
                            }
                        }
                     })
                }else{
                }
            }
        }
    },
})
app.getonetype()
