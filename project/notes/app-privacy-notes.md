# App Privacy 入力メモ

最終更新: 2026-05-31

App Store Connect の App Privacy 入力時に確認したい内容のメモです。

## このアプリで扱う主なデータ

- メールアドレス
- Google ログイン情報
- 日記本文
- ユーザーが追加した写真
- 広告 SDK が取得しうる識別子や診断情報

## 想定される回答の考え方

### 連絡先情報

- Email Address
  - ログイン、アカウント管理に利用

### ユーザーコンテンツ

- Photos or Videos
  - ユーザーが追加した写真
- Other User Content
  - 日記本文

## 使い方の整理

- アプリ機能のために利用
- Firebase Authentication / Firestore / Storage を利用している
- `google_mobile_ads` を組み込んでいる
- 行動追跡目的では使っていない

## 広告 SDK について

現状のコードには広告 SDK が入っています。

- [`pubspec.yaml`](../../../pubspec.yaml)
- [`lib/ad_config.dart`](../../../lib/ad_config.dart)
- [`lib/ad_banner.dart`](../../../lib/ad_banner.dart)
- [`lib/diary_interstitial_ad_service.dart`](../../../lib/diary_interstitial_ad_service.dart)
- [`ios/Runner/Info.plist`](../../../ios/Runner/Info.plist)

そのため、`App Privacy` は「アプリ本体で直接集めるデータ」だけでなく、`第三者パートナーのコード` を含めて判断する前提で見直してください。

## 世界公開前に確認したいこと

- バナー広告とインタースティシャル広告を本番で出すか
- パーソナライズ広告を使うか
- EEA / UK / Switzerland 向けに `UMP` を入れるか
- 将来 `Tracking` を伴う構成にするか

`App Privacy` と `Google Play Data safety` は、最終的に公開する広告構成でそろえて入力するのが安全です。

## 注意

App Store Connect の質問文は変更されることがあるため、最終的には Apple 側の表現に合わせて確認してください。
