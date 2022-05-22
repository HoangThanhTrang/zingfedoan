import HomeRepository from './repositories/home'
import PlayerRepository from './repositories/player'
import RecomendRepository from './repositories/recomended'
import AlbumRepository from './repositories/album'
import NewReleaseChartRepository from "@/services/repositories/new-release"
import Top100Repository from "@/services/repositories/top100";
import HubHomeRepository from "@/services/repositories/hub-home";

type RepositoryName = 'home' | 'categories' | 'player' | 'recomended' | 'album'|'top'|'newrelease-chart'|'top-100'|'hub-detail'

export default function getRepository(name: RepositoryName): any {
  switch (name) {
    case 'home':
      return new HomeRepository()
    case 'player':
      return new PlayerRepository()
    case 'recomended':
      return new RecomendRepository()
    case 'album':
      return new AlbumRepository()
    case 'newrelease-chart':
      return new NewReleaseChartRepository()
    case 'top-100' :
      return new Top100Repository()
    case 'hub-detail':
      return new HubHomeRepository()
    default:
      return null
  }
}
