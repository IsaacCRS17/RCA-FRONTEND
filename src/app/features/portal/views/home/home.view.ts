import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/features/admin/commons/services/news.service';
import { INews } from 'src/app/features/admin/interfaces/news';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss']
})
export class HomeView implements OnInit {

  news:INews[]=[]
  constructor(private newsService:NewsService) { }

  ngOnInit(): void {
    this.newsService.getAll('',0,10).subscribe(response=>{
      this.news = response.content;
    })
  }

}