import { PricingRule } from "../types/index";

export default class SpecialCustomerDiscountManager {
  private customerDiscounts: Map<string, PricingRule[]> = new Map();

  addSpecialCustomer(customer: string, rule: PricingRule) {
    if (!this.customerDiscounts.has(customer)) {
      this.customerDiscounts.set(customer, []);
    }
    this.customerDiscounts.get(customer)!.push(rule);
  }

  deleteSpecialCustomer(customer: string) {
    if (this.customerDiscounts.has(customer)) {
      this.customerDiscounts.delete(customer);
    }
  }

  getDiscountRules(customer: string): PricingRule[] {
    return this.customerDiscounts.get(customer) || [];
  }
}
