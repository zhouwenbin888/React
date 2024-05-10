import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'//引入汉化包
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannels } from '@/hooks/useChannels'
import { useEffect, useState } from 'react'
import { delArticleAPI, getArticleAPI } from '@/apis/article'
import moment from 'moment'
import './index.scss'

const { Option } = Select
const { RangePicker } = DatePicker
export interface dataitem {
  status: string,
  channel_id: string,
  begin_pubdate: string,
  end_pubdate: string,
  page: number,
  per_page: number
}

interface data2 {
  comment_count: number,
  cover: object,
  id: string,
  like_count: number,
  pubdate: string,
  read_count: number,
  status: number,
  title: string
}
interface ValueInterface {
  channel_id: string;
  status: string;
  date: [moment.Moment, moment.Moment];
}
const Article = () => {
  // 准备列数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover: { images: any[] }) => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      //data为后端返回的状态status
      render: (data: number) => <Tag color={data === 1 ? 'warning' : 'success'}>{data === 1 ? '待审核' : '审核通过'}</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: (data: data2) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />
            <Popconfirm
              title="删除文章"
              description="确定删除文章吗?"
              onConfirm={() => confirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  // 准备表格body数据

  const confirm = async (data: data2) => {
    await delArticleAPI(data.id)
    setdata({
      ...reqdata
    })
  }
  const navigate = useNavigate()
  const { channels } = useChannels()
  const [list, setlist] = useState([])
  const [count, setcount] = useState(0)
  const [reqdata, setdata] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 10
  })
  useEffect(() => {
    async function getList() {
      const res = await getArticleAPI(reqdata)
      setlist(res.data.results)
      setcount(res.data.total_count)
    }
    getList()
  }, [reqdata])

  const onfinish = (value: ValueInterface) => {
    setdata(
      {
        ...reqdata,
        channel_id: value.channel_id,
        status: value.status,
        begin_pubdate: value.date[0].format('YYYY-MM-DD'),
        end_pubdate: value.date[1].format('YYYY-MM-DD')
      }
    )
  }
  const onchange = (page: number) => {
    setdata({
      ...reqdata,
      page
    })
  }
  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onfinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channels.map(item => <Option value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={list} pagination={
          {
            total: count,
            pageSize: reqdata.per_page,
            onChange: onchange
          }
        } />
      </Card>
    </div>
  )
}

export default Article