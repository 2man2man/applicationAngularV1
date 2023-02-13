import { Component, Injector, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { ArticleEditorComponent } from '../editor/article.editor';

@Component({
  selector: 'article-view',
  templateUrl: './article.view.html',
  styleUrls: ['./article.view.less'],
})
export class ArticleViewComponent {

  public static readonly PATH = "article";

  public readonly EDITOR_PATH = "/" + ArticleEditorComponent.PATH;


  public domainClazz = DomainClazzEnum.Article;

  constructor() { }

  public ngOnInit() {
  }

  handleRowClick(row: any, router: Router) {
    if (!row) {
      return;
    }
    let idValue = row.id;
    router.navigate([ArticleEditorComponent.PATH], { state: { existingId: idValue } });
  }


}