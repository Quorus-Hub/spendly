import moment from 'moment';
import 'moment/min/locales';

export const dateRange = (startDate, endDate, i18n) => {
    moment.locale(i18n.language);
    
    let start      = startDate.split('-');
    let end        = endDate.split('-');
    let startYear  = parseInt(start[0]);
    let endYear    = parseInt(end[0]);
    let dates      = [];
    let result     = [];
 
    for(let i = startYear; i <= endYear; i++) {
      let endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
      let startMon = i === startYear ? parseInt(start[1])-1 : 0;
      for(let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
        let month = j+1;
        let displayMonth = month < 10 ? '0'+month : month;
        dates.push({date: [i, displayMonth, '01'].join('-'), name:  moment([i, displayMonth, '01'].join('-')).format("MMMM/YYYY")});
      }
    }
    result = dates.sort((a, b) => b.date > a.date);
    return result;
}