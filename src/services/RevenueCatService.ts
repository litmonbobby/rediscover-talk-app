/**
 * RevenueCat Service
 * Handles subscription management, purchases, and paywall presentation
 */

import Purchases, {
  PurchasesOffering,
  PurchasesPackage,
  CustomerInfo,
  LOG_LEVEL,
  PurchasesStoreProduct,
} from 'react-native-purchases';
import { Platform } from 'react-native';
import { API_CONFIG, SUBSCRIPTION_CONFIG, FEATURES, logger } from '../config/environment';

// RevenueCat API Keys from environment config
const REVENUECAT_API_KEY_IOS = API_CONFIG.REVENUECAT_API_KEY_IOS;
const REVENUECAT_API_KEY_ANDROID = API_CONFIG.REVENUECAT_API_KEY_ANDROID;

// Entitlement identifier - This should match what you set up in RevenueCat
export const ENTITLEMENT_ID = SUBSCRIPTION_CONFIG.ENTITLEMENT_ID;

// Offering identifier
export const DEFAULT_OFFERING_ID = SUBSCRIPTION_CONFIG.OFFERING_ID;

export interface SubscriptionStatus {
  isSubscribed: boolean;
  activeEntitlements: string[];
  expirationDate: Date | null;
  willRenew: boolean;
  productIdentifier: string | null;
}

class RevenueCatService {
  private static instance: RevenueCatService;
  private isInitialized = false;
  private customerInfo: CustomerInfo | null = null;

  private constructor() {}

  static getInstance(): RevenueCatService {
    if (!RevenueCatService.instance) {
      RevenueCatService.instance = new RevenueCatService();
    }
    return RevenueCatService.instance;
  }

  /**
   * Initialize RevenueCat SDK
   * Call this once when the app starts (in App.tsx or index.ts)
   */
  async initialize(userId?: string): Promise<void> {
    if (this.isInitialized) {
      logger.log('RevenueCat already initialized');
      return;
    }

    try {
      // Set log level based on environment
      Purchases.setLogLevel(FEATURES.ENABLE_DEBUG_LOGS ? LOG_LEVEL.DEBUG : LOG_LEVEL.ERROR);

      // Configure with the appropriate API key
      const apiKey = Platform.OS === 'ios'
        ? REVENUECAT_API_KEY_IOS
        : REVENUECAT_API_KEY_ANDROID;

      logger.log('RevenueCat: Configuring for', Platform.OS);

      Purchases.configure({ apiKey, appUserID: userId });

      this.isInitialized = true;
      logger.log('RevenueCat initialized successfully');

      // Get initial customer info
      await this.refreshCustomerInfo();
    } catch (error) {
      logger.error('Failed to initialize RevenueCat:', error);
      throw error;
    }
  }

  /**
   * Identify a user (call after login)
   */
  async identifyUser(userId: string): Promise<CustomerInfo> {
    try {
      const customerInfo = await Purchases.logIn(userId);
      this.customerInfo = customerInfo.customerInfo;
      return this.customerInfo;
    } catch (error) {
      logger.error('Failed to identify user:', error);
      throw error;
    }
  }

  /**
   * Log out user (call after logout)
   */
  async logoutUser(): Promise<CustomerInfo> {
    try {
      const customerInfo = await Purchases.logOut();
      this.customerInfo = customerInfo;
      return customerInfo;
    } catch (error) {
      logger.error('Failed to logout user:', error);
      throw error;
    }
  }

