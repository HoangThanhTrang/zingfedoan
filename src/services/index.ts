import HomeRepository from './repositories/home'
import PlayerRepository from './repositories/player'
import RecomendRepository from './repositories/recomended'
import AlbumRepository from './repositories/album'

type RepositoryName = 'home' | 'categories' | 'player' | 'recomended' | 'album'

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
    default:
      return null
  }
}
