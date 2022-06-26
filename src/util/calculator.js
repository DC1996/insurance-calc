import { Utils } from "@/util/utils";

/**
 * Holds information about insurance variants, bundles and extras
 * total amount calculated
 */
export class InsuranceData {
  constructor() {
    this.startDate = undefined;
    this.endDate = undefined;
    this.variant = undefined;
    this.bundle = undefined;
    this.numOfPeople = 1;
    // Based on the number of extra fees, create appropriately sized array
    this.extras = new Array(2).fill(false);
    this.amount = "--";
  }
}
