import { Checkout } from "../src/models";
import SpecialCustomerDiscountManager from "../src/manager/SpecialCustomerDiscountManager";
import { ItemType, PricingRule } from "../src/types";
import {
  AddOnHalfPrice,
  BasicFixedPrice,
  StandardHalfPrice,
  StandardAdTwoForOne,
} from "../src/discounts";

describe("Checkout", () => {
  let specialCustomerDiscountManager: SpecialCustomerDiscountManager;
  let defaultPricingRules: PricingRule[];

  beforeEach(() => {
    defaultPricingRules = [new BasicFixedPrice(['NikeWithDiscount'])];

    specialCustomerDiscountManager = new SpecialCustomerDiscountManager();
    specialCustomerDiscountManager.addSpecialCustomer(
      "Nandos",
      new StandardAdTwoForOne(["Nandos"])
    );
    specialCustomerDiscountManager.addSpecialCustomer(
      "Catch",
      new AddOnHalfPrice(["Catch"])
    );
    specialCustomerDiscountManager.addSpecialCustomer(
      "Onepass",
      new StandardHalfPrice(["Onepass"])
    );
    specialCustomerDiscountManager.addSpecialCustomer(
      "Onepass",
      new BasicFixedPrice(["Onepass"])
    );
  });

  it("should calculate total for a regular customer", () => {
    const checkout = new Checkout(
      defaultPricingRules,
      specialCustomerDiscountManager,
      "Nike"
    );
    checkout.add(ItemType.Basic);
    checkout.add(ItemType.Standard);
    checkout.add(ItemType.AddOnCopyWriting);

    const total = checkout.total();
    expect(total).toBe(1950);
  });

  it("should apply Nandos 2-for-1 discount on standard ads", () => {
    const checkout = new Checkout(
      defaultPricingRules,
      specialCustomerDiscountManager,
      "Nandos"
    );
    checkout.add(ItemType.Standard);
    checkout.add(ItemType.Standard);
    checkout.add(ItemType.Standard);
    checkout.add(ItemType.Basic);

    const total = checkout.total();
    expect(total).toBe(2500);
  });

  it("should apply Catch half-price discount on add-ons", () => {
    const checkout = new Checkout(
      defaultPricingRules,
      specialCustomerDiscountManager,
      "Catch"
    );
    checkout.add(ItemType.Standard);
    checkout.add(ItemType.Standard);
    checkout.add(ItemType.AddOnCopyWriting);

    const total = checkout.total();
    expect(total).toBe(2225);
  });

  it("should apply Onepass 50% discount on standard ads and fixed price on basic ads", () => {
    const checkout = new Checkout(
      defaultPricingRules,
      specialCustomerDiscountManager,
      "Onepass"
    );
    checkout.add(ItemType.Basic);
    checkout.add(ItemType.Standard);
    checkout.add(ItemType.Standard);
    checkout.add(ItemType.Standard);

    const total = checkout.total();
    expect(total).toBe(1800)
  });
  it("should apply NikeWithDiscount fixed price on basic ads", () => {
    const checkout = new Checkout(
      defaultPricingRules,
      specialCustomerDiscountManager,
      "NikeWithDiscount"
    );
    checkout.add(ItemType.Basic);
    checkout.add(ItemType.Standard);
    checkout.add(ItemType.AddOnCopyWriting);

    const total = checkout.total();
    expect(total).toBe(1750)
  });
});
