import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
interface Title{
  title:string
}
const BarChart = ({title}:Title) => {
  const chartRef = useRef(null)
  useEffect(() => {
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom);//初始化生成图表实例对象

    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['vue', 'react', 'angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [10, 40, 70],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  })
  return (
    <div><div ref={chartRef} style={{ width: '500px', height: '400px' }}></div></div>
  )
}

export default BarChart
