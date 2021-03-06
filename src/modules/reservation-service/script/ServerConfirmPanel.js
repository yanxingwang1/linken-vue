import Dict from './dict'

export const initPanel = function (params) {
  return `
    <div class="server-confirm-panel">
      <div>
        <div>车辆：</div>
        <div>${params.plateNumber ? (params.plateNumber.length > 1 ? params.plateNumber : '') : ''}</div>
      </div>
      <div>
        <div>服务类型：</div>
        <div>${['', '维修', '保养', '检查', '其他'][params.serviceType]}</div>
      </div>
      <div>
        <div>经销商：</div>
        <div>${params.dealerName}</div>
      </div>
      <div>
        <div>预约时间：</div>
        <div>${moment(Number(params.appointmentDate)).format('YYYY年MM月DD日')} ${Dict.timeDict[params.appointmentTime]}</div>
      </div>
      <div>
        <div>联系电话：</div>
        <div>${params.appointmentPhone}</div>
      </div>
      <div>
        <div>${params.serviceType == 1 ? (params.scootor == 0 ? '代步车：' : '') : ''}</div>
        <div>${params.serviceType == 1 ? (params.scootor == 0 ? '需要' : '') : ''}</div>
      </div>
      <div>
        <div>${params.isTake == '12781001' ? '上门取车：' : ''}</div>
        <div>${params.isTake == '12781001' ? '需要' : ''}</div>
      </div>
      <div>
        <div>${params.isPud == '12781001' ? '送车上门：' : '送车上门：'}</div>
        <div>${params.isPud == '12781001' ? '需要' : '不需要'}</div>
      </div>
      <div>
        <div>留言：</div>
        <div>${params.remark || ''}</div>
      </div>
    </div>
    `
}

