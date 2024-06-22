import { SpecialCustomerDiscountManager } from "../manager";
import { ItemType, PricingRule } from "../types/index";
import { PREDEFINED_FULL_PRICES } from "../utils/constants";

export default class Checkout {
  private items: ItemType[] = [];
  private defaultPricingRules: PricingRule[];
  private specialCustomerDiscountManager: SpecialCustomerDiscountManager;
  private customer: string;

  constructor(
    defaultPricingRules: PricingRule[],
    specialCustomerDiscountManager: SpecialCustomerDiscountManager,
    customer: string
  ) {
    this.defaultPricingRules = defaultPricingRules;
    this.specialCustomerDiscountManager = specialCustomerDiscountManager;
    this.customer = customer;
  }

  add(item: ItemType) {
    this.items.push(item);
  }

  total(): number {
    const basePrice = this.calculateBasePrice();
    const discount = this.calculateDiscount();
    return basePrice - discount;
  }

  private calculateBasePrice(): number {
    return this.items.reduce((total, item) => {
      switch (item) {
        case ItemType.Basic:
          return total + PREDEFINED_FULL_PRICES.basic;
        case ItemType.Standard:
          return total + PREDEFINED_FULL_PRICES.standard;
        case ItemType.AddOnCopyWriting:
          return total + PREDEFINED_FULL_PRICES.addOneCopyWriting;
        case ItemType.AddOnVoiceGeneration:
          return total + PREDEFINED_FULL_PRICES.addOneVoiceGeneration;
        default:
          return total;
      }
    }, 0);
  }

  private calculateDiscount(): number {
    const applicableRules = [
      ...this.defaultPricingRules,
      ...this.specialCustomerDiscountManager.getDiscountRules(this.customer),
    ];
    return applicableRules.reduce((totalDiscount, rule) => {
      return totalDiscount + rule.apply(this.items, this.customer);
    }, 0);
  }
}
