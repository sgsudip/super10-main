import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameViewComponent } from './game-view/game-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GamedetailComponent } from './pages/gamedetail/gamedetail.component';
import { HomeComponent } from './pages/home/home.component';
import { PromotioninfoComponent } from './pages/promotioninfo/promotioninfo.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { ViewallComponent } from './pages/viewall/viewall.component';
import {PrivacyComponent} from './pages/privacy/privacy.component';
import { ReturnpolicyComponent } from './pages/returnpolicy/returnpolicy.component';
import { PasswordresetComponent } from './pages/passwordreset/passwordreset.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AffiliateComponent } from './pages/affiliate/affiliate.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DeposithistoryComponent } from './pages/deposithistory/deposithistory.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { GatewayComponent } from './pages/gateway/gateway.component';
import { DepositconfirmComponent } from './pages/depositconfirm/depositconfirm.component';

const routes: Routes = [{
	path: '',
	component: HomeComponent
}, 
{
	path: 'viewall',
	component: ViewallComponent
},
{
	path: 'gamedetail',
	component: GamedetailComponent
},
{
	path: 'home',
	component: HomeComponent
},
{
	path: 'promotion',
	component: PromotionsComponent
},
{
	path: 'dashboard',
	component: DashboardComponent
},
{
    path: 'transactions',
    component: TransactionsComponent
},
{
	path: 'gameview',
	component: GameViewComponent
},
{
	path: 'promotion/promotioninfo',
	component: PromotioninfoComponent
},
{
    path: 'about',
    component: AboutComponent
},
{
    path: 'blog',
    component: BlogComponent
},
{
    path: 'affiliate',
    component: AffiliateComponent
},
{
    path: 'contact',
    component: ContactComponent
},
{
    path: 'deposit/methods',
    component: DepositComponent
},
{
    path:'deposit/confirm',
    component: DepositconfirmComponent
},
{
    path: 'deposit/history',
    component: DeposithistoryComponent
},
{
    path: 'privacy',
    component: PrivacyComponent
},
{
    path: 'returnpolicy',
    component: ReturnpolicyComponent
},
{
    path: 'passwordreset/:token',
    component: PasswordresetComponent
},
{
    path: "payments/:gateway",
    component: GatewayComponent
},
{
    path: "**",
    pathMatch: "full",
    component: PagenotfoundComponent
}
];

@NgModule({
	imports: [RouterModule.forRoot(routes,{enableTracing: true,useHash:false})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
