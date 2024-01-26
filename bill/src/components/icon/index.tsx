interface IconProps {
  type: string;
  }
const Icon = ({type}:IconProps) => {
    return (
      <img
        src={`https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/${type}.svg`}
        alt="icon"
        style={{
          width: 20,
          height: 20,
        }}
        />
    )
  }

export default Icon