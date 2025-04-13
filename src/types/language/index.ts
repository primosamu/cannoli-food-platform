
import { GeneralTranslations } from './general';
import { NavigationTranslations } from './navigation';
import { OrderTranslations } from './order';
import { DeliveryTranslations } from './delivery';
import { CourierTranslations } from './courier';
import { ReportTranslations } from './report';
import { ViewTranslations } from './view';
import { LanguageTranslations } from './language-names';
import { CampaignTranslations } from './campaign';
import { ImageOptimizerTranslations } from './image-optimizer';
import { DashboardTranslations } from './dashboard';
import { MenuTranslations } from './menu';
import { CustomerTranslations } from './customer';
import { CalendarTranslations } from './calendar';
import { CouponTranslations } from './coupon';
import { LoyaltyTranslations } from './loyalty';
import { IntegrationTranslations } from './integration';
import { SettingTranslations } from './setting';
import { DataInsightTranslations } from './data-insight';

export type Language = 'en' | 'pt' | 'es';

export interface Translations extends
  GeneralTranslations,
  NavigationTranslations,
  OrderTranslations,
  DeliveryTranslations,
  CourierTranslations,
  ReportTranslations,
  ViewTranslations,
  LanguageTranslations,
  CampaignTranslations,
  ImageOptimizerTranslations,
  DashboardTranslations,
  MenuTranslations,
  CustomerTranslations,
  CalendarTranslations,
  CouponTranslations,
  LoyaltyTranslations,
  IntegrationTranslations,
  SettingTranslations,
  DataInsightTranslations
{}

export * from './general';
export * from './navigation';
export * from './order';
export * from './delivery';
export * from './courier';
export * from './report';
export * from './view';
export * from './language-names';
export * from './campaign';
export * from './image-optimizer';
export * from './dashboard';
export * from './menu';
export * from './customer';
export * from './calendar';
export * from './coupon';
export * from './loyalty';
export * from './integration';
export * from './setting';
export * from './data-insight';
