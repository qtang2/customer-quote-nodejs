import { ItemType, PricingRule } from "../types/index";
import { PREDEFINED_FULL_PRICES } from "../utils/constants";

export default class StandardAdTwoForOne implements PricingRule {
  private specialCustomers: Set<string>;

  constructor(specialCustomers: string[]) {
    this.specialCustomers = new Set(specialCustomers);
  }
  apply(items: ItemType[], customer: string) {
    if (this.specialCustomers.has(customer)) {
      const standardAdCount = items.filter(
        (item) => item === ItemType.Standard
      ).length;
      const discountCount = Math.floor(standardAdCount / 2);
      return discountCount * PREDEFINED_FULL_PRICES.standard;
    }
    return 0;
  }
}
