import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  RadioChangeEvent,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { getArticleIdAPI, subArticleAPI, upArticleAPI } from '@/apis/article'
import { useChannels } from '@/hooks/useChannels'

const { Option } = Select

export interface article {
  title: string,
  content: string,
  cover: {
    type: number,
    images: string[]
  },
  channel_id: number
}
export interface article2 extends article {
  id: string
}
export interface Channel {
  id: number,
  name: string
}

const Publish = () => {
  const { channels } = useChannels()
  const navigate = useNavigate()
  const onfinish = (data: article) => {
    const { title, content, channel_id } = data
    const reqdata = {
      title,
      content,
      cover: {
        type,
        images
      },
      channel_id
    }
    if (imageList.length !== type) { return message.warning('封面类型和图片不匹配') }
    else if (articleId !== null) {
      upArticleAPI({ ...reqdata, id: articleId })
      message.success('更新成功')
      setTimeout(() => {
        navigate('/article')
      }, 1000)
    }
    else {
      subArticleAPI(reqdata)
      message.success('添加成功')
      setTimeout(() => {
        navigate('/article')
      }, 1000)
    }
  }
  const [imageList, setImageList] = useState<Array<any>>([]);
  const onUploadChange = (image: any) => {
    setImageList(image.fileList);
  };
  const images = imageList.map(item =>
    item.response ? item.response.data.url : item.url
  )
  const [type, settype] = useState(1)
  const onType = (e: RadioChangeEvent) => {
    settype(e.target.value)
  }
  const [searchid] = useSearchParams()
  const [form] = Form.useForm()
  const articleId = searchid.get('id')
  console.log(articleId)
  useEffect(() => {
    async function getArticleidAPI() {
      if (articleId !== null) {
        const res = await getArticleIdAPI(articleId)
        const data = res.data
        form.setFieldsValue({
          ...data,
          type: data.cover.type,
        })
        settype(data.cover.type)
        setImageList(data.cover.images.map((url: string) => {
          return { url }
        }))
      }
    }
    getArticleidAPI()
  }, [articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId ? '编辑' : '发布'}文章` },
          ]}
          />
        }
      >
        <Form
          onFinish={onfinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {type > 0 && <Upload
              listType="picture-card"//文件框外观样式
              showUploadList//控制显示上传列表
              action={'http://geek.itheima.net/v1_0/upload'}
              onChange={onUploadChange}
              name="image"
              maxCount={type}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish