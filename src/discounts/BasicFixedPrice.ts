import { ItemType, PricingRule } from "../types/index";
import {
  BASIC_AD_DISCOUNT_PRICE,
  PREDEFINED_FULL_PRICES,
} from "../utils/constants";

export default class BasicFixedPrice implements PricingRule {
  private specialCustomers: Set<string>;

  constructor(specialCustomers: string[]) {
    this.specialCustomers = new Set(specialCustomers);
  }

  apply(items: ItemType[], customer: string) {
    if (this.specialCustomers.has(customer)) {
      const fixedPrice = items
        .filter((item) => item === ItemType.Basic)
        .reduce((acc, _) => {
          return acc + (PREDEFINED_FULL_PRICES.basic - BASIC_AD_DISCOUNT_PRICE);
        }, 0);
      return fixedPrice;
    }
    return 0;
  }
}
