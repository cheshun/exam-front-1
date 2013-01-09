Ext.define('Exam.store.Colleges', {
    extend: 'Ext.data.TreeStore',
    model: 'Exam.model.College' ,
    defaultRootProperty:'data',
    proxy: {
        type: 'ajax',
        api: {
            read: 'testdata/College.json',
            update: 'data/updateUsers.json'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'status'
        }
    }
});
 