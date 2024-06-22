export enum ItemType {
    Basic = "basic",
    Standard = "standard",
    AddOnCopyWriting = "add-on-copy-writing",
    AddOnVoiceGeneration = "add-on-voice-generation",
  }
  
  export interface PricingRule {
    apply(items: ItemType[], customer: string): number;
  }
  