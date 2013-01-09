/**
 * @class Exam.lib.LocalPaperUtil
 * this is class for local paper item add ,delete, query, stasitics
 */
Ext.define('Exam.lib.util.LocalPaperUtil', {		
	singleton:true,	 
	config:{
		store:Ext.create("Exam.store.LocalPaper")
	},
	contructor:function(options){		 
		this.initConfig(options);		 
	},
	getCount:function(){	 
		this.store.load();
		return this.store.getCount();
	},
	addRecord: function(topic, type) {
		return this.store.addRecord(topic,type);
	},
	clear:function(){
		//this.store.sync();
		//this.store.load();
		this.store.getProxy().clear();
		this.store.load();
	}
});
	 
