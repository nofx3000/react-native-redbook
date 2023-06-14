import { EggLogger } from 'egg';
import { SingletonProto, AccessLevel, Inject } from '@eggjs/tegg';
import articles from '../../../../config/articles';
import { sleep } from '@/module/utils/Sleep';

@SingletonProto({
  // 如果需要在上层使用，需要把 accessLevel 显示声明为 public
  accessLevel: AccessLevel.PUBLIC,
})
export class FavorateService {

  @Inject()
  logger: EggLogger;

  @Inject()
  host: string;

  // 首页文章列表
  async getFavorateArticleList(): Promise<ArticleSimple[]> {
    await sleep(2000);
    const sub = [articles[0], articles[3], articles[9], articles[11]]
    return sub.map(item => {
        return {
            id: item.id,
            title: item.title,
            userName: item.userName,
            avatarUrl: `http://${this.host}/public${item.avatarUrl}`,
            favoriteCount: item.favoriteCount,
            isFavorite: item.isFavorite,
            image: `http://${this.host}/public${item.images[0]}`,
        };
    })
  }
}
