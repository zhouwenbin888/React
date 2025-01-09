import React, { useEffect } from "react";
import { create } from "zustand";

const URL = 'http://geek.itheima.net/v1_0/channels'


interface State {
  count: number;
  increase: () => void;
  channelList: { id: number, name: string }[];
  fetchList: () => Promise<void>;
}
const createCounterStore = create<State>((set) => ({
  count: 0,
  increase: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  channelList: [],
  fetchList: async () => {
    const res = await fetch(URL)
    const resdata = await res.json()
    set({ channelList: resdata.data.channels });
  }
}));

const useStore = create<State>((set) => ({
  count: 0,
  increase: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  channelList: [],
  fetchList: async () => {
    const res = await fetch(URL)
    const resdata = await res.json()
    set({ channelList: resdata.data.channels });
  }
}));

function App() {
  const { count, increase, fetchList, channelList } = useStore(state => ({ count: state.count, increase: state.increase, fetchList: state.fetchList, channelList: state.channelList }));

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={increase}>Increase Count</button>
      <ul>
        {channelList.map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;