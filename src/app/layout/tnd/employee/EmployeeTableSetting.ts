export class EmployeeTableSetting{
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
          // empId: {
          //   title: 'Emp Id',
          //   // sort : false,
          // },
          empName: {
            title: 'Emp name',
            // sort : false,
          },
          mobile: {
            title: 'Mobile',
            // sort : false,
          },
        //   secMobile: {
        //     title: 'Sec. Mobile',
        //     // sort : false,
        //     width : "120px"
        //   },
          role: {
            title: 'Role',
            // sort : false,
          },
          emailId: {
            title: 'Email Id',
            // sort : false,
          },
        //   city: {
        //     title: 'City',
        //     // sort : false,
        //   },
        //   state: {
        //     title: 'State',
        //     // sort : false,
        //   },
        //   rmName: {
        //     title: 'RM Employee',
        //     // sort : false,
        //   },
        //   fieldUserValue: {
        //     title: 'Field user',
        //     // sort : false,
        //   },
        //   active: {
        //     title: 'Active',
        //     // sort : false,
        //   }
        }
    }
}