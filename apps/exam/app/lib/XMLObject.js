Ext.define("Exam.lib.XMLObject", {	 
	createXMLDOM: function() {　　　　　　　　　　
		var arrSignatures = ["MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument", 　　　　　　　　　　　　　　　　"Microsoft.XmlDom"];　　　　　　　　　　　　　　　　　　　　　　
		for(var i = 0; i < arrSignatures.length; i++) {　　　　　　　　
			try {　　　　　　　　　　　　　　　　　　
				var oXmlDom = new ActiveXObject(arrSignatures[i]);　　　　　　　　　　　　　　　　　　　　
				return oXmlDom;　　　　　　　　　　　　　　　　
			} catch(oError) {　}　　　　　　
		}　　　　　　　　　　　　　　　　　　　
		throw new Error("你的系统没有安装MSXML");　　　　　　　　　
	}
});