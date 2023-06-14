import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum } from '@eggjs/tegg';
import { FavorateService } from '@/module/foo';

@HTTPController({
  path: '/favorate',
})
export class FavorateController {
  @Inject()
  favorateService: FavorateService;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: 'favorateArticleList',
  })
  async favorateArticleList() {
    return await this.favorateService.getFavorateArticleList();
  }
}
