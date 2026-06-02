# App Store 世界公開チェックリスト

最終更新: 2026-05-31

## まず結論

- `App Store Connect` の配信地域を `All Countries or Regions` に変えれば、世界公開そのものはできます
- ただし、現状のアプリは日本語固定の箇所が多いため、海外ユーザー向けの体験はまだ未整備です
- 最短で出すなら `ストア情報 + サポートページ + プライバシーポリシー` を英語でも用意します
- 本格的に広げるなら、アプリ内 UI も `English` 対応したうえで公開するのがおすすめです

## App Store Connect で今日やること

- [ ] `Apps > 対象アプリ > Pricing and Availability` を開く
- [ ] `App Distribution Methods` が `Public` になっていることを確認する
- [ ] `App Availability > Manage > Manage Availability` を開く
- [ ] `All Countries or Regions` を選ぶ
- [ ] 将来追加される国や地域にも自動で出したいなら、そのチェックをオンにする
- [ ] `Next` と `Confirm` で確定する
- [ ] 反映は最大 24 時間ほど見ておく

補足:

- すでに日本で公開中の `Public` アプリなら、配信地域の変更だけで世界公開できます
- もし `Private Distribution` のアプリなら、そのまま `Public` には切り替えられないので新しい app record が必要です

## このリポジトリで見つかった世界公開の論点

### 1. アプリ内ロケールが日本語固定

- [`lib/main.dart`](../../../lib/main.dart)
  - `locale` が `ja_JP` 固定
  - `supportedLocales` が `ja_JP` のみ
  - `initializeDateFormatting('ja_JP')` になっている
- [`lib/home_screen.dart`](../../../lib/home_screen.dart)
  - カレンダー表示で `locale: 'ja_JP'` を使っている

この状態だと、海外ユーザーの端末言語が英語でもアプリは日本語表示のままです。

### 2. 認証まわりの言語も日本語固定

- [`lib/auth_service.dart`](../../../lib/auth_service.dart)
  - Firebase Auth のメール言語コードを `ja` 固定で送っている
  - `Sign in with Apple` の `locale` も `ja` 固定

メール認証やパスワード再設定メールも、日本語前提になります。

### 3. 通知文言が日本語固定

- [`lib/diary_reminder_service.dart`](../../../lib/diary_reminder_service.dart)
  - 通知タイトル
  - 通知本文
  - Android 通知チャンネル名
  - Android 通知チャンネル説明

### 4. iOS 側のローカライズ設定が日本語のみ

- [`ios/Runner/Info.plist`](../../../ios/Runner/Info.plist)
  - `CFBundleDisplayName` が日本語
  - `CFBundleLocalizations` が `ja` のみ
  - カメラ / 写真ライブラリ権限文言も日本語のみ

世界公開自体はできますが、英語圏ユーザーには権限ダイアログも日本語で出ます。

### 5. 公開ページが日本語のみ

- [`docs/privacy.html`](../../privacy.html)
- [`docs/support.html`](../../support.html)
- [`docs/email-action.html`](../../email-action.html)

加えて、[`docs/support.html`](../../support.html) には「公開前にメールアドレスを追加してください」という下書き文言が残っています。

### 6. 広告 SDK とプライバシー回答を見直す必要がある

- [`pubspec.yaml`](../../../pubspec.yaml) に `google_mobile_ads`
- [`lib/ad_config.dart`](../../../lib/ad_config.dart)
- [`lib/ad_banner.dart`](../../../lib/ad_banner.dart)
- [`lib/diary_interstitial_ad_service.dart`](../../../lib/diary_interstitial_ad_service.dart)
- [`ios/Runner/Info.plist`](../../../ios/Runner/Info.plist) に `GADApplicationIdentifier`

つまり、このアプリは現状 `広告 SDK を含む構成` です。

世界公開するなら、少なくとも次を整理してから `App Privacy` を入れるのが安全です。

- [ ] `App Privacy` を広告 SDK を含む実態に合わせて見直す
- [ ] `Google Play Data safety` の説明も同じ前提でそろえる
- [ ] EEA / UK / Switzerland に広告を出すなら、`UMP` を使うかを決める
- [ ] 将来パーソナライズ広告や追跡を使うなら、`ATT` と `Tracking` 回答も見直す

## 世界公開前に最低限やること

### 最短で公開するなら必須

- [ ] `App Store Connect` で `English (U.S.)` など英語ローカライズを追加する
- [ ] 英語の `App Name` `Subtitle` `Description` `Keywords` を用意する
- [ ] 英語の `Privacy Policy URL` と `Support URL` を用意する
- [ ] サポートページの問い合わせ先メールアドレスを本番用に確定する
- [ ] `App Privacy` を実装実態に合わせて再入力する
- [ ] 端末言語を英語にした iPhone 実機で 1 回通し確認する

### おすすめ

- [ ] アプリ内 UI を `ja` / `en` の 2 言語対応にする
- [ ] 権限ダイアログ文言を `InfoPlist.strings` などでローカライズする
- [ ] 通知文言も端末言語に合わせる
- [ ] メール認証 / パスワード再設定メールの言語を端末言語に合わせる

## 実装するならこの順番

1. [`docs/project/notes/app-privacy-notes.md`](../notes/app-privacy-notes.md) を更新して、広告 SDK 前提の回答方針を固める
2. [`docs/privacy.html`](../../privacy.html) と [`docs/support.html`](../../support.html) に英語版を用意する
3. `App Store Connect` に英語メタデータを追加する
4. アプリ内文言を `l10n` 化する
5. `Info.plist` の権限文言を英語対応する
6. 英語端末で実機確認する
7. 配信地域を `All Countries or Regions` に広げる

## 実機確認チェック

- [ ] iPhone の言語を `English`
- [ ] iPhone の地域を `United States`
- [ ] 新規登録
- [ ] メール認証
- [ ] パスワード再設定
- [ ] Google ログイン
- [ ] 写真選択
- [ ] カメラ起動
- [ ] 日記保存
- [ ] 通知許可と通知表示
- [ ] サポート / プライバシー URL が開くこと
- [ ] 広告が出る構成なら、広告表示前後で不自然な導線がないこと

## 判断の目安

### いますぐ世界公開してよい状態

- 海外ストアに並べること自体を優先
- 日本語 UI のままでも許容
- 英語のストア情報とサポート導線は最低限そろえる

### 公開前にローカライズしたほうがよい状態

- 海外広告を回す予定がある
- 日本語が読めないユーザーにも継続利用してほしい
- 審査後すぐに英語圏ユーザーを取りにいきたい

## 参考

- Apple: Manage availability for your app on the App Store
  - https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/manage-availability-for-your-app-on-the-app-store
- Apple: Localize app information
  - https://developer.apple.com/help/app-store-connect/manage-app-information/localize-app-information
- Apple: Manage app privacy
  - https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy
- Google: AdMob Flutter privacy and consent
  - https://developers.google.com/admob/flutter/privacy
