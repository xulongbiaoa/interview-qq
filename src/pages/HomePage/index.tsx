import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, Dispatch } from 'stores';
import { PlayerModel } from 'stores/models/players'
import { VirtrualList } from 'component/virtual'

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { loading, error, success } = useSelector((state: RootState) => {
    return state.loading.models.players;
  })
  const playersState = useSelector((state: RootState) => state.players)

  const dispatch = useDispatch<Dispatch>()

  React.useEffect(() => {
    dispatch.players.getPlayers()
  }, [])
  const data = new Array(100).fill({}).map(() => {
    return {
      name: Math.random() * 100,
      age: 32,
      address: '西湖区湖底公园1号',
    }
  })
  const renderNode = (item, index) => {
    return <div key={index}> {item.name} </div>
  }
  return (
    <div>
      <div>
        {t('home')}

      </div>
      <VirtrualList data={data}              // 总数据
        count={data.length}      // 列表项数量
        size={8}                 // 可视区渲染DOM的列表项数量
        viewSize={5}             // 可视区能看到的列表数量
        rowHeight={30}           // 每个列表项的行高度
        renderNode={renderNode}  // 渲染的每个列表项 
      />

      {loading ? "loading...." : playersState.players.map((player: PlayerModel) => (
        <div key={player.id} className="card">
          <h5>
            {player.first_name} {player.last_name}
          </h5>
          <div>
            <p>
              <b>Position: </b>
              {player.position}
            </p>
            <p>
              <b>Team: </b>
              {player.team.full_name}
            </p>
          </div>
        </div>
      ))
      }
    </div>
  );
};
export default HomePage;
