# Customer Quote Project

This project is designed to develop a platform to enable a sales team to quickly quote a customer based on their current usage and needs. It includes functionality to handle various discounts for specific customers and uses TypeScript for type safety and Jest for testing. And special customer can be added or removed as needed.

## Project Structure
```js
customer-quote-nodejs/
├── src/
│ ├── discounts/
│ │ ├── AddOnHalfPrice.ts
│ │ ├── BasicAdFixedPrice.ts
│ │ ├── StandardAdHalfPrice.ts
│ │ ├── StandardAdTwoForOne.ts
│ │ └── index.ts
│ ├── manager/
│ │ └── SpecialCustomerDiscountManager.ts
│ ├── models/
│ │ ├── Checkout.ts
│ │ └── index.ts
│ ├── types/
│ │ └── index.ts
│ └── index.ts
├── test/
│ └── Checkout.test.ts
├── tsconfig.json
├── jest.config.js
├── package.json
├── .babelrc
└── node_modules/
```
## Prerequisites
- Node.js (>=14.x)
- npm (>=6.x)

## Setup
1. Clone the repository:
```sh
   git clone git@github.com:qtang2/customer-quote-nodejs.git
   cd customer-quote-nodejs
```
2.	Install dependencies:
```sh
    npm install
```

## Project Configuration
### tsconfig.json
This file contains the TypeScript configuration.
```json
{
  "compilerOptions": {
    "target": "ES2016",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*", "test/**/*"],
  "exclude": ["node_modules"]
}
```

### .babelrc
This file contains the Babel configuration.
```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ]
}
```
### jest.config.js
This file contains the Jest configuration.
```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  testMatch: ['**/test/**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
}
```

## Usage

### To run the application:
```sh
npm start
```
This will execute the src/index.ts file and output the results.

### Testing
To run the tests:
```sh
npm test
```
This will execute the tests in the test directory using Jest.

### Adding New Discounts

To add new discounts, create a new file in the src/discounts directory and implement the PricingRule interface. Then, update the SpecialCustomerDiscountManager to include the new discount rule.

#### Example
```ts
// src/discounts/NewDiscount.ts
import { PricingRule } from '../types';

export default class NewDiscount implements PricingRule {
  apply(items: string[], customer: string): number {
    // Implement discount logic here
    return 0;
  }
}
```
Update src/index.ts or the relevant manager file to include the new discount:
```ts
import NewDiscount from './discounts/NewDiscount';

const specialCustomerDiscountManager = new SpecialCustomerDiscountManager();
specialCustomerDiscountManager.addSpecialCustomer('CustomerName', new NewDiscount(['CustomerName']));
```
## Contributing

	1.	Fork the repository.
	2.	Create a new feature branch.
	3.	Commit your changes.
	4.	Push to the branch.
	5.	Open a Pull Request.

## License
This project is licensed under the MIT License.