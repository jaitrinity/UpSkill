export class TicketStatusTableSetting{
    public static setting = {
    
        //hideSubHeader: true,
        actions : false,
        pager :{
          //display : false,
          perPage : 10
        },
        columns: {
          ticketNumber: {
            title: 'Ticket Number'
          },
          newTicketumber: {
            title: 'New Ticket Num'
          },
          trainingName: {
            title: 'Training Name'
          },
          subtrainingName: {
            title: 'Sub Training Name'
          },
          empId: {
            title: 'Employee ID'
          },
          userRole: {
            title: 'Role'
          },
        //   circleName: {
        //     title: 'Organization'
        //   },
          // zoneName: {
          //   title: 'Location'
          // },
          // clusterName: {
          //   title: 'Department'
          // },
          startDate: {
            title: 'Start Date'
          },
          endDate: {
            title: 'End Date'
          },
          submittedDate: {
            title: 'Submitted Date'
          },
          prePercentage: {
            title: 'Pre Percentage'
          },
          postPercentage: {
            title: 'Post Percentage'
          },
          postStatus: {
            title: 'Post Status'
          }
        }
      }
}