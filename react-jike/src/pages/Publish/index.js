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
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
// import { createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'
import { getToken } from '@/utils'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

const Publish = () => {
  // 获取频道列表
  const { channelList } = useChannel()
  const navigate = useNavigate()
  // 提交表单
  const onFinish = (formValue) => {

    console.log(formValue)
    // 校验封面类型imageType是否和实际的图片列表imageList数量是相等的
    if (imageList.length !== imageType) return message.warning('封面类型和图片数量不匹配')
    const { title, content, channel_id } = formValue
    // 1. 按照接口文档的格式处理收集到的表单数据
    const reqData = {
      title,
      content,
      cover: {
        type: imageType, // 封面模式
        // 这里的url处理逻辑只是在新增时候的逻辑
        // 编辑的时候需要做处理
        images: imageList.map(item => {
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }
        }) // 图片列表
      },
      channel_id
    }
    // 2. 调用接口提交
    // 处理调用不同的接口 新增 - 新增接口  编辑状态 - 更新接口  id
    if (articleId) {
      // 更新接口
      const token = getToken();
      const xhr = new XMLHttpRequest();
      const data = { ...reqData, id: articleId }
      xhr.open('PUT', `http://geek.itheima.net/v1_0/mp/articles/${data.id}?draft=false`, false);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);  // 设置 Authorization 头
      // 设置其他必要的请求头

      xhr.send(JSON.stringify(data));

      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.error('Request failed', xhr.status, xhr.statusText);
      }
      message.success('添加成功')
      setTimeout(() => {
        navigate('/article')
      }, 1000)
    } else {
      const token = getToken();
      const xhr = new XMLHttpRequest();

      xhr.open('POST', 'http://geek.itheima.net/v1_0/mp/articles?draft=false', false);

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);  // 设置 Authorization 头
      // 设置其他必要的请求头

      xhr.send(JSON.stringify(reqData));

      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.error('Request failed', xhr.status, xhr.statusText);
      }
      message.success('添加成功')
      setTimeout(() => {
        navigate('/article')
      }, 1000)
    }
  }

  // 上传回调
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    console.log('正在上传中', value)
    setImageList(value.fileList)
  }

  // 切换图片封面类型
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    console.log('切换封面了', e.target.value)
    setImageType(e.target.value)
  }

  // 回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  // 获取实例
  const [form] = Form.useForm()
  useEffect(() => {
    // 1. 通过id获取数据
    const token = getToken();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `http://geek.itheima.net/v1_0/mp/articles/${articleId}?draft=false`, false);  // 将第三个参数设置为false表示同步请求

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);  // 设置 Authorization 头xhr.send(null);
    xhr.send(null);
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      form.setFieldsValue({
        ...response.data,
        type: response.data.cover.type,
      });
      setImageType(response.data.cover.type);
      setImageList(response.data.cover.images.map((url) => {
        return { url };
      }));
    } else {
      console.error('Failed to make synchronous request');
    }
    // 2. 调用实例方法 完成回填
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
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
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
              {/* value属性用户选中之后会自动收集起来作为接口的提交字段 */}
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
              listType: 决定选择文件框的外观样式
              showUploadList: 控制显示上传列表
            */}
            {imageType > 0 && <Upload
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name='image'
              onChange={onChange}
              maxCount={imageType}
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
            {/* 富文本编辑器 */}
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