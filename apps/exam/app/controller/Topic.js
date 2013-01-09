/**
 * @class Exam.controller.Topic
 * @controller
 * used for controlling the Topic management of navigation tree
 */
Ext.define('Exam.controller.Topic', {
	extend: 'Ext.app.Controller',
	stores: ["TopicBank", "CollegeSelections", 'LocalPaper'],
	models: [],
	requires: ["Exam.lib.util.TreeUtil","Exam.lib.util.LocalPaperUtil"],
	refs: [{
		ref: 'tabTopicBank',
		selector: 'tabtopicbank'
	},{
		ref: 'buttonA4Cart',
		selector: 'tabtopicbank #btnA4Cart'
	}],
	init: function() {},
	onLaunch: function() {
		var me = this;
		/**
		 * control the item and distribute event by the source element
		 */
		 
		this.control('tabtopicbank', {			 
			destroy:function( cmp,  eOpts ){
				 
			}
		});
		this.control('tabtopicbank dataview', {
			itemclick: me.dispatchEvent
		});

 
		this.control("tabtopicbank #btnA4Cart",{
			click:function( button  ,   e,   eOpts ){
				var total=Exam.lib.util.LocalPaperUtil.getCount();
				debugger;
				button.setText('共添加（+'+total+'）.');
			}
		});
		this.control("tabtopicbank #btnA4Cart menu button[action=btn-a4cart-destroy]",{
			click:function( button  ,   e,   eOpts ){
				Exam.lib.util.LocalPaperUtil.clear();
				me.getButtonA4Cart().setText('+(0)');
			}
		});
	},
	dispatchEvent: function(view, record, item, index, e, eOpts) {
		 
		var data = record.getData(),
			target = e.target,
			operation = target.getAttribute('data-opertaion');
		if(operation == 'edit') {
			this.doItemEdit(data);
		} else if(operation == 'delete') {
			this.doItemDelete(data);
		} else if(operation == 'add-a4cart') {
			this.doItemToA4Cart(data, target);
		}
		e.preventDefault();
	},
	doItemEdit: function(data) {
		Ext.Ajax.request({
			url: 'topic/edit',
			params: {
				id: data.id
			},
			success: function(res) {
				debugger;
				Ext.Msg.alert('提示', "成功!");
			},
			failure: function(req, res) {
				debugger;
			}
		});
	},
	doItemDelete: function(data) {
		Ext.Ajax.request({
			url: 'topic/edit',
			params: {
				id: data.id
			},
			success: function(res) {
				debugger;
				Ext.Msg.Alert('提示', "成功!");
			},
			failure: function(req, res) {
				debugger;
			}
		});
	},
	doItemToA4Cart: function(data, target) {
		 
		if(Exam.lib.util.LocalPaperUtil.addRecord(data, 'radio')) {
			//Ext.Msg.alert('提示', "已加入~");
			target.innerHTML = "√已在试卷中";

			target.className = 'added-to-a4';
			target=target.parentNode.parentNode||target;
			var total=Exam.lib.util.LocalPaperUtil.getCount(),
			 	targetX=Ext.get(target).getLeft(),
			    targetY=Ext.get(target).getTop(),
				buttonA4Cart=this.getButtonA4Cart();
				 
				buttonA4Cart.setText('共添加（+'+total+'）.');
				toPos=buttonA4Cart.getPosition();
 			var domParser=null,html='';
 			if(!!XMLSerializer){
 				domParser=new XMLSerializer();
 				html=domParser.serializeToString(target.cloneNode(true)) ;
 			} 
			var transfor=Ext.create('Ext.Component', {
				id:'transfor',
			    html:html,
			  	width:Ext.get(target).getWidth(),
		    	height: Ext.get(target).getHeight(),	
		    	floating:true,		     			   
			    renderTo: Ext.getBody()
			});
			transfor.showAt(targetX,targetY);
			transfor.animate({to:{left:toPos[0],top:toPos[1],width:80,height:28,opacity:0},duration:1000,callback:function(i,j){				 
				transfor.destroy();				
			}});
		 
		} else {
			target.className = 'added-to-a4';
			target.innerHTML = "√已在试卷中";
			Ext.Msg.alert('提示', "已在试卷中!");
		}
	}
});
