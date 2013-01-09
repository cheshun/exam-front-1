Ext.define('Exam.view.common.A4Cart', {   
    extend:'Ext.Component',
    //xtype:'cmna4cart',
    id:"cmna4cart",
    floating:true,
    renderTo:Ext.getBody(),
   // style:'left:auto;top:auto;right:0px;bottom:0px;position:absolute;',
    initComponent:function(){
        this.addEvents(['click']);
        
        this.html=  ['<div id="scanPaper">',
                    '<div class="a4-header">',
                        '<a target="_blank" href="html/paper.html">查看试卷</a>',
                    '</div>',
                    '<div class="a4-content">',
                        '<span>(+'+this.initData.total+')</span>',
                    '</div>',
                    '<div class="a4-footer">',
                        '<a href="#" class="a4-delete" title="删除试卷">╳</a>',
                    '</div>',
            '</div>'].join('');
            
    	this.callParent(arguments);
    },
    listeners:{
        afterRender:function(cmp,e){
            //var body=Ext.getBody();
           // this.setPosition(body.getWidth()-this.getWidth(),body.getHeight()-this.getHeight());
           setTimeout(function(){
             cmp.getEl().setStyle({left:'auto',top:'auto',right:'28px',bottom:'24px'});
           },0);
             
        }
    }
});