import { ItemType, PricingRule } from "../types/index";
import { PREDEFINED_FULL_PRICES } from "../utils/constants";

export default class StandardHalfPrice implements PricingRule {
  private specialCustomers: Set<string>;

  constructor(specialCustomers: string[]) {
    this.specialCustomers = new Set(specialCustomers);
  }

  apply(items: ItemType[], customer: string) {
    if (this.specialCustomers.has(customer)) {
      const standardAdCount = items.filter(
        (item) => item === ItemType.Standard
      ).length;
      return (standardAdCount * PREDEFINED_FULL_PRICES.standard) / 2;
    }
    return 0;
  }
}
