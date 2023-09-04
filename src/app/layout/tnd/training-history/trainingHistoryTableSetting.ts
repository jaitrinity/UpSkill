export class TrainingHistoryTableSetting{
    public static setting = {
    
      mode: 'external',
      //hideSubHeader: true,
      actions: {
        position: 'right',
        add: false,
        edit : false
      },
      pager :{
        //display : false,
        perPage : 10
      },
      columns: {
        employeeName: {
          title: 'Employee Name'
        },
        empId : {
          title : "Employee Id"
        },
        role: {
          title: 'Role'
        },
        // circle: {
        //   title: 'Organization'
        // },
        // zone: {
        //   title: 'Location'
        // },
        // cluster: {
        //   title: 'Department'
        // },
        assignedTasks: {
          title: 'Tasks Assigned'
        },
        completedTasks: {
          title: 'Tasks Completed'
        },
        pendingTasks: {
          title: 'Tasks Pending'
        },
        // rankInCluster: {
        //   title: 'Rank in cluster'
        // },
        // rankInZone: {
        //   title: 'Rank in zone'
        // },
        // rankInCircle: {
        //   title: 'Rank in circle'
        // },
        // rankInInfratel: {
        //   title: 'Rank in infratel'
        // },
        // prePercentage: {
        //   title: 'Pre Percentage'
        // }
      },
      delete: {
        deleteButtonContent: '<button>View</button>',
        mode: 'external'
      }
    }
}