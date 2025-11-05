import React from 'react'
import {
  NavBar,
  Button,
  Cell,
  CellGroup,
  Tag
} from '@nutui/nutui-react'
import {
  Del,
  Service,
  Comment,
  Phone,
  Cart,
  Star,
  List,
  ArrowLeft,
  Fabulous,
  ArrowRight
} from '@nutui/icons-react'

import '@nutui/nutui-react/dist/style.css'
import './App.css'
import shangpinImg from './assets/shangpin.png'
import shangpinImg1 from './assets/shangpin1.png'
import shangpinImg2 from './assets/IMG_2993.jpg'
import shangpinImg3 from './assets/2994.png.jpg'


function App() {
  // 商品数据
  const itemData1 = {
    name: '招牌香酥鸡柳＋年糕＋薯..',
    specs: '数量 ×1， 1人份，微辣，少糖',
    originalPrice: 45.8,
    currentPrice: 32.15,
    note: '不支持7天无理由退货'
  };
  const itemData = {
    name: '毛血旺',
    specs: '数量 ×1， 2人份，',
    originalPrice: 65,
    currentPrice: 33.2,
    note: '不支持7天无理由退货'
  };

  // 计算订单金额
  const totalAmount = itemData.originalPrice;
  const discountAmount = totalAmount - itemData.currentPrice;
  const payAmount = itemData.currentPrice;

  const orderData = {
    status: '完成',
    statusDesc: '订单已送达，请尽行节约，拒绝浪费，期待能再次光临',
    orderNumber: Math.floor(Math.random() * 900000000000) + 100000000000 + '',
    totalAmount: totalAmount.toFixed(2),
    discountAmount: discountAmount.toFixed(2),
    payAmount: payAmount.toFixed(2),
    payMethod: '微信支付',
    orderTime: '2025-09-29 08:40:15',
    payTime: '2025-09-29 09:11:32',
    deliveryTime: '2025-09-29 10:11:16',
    recipient: '鲁敏178****1750',
    address: '山东青岛市崂山区中韩街道株洲路78号L座1202',
    restaurant: {
      name: '日欣家常菜',
      category: '外卖'
    },
    items: [{
      name: itemData.name,
      specs: itemData.specs,
      originalPrice: itemData.originalPrice.toFixed(2),
      currentPrice: itemData.currentPrice.toFixed(2),
      note: itemData.note
    }]
  }

  const actionButtons = [
    { text: '删除订单', type: 'default' },
    { text: '退款售后', type: 'default' },
    { text: '平台客服', type: 'default' },
    { text: '联系商家', type: 'primary' },
    { text: '再次购买', type: 'primary' },
    { text: '评价商品', type: 'default' },
    { text: '查看发票', type: 'default' }
  ]

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderData.orderNumber).then(() => {
      alert('订单号已复制到剪贴板');
    }).catch(() => {
      alert('复制失败，请手动复制');
    });
  };

  return (
    <div className="takeout-order">
      {/* 顶部导航 */}
       <NavBar
         title={orderData.status}
         leftShow={true}
         leftText={<ArrowLeft size="18" />}
         onClickLeft={() => console.log('返回')}
       />

      {/* 订单状态描述 */}
      <div className="status-section">
        <p className="status-desc">{orderData.statusDesc}</p>
      </div>

      {/* 操作按钮网格 */}
       <div className="action-grid">
          {actionButtons.map((btn, index) => {
            const iconComponents = [
              <Del size="20" />,
              <Service size="20" />,
              <Comment size="20" />,
              <Phone size="20" />,
              <Cart size="20" />,
              <Star size="20" />,
              <List size="20" />
            ];
            return (
              <div key={index} className="action-item">
                <div className={`action-icon ${btn.type === 'primary' ? 'primary' : ''}`}>
                  {iconComponents[index]}
                </div>
                <span className={`action-text ${btn.type === 'primary' ? 'primary' : ''}`}>
                  {btn.text}
                </span>
              </div>
            );
          })}
        </div>

      {/* 商家信息 */}
      <div className="restaurant-section">
        <div className="restaurant-header">
          <Tag type="warning" background='#fbcc1f' color='#000'>{orderData.restaurant.category}</Tag>
          <span className="restaurant-name">{orderData.restaurant.name}</span>
          <span className="arrow">›</span>
        </div>

        {/* 商品信息 */}
         <div className="item-info">
           <div className="item-image">
             {/*<img src={shangpinImg} alt={orderData.items[0].name} />*/}
             {/*<img src={shangpinImg1} alt={orderData.items[0].name} />*/}
             {/*<img src={shangpinImg2} alt={orderData.items[0].name} />*/}
             <img src={shangpinImg3} alt={orderData.items[0].name} />
           </div>
          <div className="item-details">
            <h4>{orderData.items[0].name}</h4>
            <p className="item-specs">{orderData.items[0].specs}</p>
            <p className="item-note">{orderData.items[0].note}</p>
          </div>
          <div className="item-price">
            <span className="current-price">到手¥{orderData.items[0].currentPrice}</span>
            <span className="original-price">¥{orderData.items[0].originalPrice}</span>
          </div>
        </div>

        <div className="order-summary">
          <Button size="small" type="default">评价商品</Button>
        </div>
      </div>

      {/* 订单详情 */}
       <CellGroup divider={false}>
         <Cell className="with-arrow" title="实付款" extra={<span><span style={{fontSize: '12px', color: '#ea251d', fontWeight: 'bold'}}>共减¥{orderData.discountAmount}</span> <span style={{fontWeight: 'bold'}}>合计¥{orderData.payAmount}</span></span>} onClick={() => {}} />
         <Cell title="订单编号" extra={<>
          {orderData.orderNumber}
          <ArrowRight />
          </>} onClick={copyOrderNumber} />
         <Cell className="with-arrow" title="交易凭证" extra="发生交易争议时，可作为判断依据" onClick={() => {}} />
         <Cell title="支付方式" extra={orderData.payMethod} />
         <Cell title="支付时间" extra={orderData.payTime} />
         <Cell title="下单时间" extra={orderData.orderTime} />
       </CellGroup>

       <CellGroup divider={false}>
         <Cell title="送达时间" extra={orderData.deliveryTime} />
         <Cell title="收货信息" extra={orderData.recipient} />
         <Cell title="收货地址" extra={orderData.address} />
       </CellGroup>
    </div>
  )
}

export default App
