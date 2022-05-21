import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, Dispatch } from 'stores';
import { PlayerModel } from 'stores/models/players'
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

  return (
    <div>
      <div>
        {t('home')}

      </div>
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
