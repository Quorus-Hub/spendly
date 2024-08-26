# Spendly - Budget Tracker

## Tech Stack

**Frontend:** React Native

**Environment:** Android, iOS


## Quick start

Clone the repo
```bash
  git clone https://github.com/belsalm/spendly
```

Install spendly with npm

```bash
  cd spendly
  npm install
```
    
## Run Locally

To run locally on Android, run the following command

```bash
  npx react-native run-android
```

To run locally on iOS, run the following command

```bash
  npx react-native run-ios
```

## Deployment

To generate .apk file run

```bash
  cd android
  ./gradlew assembleRelease
```

To generate .aab file run

```bash
  cd android
  ./gradlew bundleRelease
```


## File Structure

Within the download you'll find the following directories and files:

```bash
Spendly
.
├── index.js
├── app.json
├── package.json
├── package_lock.json
├── babel.config.js
├── metro.config.js
├── android
├── ios
└── src
    ├── App.js
    ├── assets
    │   ├── fonts
    │   │   ├── Gilroy-Regular.ttf
    │   │   └── Gilroy-SemiBold.ttf
    │   └── images
    │       └── logo.png
    ├── components
    │   ├── Bar
    │   │   └── index.js
    │   ├── Button
    │   │   └── index.js
    │   ├── Cards
    │   │   ├── BalanceCard
    │   │   │   └── index.js
    │   │   ├── MoneyBoxCard
    │   │   │   └── index.js
    │   │   ├── NotificationCard
    │   │   │   └── index.js
    │   │   ├── PieCard
    │   │   │   └── index.js
    │   │   └── TransactionCard
    │   │       └── index.js
    │   ├── CircularProgress
    │   │   └── index.js
    │   └── Headers
    │       ├── BackHeader
    │       │   └── index.js
    │       ├── BlockText
    │       │   └── index.js
    │       └── HomeHeader
    │           └── index.js
    ├── config
    │   └── routes.js
    ├── context
    │   ├── auth-context.js
    │   └── auth-provider.js
    ├── dbHelpers
    │   ├── moneyboxHelper.js
    │   ├── categoryHelper.js
    │   ├── openDB.js
    │   └── TransactionHelper.js
    ├── navigations
    │   └── index.js
    ├── screens
    │   ├── auth
    │   │   ├── index.js
    │   │   └── login.js
    │   │   └── register.js
    │   ├── home
    │   │   ├── index.js
    │   │   └── notifications.js
    │   ├── category
    │   │   ├── add-category.js
    │   │   └── index.js
    │   ├── moneybox
    │   │   ├── add-moneybox.js
    │   │   └── index.js
    │   ├── settings
    │   │   └── index.js
    │   ├── splash
    │   │   └── index.js
    │   └── transactions
    │       ├── add-transaction.js
    │       ├── expense.js
    │       ├── income.js
    │       └── index.js
    ├── styles
    │   ├── colors.js
    │   ├── index.js
    │   └── typography.js
    └── utils
        ├── ccategories.js
        ├── currency.js
        └── quickActions.js
```

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| PRIMARY | ![#256BFE](https://via.placeholder.com/10/256BFE?text=+) #256BFE |
| WHITE | ![#FFFFFF](https://via.placeholder.com/10/FFFFFF?text=+) #FFFFFF |
| BLACK | ![#18191E](https://via.placeholder.com/10/18191E?text=+) #18191E |
| LIGHT_BLACK| ![#282A37](https://via.placeholder.com/10/282A37?text=+) #282A37 |


