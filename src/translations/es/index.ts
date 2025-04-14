
import { Translations } from "../../types/language";
import { generalTranslations } from "./general";
import { navigationTranslations } from "./navigation";
import { orderTranslations } from "./order";
import { deliveryTranslations } from "./delivery";
import { courierTranslations } from "./courier";
import { reportTranslations } from "./report";
import { viewTranslations } from "./view";
import { languageNameTranslations } from "./language-names";
import { campaignTranslations } from "./campaign";
import { imageOptimizerTranslations } from "./image-optimizer";
import { dashboardTranslations } from "./dashboard";
import { menuTranslations } from "./menu";
import { customerTranslations } from "./customer";
import { calendarTranslations } from "./calendar";
import { couponTranslations } from "./coupon";
import { loyaltyTranslations } from "./loyalty";
import { integrationTranslations } from "./integration";
import { settingTranslations } from "./setting";
import { dataInsightTranslations } from "./data-insight";

const esTranslations: Translations = {
  ...generalTranslations,
  ...navigationTranslations,
  ...orderTranslations,
  ...deliveryTranslations,
  ...courierTranslations,
  ...reportTranslations,
  ...viewTranslations,
  ...languageNameTranslations,
  ...campaignTranslations,
  ...imageOptimizerTranslations,
  ...dashboardTranslations,
  ...menuTranslations,
  ...customerTranslations,
  ...calendarTranslations,
  ...couponTranslations,
  ...loyaltyTranslations,
  ...integrationTranslations,
  ...settingTranslations,
  ...dataInsightTranslations,
  
  // Add direct keys needed by MenuItemFormModal.tsx
  image: menuTranslations.image,
  uploadImage: menuTranslations.uploadImage,
  currentImage: menuTranslations.currentImage,
  changeImage: menuTranslations.changeImage,
  removeImage: menuTranslations.removeImage,
  optimizeImage: menuTranslations.optimizeImage,
  optimizeWithAI: menuTranslations.optimizeWithAI,
  optimizing: menuTranslations.optimizing,
  upload: menuTranslations.upload,
  imageOptimized: menuTranslations.imageOptimized,
  imageOptimizedDesc: menuTranslations.imageOptimizedDesc
};

export default esTranslations;
