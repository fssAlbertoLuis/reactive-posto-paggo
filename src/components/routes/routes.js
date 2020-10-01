import SignInScreen from '../signInScreen';
import Dashboard from '../dashboard';
import UserCreate from '../User/UserCreate';
import UserList from '../User/UserList';
import UserView from '../User/UserView';
import Profile from '../User/Profile';
import CreateCompany from '../company/CreateCompany';
import ViewCompany from '../company/ViewCompany';
import FuelList from '../Fuel/FuelList';
import Recharge from '../Recharge';
import RechargeList from '../Recharge/RechargeList';
import CompanyList from '../company/CompanyList';

export const routes = [
  {
    path: '/signin',
    component: SignInScreen,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    authRequired: true,
  },
  {
    path: '/user/create',
    component: UserCreate,
    authRequired: true,
    permission: ['admin', 'general-manager'],
  },
  {
    path: '/user/profile',
    component: Profile,
    authRequired: true,
  },
  {
    path: '/user/view/:id',
    component: UserView,
    authRequired: true,
    permission: ['vital-admin', 'general-manager'],
  },
  {
    path: '/user/list',
    component: UserList,
    authRequired: true,
    permission: ['vital-admin', 'general-manager'],
  },
  {
    path: '/company/create',
    component: CreateCompany,
    authRequired: true,
    permission: ['vital-admin'],
  },
  {
    path: '/company/view/:id',
    component: ViewCompany,
    authRequired: true,
    permission: ['vital-admin'],
  },
  {
    path: '/company/all',
    component: CompanyList,
    authRequired: true,
    permission: ['vital-admin'],
  },
  {
    path: '/company/fuel_list',
    component: FuelList,
    authRequired: true,
    permission: ['general-manager'],
  },
  {
    path: '/recharge/new',
    component: Recharge,
    authRequired: true,
    permission: ['general-manager', 'manager', 'user'],
  },
  {
    path: '/recharge/all',
    component: RechargeList,
    authRequired: true,
    permission: ['general-manager', 'manager', 'user'],
  },
];
