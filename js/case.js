var app = new Vue({
    el:'#app',
    data:{
        type:[],
        typetwo:[],
        page:1,
        shoplist:[
           
        ],
        total:0,
        oneid:'',
        setrchtwo:'',
        caasetype:2,
        searchid:'',
        shoptext:'',
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
                app.setrchtwo=''
           }
           if(type==2){
                for(let i=0;i<that.typetwo.length;i++){
                    that.typetwo[i].check=false
                }
                if(ftp==1){
                    console.log(app.oneid)
                    app.searchid=app.oneid
                    app.setrchtwo=''
                    app.getshopdata(app.oneid)
                }else{
                    for(let i=0;i<that.typetwo.length;i++){
                        if(that.typetwo[i].id==id){
                            that.typetwo[i].check=true
                        }
                    }
                    app.setrchtwo='1'
                    app.getshopdata(id)
                    app.searchid=id
                }
            }
        },getonetype:function(){
            _ajax({
                url : "/caseLabel",  // url---->地址
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
                                typeonedata.push({name:datas.data[i].labelName,id:datas.data[i].bid,check:true})
                                app.gettwotype(datas.data[i].bid)
                            }else{
                                typeonedata.push({name:datas.data[i].labelName,id:datas.data[i].bid,check:false})
                            }
                        }
                        app.type=typeonedata
                    }
                }
             })
        },gettwotype:function(id){
            console.log(id)
            app.oneid=id
            app.searchid=id
            app.setrchtwo='',
            app.getshopdata(id)
            _ajax({
                url : "/caseLabel",  // url---->地址
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
                        if(datas.data.length==0){
                            app.searchid=id
                        }else{
                            app.searchid=datas.data[0].bid
                        }
                        for(let i=0;i<datas.data.length;i++){
                            typetwodata.push({name:datas.data[i].labelName,id:datas.data[i].bid,check:false})
                        }
                        app.typetwo=typetwodata
                    }
                }
             })
        },getshopdata:function(type){
            app.page=1
            _ajax({
                url : "/case/list",  // url---->地址
                type : "GET",   // type ---> 请求方式
                async : true,   // async----> 同步：false，异步：true 
                data : {        //传入信息
                    tid:app.searchid,
                    word:app.shoptext,
                    current:app.page,
                    size:8
                },
                success : function(data){  
                    let datas =JSON.parse(data)
                    if(datas.status==0){
                        console.log(datas.data.records[0])
                        let shoplistdata =[]
                        for(let i=0;i<datas.data.records.length;i++){
                            shoplistdata.push(datas.data.records[i])
                        }
                        app.shoplist=shoplistdata
                       app.total=datas.data.total
                    }
                }
             })
        },gotdetails:function(id){
            location.href='./casedetail.html?cid='+id
        },downpage(){
            if(app.page==1){
                alert('当前是第一页，没有上一页')
            }else{
                app.page-=1
                _ajax({
                    url : "/case/list",  // url---->地址
                    type : "GET",   // type ---> 请求方式
                    async : true,   // async----> 同步：false，异步：true 
                    data : {        //传入信息
                        tid:app.searchid,
                        word:app.shoptext,
                        current:app.page,
                        size:8
                    },
                    success : function(data){  
                        let datas =JSON.parse(data)
                        if(datas.status==0){
                            console.log(datas.data.records[0])
                            let shoplistdata =[]
                            for(let i=0;i<datas.data.records.length;i++){
                                shoplistdata.push(datas.data.records[i])
                            }
                            app.shoplist=shoplistdata
                            app.total=datas.data.total
                        }
                    }
                 })
            }
        },uppage(){
            if(app.page*8>app.total){
                alert('已经是最后一页,没有下一页')
            }else{
                _ajax({
                    url : "/case/list",  // url---->地址
                    type : "GET",   // type ---> 请求方式
                    async : true,   // async----> 同步：false，异步：true 
                    data : {        //传入信息
                        tid:app.searchid,
                        word:app.shoptext,
                        current:app.page,
                        size:8
                    },
                    success : function(data){  
                        let datas =JSON.parse(data)
                        if(datas.status==0){
                            console.log(datas.data.records[0])
                            let shoplistdata =[]
                            for(let i=0;i<datas.data.records.length;i++){
                                shoplistdata.push(datas.data.records[i])
                            }
                            app.shoplist=shoplistdata
                            app.total=datas.data.total
                        }
                    }
                 })
            }
        }
    },
})
app.getonetype()