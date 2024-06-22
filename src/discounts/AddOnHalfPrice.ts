import { ItemType, PricingRule } from "../types/index";
import { PREDEFINED_FULL_PRICES } from "../utils/constants";

export default class AddOnHalfPrice implements PricingRule {
  private specialCustomers: Set<string>;

  constructor(specialCustomers: string[]) {
    this.specialCustomers = new Set(specialCustomers);
  }

  apply(items: ItemType[], customer: string) {
    if (this.specialCustomers.has(customer)) {
      const addOnPrice = items
        .filter((item) => item.startsWith("add-on"))
        .reduce((acc, item) => {
          if (item === ItemType.AddOnCopyWriting)
            return acc + PREDEFINED_FULL_PRICES.addOneCopyWriting;
          if (item === ItemType.AddOnVoiceGeneration)
            return acc + PREDEFINED_FULL_PRICES.addOneVoiceGeneration;
          return acc;
        }, 0);
      return addOnPrice / 2;
    }
    return 0;
  }
}
