import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeComponent } from './pages/home/home.component';
import { ViewallComponent } from './pages/viewall/viewall.component';
import { GamedetailComponent } from './pages/gamedetail/gamedetail.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatTabsModule} from '@angular/material/tabs';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { PromotioncardComponent } from './components/promotioncard/promotioncard.component';
import { PromotioninfoComponent } from './pages/promotioninfo/promotioninfo.component';
import { ChatwidgetComponent } from './components/chatwidget/chatwidget.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './services/angular-material.module';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GameViewComponent } from './game-view/game-view.component';
@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
  HomeComponent,
  ViewallComponent,
  GamedetailComponent,
  PromotionsComponent,
  PromotioncardComponent,
  PromotioninfoComponent,
  ChatwidgetComponent,
  DashboardComponent,
  NavmenuComponent,
  GameViewComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		SlickCarouselModule,
		MatInputModule,
		BrowserAnimationsModule,
		MatTabsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AngularMaterialModule,
		NgxSpinnerModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
