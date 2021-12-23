import { Container } from 'inversify';
import DefaultHttpService, { type HttpService } from '../services/HttpService';
import DefaultAuthorizationService, { type AuthorizationService } from '../services/AuthorizationService';
import DefaultGameService, { type GameService } from '../services/GameService';
import DefaultLocalStorageService, { type LocalStorageService } from '../services/LocalStorageService';
import DefaultUserService, { type UserService } from '../services/UserService';
import DefaultStoreService, { type StoreService } from '../services/StoreService';
import DefaultPaymentService, { type PaymentService } from '../services/PaymentService';
import { GamesGridStore, GameCardStore } from '../stores/components';
import { GamePageStore, SignupPageStore, LoginPageStore, CartPageStore } from '../stores/pages';
import { OwnProfilePageStore, UserProfilePageStore } from '../stores/pages/profile';
import AuthorizationStore from '../stores/AuthorizationStore';
import StorePageStore from '../stores/pages/StorePageStore';
import ownTypes from './ownTypes';

export const container = new Container();
container.bind<HttpService>(ownTypes.httpService).to(DefaultHttpService).inSingletonScope();
container.bind<AuthorizationService>(ownTypes.authorizationService).to(DefaultAuthorizationService).inSingletonScope();
container.bind<GameService>(ownTypes.gameService).to(DefaultGameService).inSingletonScope();
container.bind<LocalStorageService>(ownTypes.localStorageService).to(DefaultLocalStorageService).inSingletonScope();
container.bind<UserService>(ownTypes.userService).to(DefaultUserService).inSingletonScope();
container.bind<PaymentService>(ownTypes.paymentService).to(DefaultPaymentService).inSingletonScope();
container.bind<StoreService>(ownTypes.storeService).to(DefaultStoreService).inSingletonScope();

container.bind<GamesGridStore>(ownTypes.gamesGridStore).to(GamesGridStore).inTransientScope();
container.bind<GamePageStore>(ownTypes.gamePageStore).to(GamePageStore).inTransientScope();
container.bind<SignupPageStore>(ownTypes.signupPageStore).to(SignupPageStore).inTransientScope();
container.bind<LoginPageStore>(ownTypes.loginPageStore).to(LoginPageStore).inTransientScope();
container.bind<UserProfilePageStore>(ownTypes.userProfilePageStore).to(UserProfilePageStore).inTransientScope();
container.bind<GameCardStore>(ownTypes.gameCardStore).to(GameCardStore).inTransientScope();
container.bind<StorePageStore>(ownTypes.storePageStore).to(StorePageStore).inTransientScope();

container.bind<OwnProfilePageStore>(ownTypes.ownProfilePageStore).to(OwnProfilePageStore).inSingletonScope();
container.bind<AuthorizationStore>(ownTypes.authorizationStore).to(AuthorizationStore).inSingletonScope();
container.bind<CartPageStore>(ownTypes.cartPageStore).to(CartPageStore).inSingletonScope();