  /**
   * Refresh customer info from RevenueCat
   */
  async refreshCustomerInfo(): Promise<CustomerInfo> {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      this.customerInfo = customerInfo;
      return customerInfo;
    } catch (error) {
      logger.error('Failed to get customer info:', error);
      throw error;
    }
  }

  /**
   * Get current subscription status
   */
  async getSubscriptionStatus(): Promise<SubscriptionStatus> {
    try {
      const customerInfo = await this.refreshCustomerInfo();

      const activeEntitlements = Object.keys(customerInfo.entitlements.active);
      const isSubscribed = activeEntitlements.includes(ENTITLEMENT_ID);

      let expirationDate: Date | null = null;
      let willRenew = false;
      let productIdentifier: string | null = null;

      if (isSubscribed) {
        const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];
        if (entitlement) {
          expirationDate = entitlement.expirationDate
            ? new Date(entitlement.expirationDate)
            : null;
          willRenew = entitlement.willRenew;
          productIdentifier = entitlement.productIdentifier;
        }
      }

      return {
        isSubscribed,
        activeEntitlements,
        expirationDate,
        willRenew,
        productIdentifier,
      };
    } catch (error) {
      logger.error('Failed to get subscription status:', error);
      return {
        isSubscribed: false,
        activeEntitlements: [],
        expirationDate: null,
        willRenew: false,
        productIdentifier: null,
      };
    }
  }

  /**
   * Check if user has premium access
   */
  async isPremium(): Promise<boolean> {
    const status = await this.getSubscriptionStatus();
    return status.isSubscribed;
  }

  /**
   * Get available offerings (subscription packages)
   */
  async getOfferings(): Promise<PurchasesOffering | null> {
    try {
      const offerings = await Purchases.getOfferings();

      if (offerings.current) {
        return offerings.current;
      }

      // Try to get specific offering
      if (offerings.all[DEFAULT_OFFERING_ID]) {
        return offerings.all[DEFAULT_OFFERING_ID];
      }

      logger.warn('No offerings available');
      return null;
    } catch (error) {
      logger.error('Failed to get offerings:', error);
      throw error;
    }
  }

  /**
   * Get all available packages from the current offering
   */
  async getPackages(): Promise<PurchasesPackage[]> {
    try {
      const offering = await this.getOfferings();
      return offering?.availablePackages ?? [];
    } catch (error) {
      logger.error('Failed to get packages:', error);
      return [];
    }
  }

  /**
   * Purchase a package
   */
  async purchasePackage(pkg: PurchasesPackage): Promise<CustomerInfo> {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      this.customerInfo = customerInfo;
      return customerInfo;
    } catch (error: any) {
      if (error.userCancelled) {
        logger.log('User cancelled purchase');
        throw new Error('Purchase cancelled');
      }
      logger.error('Purchase failed:', error);
      throw error;
    }
  }

  /**
   * Purchase a product directly
   */
  async purchaseProduct(product: PurchasesStoreProduct): Promise<CustomerInfo> {
    try {
      const { customerInfo } = await Purchases.purchaseStoreProduct(product);
      this.customerInfo = customerInfo;
      return customerInfo;
    } catch (error: any) {
      if (error.userCancelled) {
        logger.log('User cancelled purchase');
        throw new Error('Purchase cancelled');
      }
      logger.error('Purchase failed:', error);
      throw error;
    }
  }

  /**
   * Restore purchases
   */
  async restorePurchases(): Promise<CustomerInfo> {
    try {
      const customerInfo = await Purchases.restorePurchases();
      this.customerInfo = customerInfo;
      return customerInfo;
    } catch (error) {
      logger.error('Failed to restore purchases:', error);
      throw error;
    }
  }

  /**
   * Get cached customer info (no network call)
   */
  getCachedCustomerInfo(): CustomerInfo | null {
    return this.customerInfo;
  }

  /**
   * Check if SDK is initialized
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Add listener for customer info updates
   */
  addCustomerInfoUpdateListener(
    listener: (customerInfo: CustomerInfo) => void
  ): () => void {
    // Store listener reference for potential cleanup
    const wrappedListener = (info: CustomerInfo) => {
      this.customerInfo = info;
      listener(info);
    };

    Purchases.addCustomerInfoUpdateListener(wrappedListener);

    // Return a no-op cleanup function since SDK handles cleanup internally
    return () => {
      // Note: RevenueCat SDK manages listener cleanup automatically
      logger.log('Customer info listener cleanup requested');
    };
  }
}

// Export singleton instance
export const revenueCatService = RevenueCatService.getInstance();
export default revenueCatService;
