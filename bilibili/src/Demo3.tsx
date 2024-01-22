interface Demo3Props {
    name: string;
    age: number;
    isTrue: boolean;
    list: string[];
    obj: { name: string };
    cb: (e: string) => void;
    child: JSX.Element;
    children: JSX.Element
}

const Demo3 = ({ cb }: Demo3Props) => {
    const msg = 'kk'
    // console.log(props)
    return (
        <div>
            {/* {props.children} */}
            <button onClick={() => cb(msg)}>nihao</button>
        </div>
    )
}

export default Demo3