Ext.define("Exam.view.tab.TopicBank", {
    extend: "Ext.panel.Panel",
    xtype: "tabtopicbank",
    store: 'TopicBank',
    layout: 'fit',
    html: '<div id="scanPaperWrapper"  ></div>',

    requires: ["Ext.view.View", "Ext.toolbar.Paging", "Exam.view.common.TopicTypeList", "Exam.view.common.A4Cart"],
    initComponent: function() {
        var me = this;

        var itemTpl = new Ext.XTemplate('<tpl for=".">', '<div class="topic-item">', '<div class="topic-item-header">', '<span class="topic-item-id">{id}.</span>', '<div class="topic-item-operation">', '<a href="#" class="topic-item-edit" data-opertaion="edit">✎编辑</a>', '<a href="#" class="topic-item-delete" data-opertaion="delete">×删除</a>', '</div>', '</div>      ', '<div class="topic-item-body">', '<div class="topic-item-desc">{desc}</div>', '<ul class="topic-item-options">', '<tpl for="options">', '<li><label  >{label}.</label><span>{text}</span></li>', '</tpl>', '</ul>           ', '</div>', '<div class="topic-item-footer">', '<span>参考答案：{answer}</span>', '<span class="topic-item-msg-rating">难度系数：{rating}</span>', '{[this.checkItemInPaper(values)]}', '</div>', '</div>', '</tpl>', {
            checkItemInPaper: function(item) {
                var localPaper = Ext.create("Exam.store.LocalPaper");
                localPaper.load();
                var flag = localPaper.isExisted(item.id);
                if(flag) {
                    return '<a href="#" class="added-to-a4" data-opertaion="add-a4cart">√已在试卷中</a>'
                } else {
                    return '<a href="#" class="add-to-a4" data-opertaion="add-a4cart">添加到A4纸</a>'
                }
            }
        });
        var localPaper = Ext.create("Exam.store.LocalPaper");
        localPaper.load();
        var total = localPaper.getCount(),
        paperText='共添加（+'+total+'）.';
        
        this.items = [{
            xtype: 'dataview',
            tpl: itemTpl,
            overflowY: 'auto',
            store: me.store,
            itemSelector: '.topic-item'
        }];
        this.dockedItems = [{
            xtype: 'cmntopictypelist',
            dock: "top"
        }, {
            xtype: 'pagingtoolbar',
            store: me.store,
            // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true,
            items:[{xtype:'tbfill'},{xtype:'button',id:'btnA4Cart',text:paperText,menu:{
                items:[
                    {xtype:'button',text:'查看A4纸',href:'html/preview.html',targe:'_blank'},
                    {xtype:'button',text:'删除A4纸',action:'btn-a4cart-destroy'}
                ]
            }}]
        }];

        this.callParent(arguments);
    },
    initComboList: function() {},

    getOwnStore: function() {

        this.getStore();
    }
});