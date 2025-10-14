import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { PlansComponent } from './pages/plans/plans.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PrivacityComponent } from './pages/privacity/privacity.component';
import { TermsComponent } from './pages/terms/terms.component';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { ContactComponent } from './pages/contact/contact.component';
import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'TKMelo — Tu wingman con IA' },
    { path: 'login', component: LoginComponent, title: 'Iniciar sesión — TKMelo' },
    { path: 'register', component: RegisterComponent, title: 'Crear cuenta — TKMelo' },
    { path: 'dashboard', component: DashboardComponent, title: 'Panel — TKMelo' },
    { path: 'como-funciona', component: HowItWorksComponent, title: 'Como Funciona — TKMelo' },
    { path: 'planes', component: PlansComponent, title: 'Planes — TKMelo' },
    { path: 'faq', component: FaqComponent, title: 'FAQ — TKMelo' },
    { path: 'privacidad', component: PrivacityComponent, title: 'Privacidad — TKMelo' },
    { path: 'terminos', component: TermsComponent, title: 'Terminos — TKMelo' },
    { path: 'cookies', component: CookiesComponent, title: 'Cookies — TKMelo' },
    { path: 'contacto', component: ContactComponent, title: 'Contacto — TKMelo' },
    { path: 'verificar-correo', component: VerifyEmailComponent, title: 'Verificacion — TKMelo' },
    { path: '**', redirectTo: '' }
];
