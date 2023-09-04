export class RoleTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false,
        //   custom: [
        //     { name: 'editrecord', title: 'Edit'},
        //     { name: 'activerecord', title: 'Activate' },
        //     { name: 'deactiverecord', title: 'Deactivate' },
        //   ],
        },
        pager :{
          perPage : 10
        },
        columns: {
          roleId: {
            title: 'RoleId',
          },
          role: {
            title: 'Role',
          },
        }
    }
}