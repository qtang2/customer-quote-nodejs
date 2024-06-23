import { AddOnHalfPrice } from "./discounts";
import BasicFixedPrice from "./discounts/BasicFixedPrice";
import StandardAdTwoForOne from "./discounts/StandardAdTwoForOne";
import StandardHalfPrice from "./discounts/StandardHalfPrice";
import { SpecialCustomerDiscountManager } from "./manager";
import Checkout from "./models/Checkout";
import { ItemType, PricingRule } from "./types/index";

console.log("====================================");
console.log("Customer Quote");
console.log("====================================");
// the defaultPricingRules SHOULD NOT include same customer
const defaultPricingRules: PricingRule[] = [
  new StandardHalfPrice(['Onepass']) 
];
const specialCustomerDiscountManager = new SpecialCustomerDiscountManager();
specialCustomerDiscountManager.addSpecialCustomer('Nandos', new StandardAdTwoForOne(['Nandos']));
specialCustomerDiscountManager.addSpecialCustomer('Catch', new AddOnHalfPrice(['Catch']));
specialCustomerDiscountManager.addSpecialCustomer('Onepass', new BasicFixedPrice(['Onepass']));
specialCustomerDiscountManager.addSpecialCustomer('NikeWithDiscount', new BasicFixedPrice(['NikeWithDiscount']));
const testScenarios = [
  {
    customer: "Nike",
    items: ["basic", "standard", "add-on-copy-writing"],
    expectedTotal: 1950,
  },
  {
    customer: "Nandos",
    items: ["standard", "standard", "standard", "basic"],
    expectedTotal: 2500,
  },
  {
    customer: "Catch",
    items: ["standard", "standard", "add-on-voice-generation"],
    expectedTotal: 2300,
  },
  {
    customer: "Onepass",
    items: ["basic", "standard", "basic", "standard"],
    expectedTotal: 1800,
  },
  {
    customer: "NikeWithDiscount",
    items: ["basic", "standard", "add-on-copy-writing"],
    expectedTotal: 1750,
  },
];

testScenarios.forEach((scenario) => {
  const checkout = new Checkout(defaultPricingRules, specialCustomerDiscountManager, scenario.customer);
  scenario.items.forEach((item) => checkout.add(item as ItemType));
  const total = checkout.total();
  console.log(
    `Customer: ${scenario.customer}, Expected Total: ${scenario.expectedTotal}, Calculated Total: ${total}`
  );
});
